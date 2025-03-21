// Main script file for generating Nimiq icons from Figma
import type { IconSet } from '@iconify/tools'
import type { ColorAttributes } from '@iconify/tools/lib/colors/attribs'
import type { Color } from '@iconify/utils/lib/colors/types'
import { existsSync } from 'node:fs'
import { env, exit } from 'node:process'
import {
  cleanupSVG,
  exportJSONPackage,
  importFromFigma,
  isEmptyColor,
  mergeIconSets,
  parseColors,
  removeFigmaClipPathFromSVG,
  runSVGO,
  SVG,
} from '@iconify/tools'
import { compareColors, iconToHTML, replaceIDs, stringToColor } from '@iconify/utils'
import consola from 'consola'
import { JSDOM } from 'jsdom'
import { resolve } from 'pathe'
import { author, license, version } from '../package.json'
import 'dotenv/config'

// Must match the frame names in Figma
enum IconVariant {
  Icons = 'icons',
  Duotone = 'duotone',
  Logos = 'logos',
  Flags = 'flags',
}

const sanitizeName = (name: string) => name.toLocaleLowerCase().trim().replace(/ /g, '-')

function getFigmaCredentials() {
  const file = env.FIGMA_FILE_ID
  const token = env.FIGMA_API_TOKEN

  if (!file || !token) {
    consola.error('Please provide FIGMA_FILE_ID and FIGMA_API_TOKEN environment variables.')
    exit(1)
  }

  return { file, token }
}

// Deterministic hash function for generating consistent IDs
function getDeterministicId(prefix: string, name: string): string {
  // Simple but effective hash function for strings
  const hash = (str: string): number => {
    let h = 0
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) - h) + str.charCodeAt(i)
      h |= 0 // Convert to 32bit integer
    }
    return Math.abs(h)
  }

  const id = hash(`${prefix}-${name}`).toString(36).substring(0, 8)
  return id
}

async function checkFigmaVariants() {
  const { file, token } = getFigmaCredentials()

  const figma = await importFromFigma({
    file,
    pages: ['Main'],
    token,
    prefix: 'nimiq',
    depth: 2,
    ifModifiedSince: '2021-01-01T00:00:00Z', // Force fetch to ensure variants exist
    iconNameForNode: node => node.name.startsWith('_') ? null : node.name,
    simplifyStroke: true,
  })

  if (figma === 'not_modified') {
    consola.info('Figma file has not been modified since last check. Will use cached data.')
    return
  }

  const iconSetVariants = figma.iconSet.list().map(sanitizeName)
  const ourVariants = Object.values(IconVariant)

  const missingVariants = ourVariants.filter(variant => !iconSetVariants.includes(variant))
  const extraUnknownVariants = iconSetVariants.filter(v => !ourVariants.includes(v as IconVariant))

  if (missingVariants.length > 0 || extraUnknownVariants.length > 0)
    throw new Error(`There is an unknown variant or a missing variant: ${JSON.stringify({ extraUnknownVariants, missingVariants })}`)

  consola.success('Figma variants are correct.')
}

async function getFigma(frameName: string) {
  const { file, token } = getFigmaCredentials()

  try {
    const cacheDir = `.figma-cache/${frameName}` // Separate cache directory for each variant

    consola.info(`Fetching icons from Figma for variant: ${frameName}`)

    const figma = await importFromFigma({
      file,
      pages: ['Main'],
      token,
      cacheDir,
      prefix: 'nimiq',
      depth: 3,
      ifModifiedSince: true,
      simplifyStroke: true,
      cache: true,
      timestampKey: `${file}-${frameName}-modified`, // Variant-specific timestamp key
      iconNameForNode: (node) => {
        if (
          node.parents.length !== 2
          || node.type !== 'FRAME'
          || sanitizeName(node.parents.at(-1)?.name || '') !== frameName
        ) {
          return null
        }
        return sanitizeName(node.name)
      },
    })

    if (figma === 'not_modified' && existsSync(resolve('../src'))) {
      consola.info(`Figma file has not been modified since last build for ${frameName}.`)
      return 'not_modified'
    }

    return figma
  }
  catch (error) {
    consola.error(`Error fetching from Figma for ${frameName}:`, error)
    exit(1)
  }
}

function optimizeIconSet(iconSet: IconSet, variant: IconVariant) {
  consola.info(`Processing icon set: ${variant}`)

  const needsColorParsing = variant === IconVariant.Icons || variant === IconVariant.Duotone
  const needsMonochrome = variant === IconVariant.Logos

  for (const icon of iconSet.list())
    processIcon(iconSet, variant, icon, { needsColorParsing, needsMonochrome })

  return iconSet
}

interface ProcessOptions {
  needsColorParsing: boolean
  needsMonochrome: boolean
}

function processIcon(iconSet: IconSet, variant: IconVariant, name: string, options: ProcessOptions) {
  // For Icons variant, keep the original name without prefix
  const newName = variant === IconVariant.Icons ? name : `${variant}-${name}`
  if (newName !== name)
    iconSet.rename(name, newName)

  let svg = iconSet.toSVG(newName)
  if (!svg)
    throw new Error(`Icon ${newName} is not an SVG in the ${iconSet.prefix} icon set.`)

  if (newName === 'spinner')
    svg = addSpinnerAnimation(svg)

  cleanupSVG(svg)
  removeFigmaClipPathFromSVG(svg)
  runSVGO(svg)

  if (options.needsColorParsing)
    parseColors(svg, { defaultColor: 'currentColor', callback: handleColors, fixErrors: true })

  const deterministicId = getDeterministicId(iconSet.prefix, newName)
  const newSvg = replaceIDs(svg.toMinifiedString(), () => `${iconSet.prefix}-${newName}-${deterministicId}`)
  const processed = new SVG(newSvg)
  iconSet.setIcon(newName, processed.getIcon())

  if (options.needsMonochrome && !newName.includes('-white-'))
    createMonochromeVersion(iconSet, svg, newName)
}

function createMonochromeVersion(iconSet: IconSet, svg: SVG, newName: string) {
  const monoSvg = new SVG(svg.toMinifiedString())

  parseColors(monoSvg, {
    defaultColor: 'currentColor',
    callback: (_attr, colorStr, color) => {
      if (!color)
        return colorStr
      if (isEmptyColor(color))
        return color
      return 'currentColor'
    },
    fixErrors: true,
  })

  const newMonoName = `${newName}-mono`
  const deterministicId = getDeterministicId(iconSet.prefix, newMonoName)
  const newSvg = replaceIDs(monoSvg.toMinifiedString(), () => `${iconSet.prefix}-${newMonoName}-${deterministicId}`)

  const processed = new SVG(newSvg)
  iconSet.setIcon(newMonoName, processed.getIcon())
}

function handleColors(_: ColorAttributes, colorStr: string, color: Color | null): Color | string | 'remove' | 'unset' {
  if (!color)
    return colorStr

  if (isEmptyColor(color))
    return color

  // Convert Nimiq blue to currentColor for consistent theming
  if (compareColors(color, stringToColor('#1F2348')!))
    return 'currentColor'

  return color
}

function addSpinnerAnimation(_svg: SVG) {
  consola.info(`Adding spinner animation to spinner`)

  const html = iconToHTML(_svg.getBody(), {
    height: `${_svg.viewBox.height}`,
    width: `${_svg.viewBox.width}`,
    viewBox: `0 0 ${_svg.viewBox.width} ${_svg.viewBox.height}`,
  })

  const svg = new JSDOM(html).window.document.querySelector('svg')!
  const doc = new JSDOM(html).window.document

  const animateTransform = doc.createElementNS('http://www.w3.org/2000/svg', 'animateTransform')
  animateTransform.setAttribute('attributeName', 'transform')
  animateTransform.setAttribute('dur', '1s')
  animateTransform.setAttribute('type', 'rotate')
  animateTransform.setAttribute('from', '0 0 0')
  animateTransform.setAttribute('to', '360 0 0')
  animateTransform.setAttribute('repeatCount', 'indefinite')

  svg.appendChild(animateTransform)
  return new SVG(svg.outerHTML)
}

async function prepareNpmPackage(iconSet: IconSet, options: { target?: string, packageName?: string } = {}) {
  const { target = 'src', packageName = 'nimiq-icons' } = options

  await exportJSONPackage(iconSet, {
    target,
    package: {
      name: packageName,
      version,
      description: `The Nimiq ${packageName === 'nimiq-flags' ? 'Flags' : 'Icons'} as an iconify icon set.`,
      homepage: 'https://github.com/onmax/nimiq-ui#readme',
      repository: {
        type: 'git',
        url: 'git+https://github.com/onmax/nimiq-ui.git',
      },
      bugs: 'https://github.com/onmax/nimiq-ui/issues',
      keywords: [
        'nimiq',
        'nimiq-ui',
        packageName,
      ],
      license: 'MIT',
    },
  })
}

async function calculateIconSetSize(iconSet: IconSet): Promise<number> {
  let totalSize = 0
  for (const name of iconSet.list()) {
    const icon = iconSet.resolve(name)
    if (icon)
      totalSize += JSON.stringify(icon).length
  }
  return totalSize
}

interface IconSetStats {
  variant: string
  iconCount: number
  sizeKB: number
  averageSizeBytes: number
  package: string
}

function formatBytes(bytes: number): string {
  if (bytes < 1024)
    return `${bytes} B`
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / k ** i).toFixed(2)} ${sizes[i]}`
}

function setIconInfo(iconSet: IconSet, packageInfo: any): void {
  const allIcons = iconSet.list()

  // Try common icons with appropriate prefixing
  const sampleCandidates = [
    'flame',
    'icons-flame',
    'leaf-3',
    'icons-leaf-3',
    'star',
    'icons-star',
    'arrow-top-right',
    'icons-arrow-top-right',
    'front-fist-filled',
    'icons-front-fist-filled',
    'logos-nimiq',
    'duotone-high-five',
  ]

  // Only include icons that actually exist
  const samples = sampleCandidates.filter(icon => allIcons.includes(icon))

  if (samples.length < 3)
    samples.push(...allIcons.slice(0, 5))

  const uniqueSamples = [...new Set(samples)].slice(0, 7)

  iconSet.info = {
    name: packageInfo.name,
    total: iconSet.count(),
    version: packageInfo.version,
    author: {
      name: packageInfo.author?.name || 'Nimiq',
      url: packageInfo.author?.url || 'https://github.com/onmax',
    },
    license: {
      title: packageInfo.license || 'MIT',
      spdx: packageInfo.license || 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
    samples: uniqueSamples,
    height: 24,
    displayHeight: 24,
    category: 'General',
    tags: ['nimiq', 'cryptocurrency', 'ui'],
    palette: false,
  }
}

// ====== MAIN EXECUTION ======

async function main() {
  await checkFigmaVariants()
  consola.start('Processing icon variants...')

  // Object to store all icon sets
  const results: Array<{ variant: string, iconSet: IconSet, package: string }> = []

  // Process all icon variants sequentially to properly handle caching
  for (const variant of Object.values(IconVariant)) {
    const figma = await getFigma(variant)
    const variantName = sanitizeName(variant)

    if (figma === 'not_modified') {
      // If using cached data, try to load from the cache directory
      const cacheDir = `.figma-cache/${variantName}`
      consola.info(`Using cached data for ${variantName}`)

      // Re-import from cache with cache disabled to force load
      const cachedFigma = await importFromFigma({
        file: env.FIGMA_FILE_ID!,
        pages: ['Main'],
        token: env.FIGMA_API_TOKEN!,
        cacheDir,
        prefix: 'nimiq',
        depth: 3,
        iconNameForNode: (node) => {
          if (
            node.parents.length !== 2
            || node.type !== 'FRAME'
            || sanitizeName(node.parents.at(-1)?.name || '') !== variantName
          ) {
            return null
          }
          return sanitizeName(node.name)
        },
      })

      const iconSet = optimizeIconSet(cachedFigma.iconSet, variantName as IconVariant)
      consola.success(`Loaded ${iconSet.list().length} icons from cache for ${variantName}`)

      results.push({
        variant: variantName,
        iconSet,
        package: variant === IconVariant.Flags ? 'nimiq-flags' : 'nimiq-icons',
      })
    }
    else {
      // Process newly fetched icons
      const iconList = figma.iconSet.list()
      consola.info(`Fetched ${iconList.length} icons for ${variantName}`)

      const iconSet = optimizeIconSet(figma.iconSet, variantName as IconVariant)
      consola.success(`Generated icon set for ${variantName}: ${iconSet.list().length} icons`)

      results.push({
        variant: variantName,
        iconSet,
        package: variant === IconVariant.Flags ? 'nimiq-flags' : 'nimiq-icons',
      })
    }
  }

  // Group icon sets by package
  const iconsByPackage: Record<string, IconSet[]> = {}
  results.forEach((result) => {
    if (!iconsByPackage[result.package])
      iconsByPackage[result.package] = []
    iconsByPackage[result.package].push(result.iconSet)
  })

  // Collect statistics for each variant
  const statsPromises = results.map(async (result) => {
    const size = await calculateIconSetSize(result.iconSet)
    const iconCount = result.iconSet.list().length
    return {
      variant: result.variant,
      iconCount,
      sizeKB: Math.round(size / 1024 * 100) / 100,
      averageSizeBytes: Math.round(size / iconCount),
      package: result.package,
    } as IconSetStats
  })

  const stats = await Promise.all(statsPromises)

  // Add nimiq-icons total (but not flags)
  const nimiqIconsStats = stats.filter(s => s.package === 'nimiq-icons')
  if (nimiqIconsStats.length > 0) {
    const totalIcons = nimiqIconsStats.reduce((sum, s) => sum + s.iconCount, 0)
    const totalSize = nimiqIconsStats.reduce((sum, s) => sum + s.sizeKB, 0)
    const averageSize = nimiqIconsStats.reduce((sum, s) => sum + s.averageSizeBytes * s.iconCount, 0) / totalIcons

    stats.push({
      variant: 'TOTAL',
      iconCount: totalIcons,
      sizeKB: totalSize,
      averageSizeBytes: Math.round(averageSize),
      package: 'nimiq-icons',
    })
  }

  // Display table with statistics
  consola.info('Icon Set Statistics:')

  // Define display order for variants
  const orderMap: Record<string, number> = {
    icons: 0, // Will be renamed to "default"
    duotone: 1,
    logos: 2,
    flags: 3,
  }

  // Format for display with renamed variants
  let formattedStats = stats.map(s => ({
    'Package': s.package,
    'Variant': s.variant === 'icons' ? 'default' : s.variant,
    'Icon Count': s.iconCount,
    'Total Size': `${s.sizeKB.toFixed(2)} KB`,
    'Avg Icon Size': formatBytes(s.averageSizeBytes),
    '_sortOrder': s.variant === 'TOTAL' ? 1000 : (orderMap[s.variant] ?? 500),
    '_package': s.package,
  }))

  // Sort with flags package last and proper variant ordering
  formattedStats = formattedStats.sort((a, b) => {
    if (a._package !== b._package)
      return a._package === 'nimiq-flags' ? 1 : -1
    return a._sortOrder - b._sortOrder
  })

  // Remove internal sort properties before display
  // @ts-expect-error whatever...
  formattedStats = formattedStats.map(({ _sortOrder, _package, ...rest }) => rest)
  console.table(formattedStats)

  let combinedIconSet: IconSet | null = null
  // Process each package separately
  for (const [packageName, iconSets] of Object.entries(iconsByPackage)) {
    // Merge all icon sets for this package into one
    combinedIconSet = iconSets.reduce((prev, curr) => mergeIconSets(prev, curr))

    // Set icon info metadata before exporting
    setIconInfo(combinedIconSet, {
      name: packageName,
      license,
      author,
      version,
    })

    // Generate the npm package with the appropriate target directory
    const targetDir = packageName === 'nimiq-flags' ? 'src/flags' : 'src/icons'
    await prepareNpmPackage(combinedIconSet, { target: targetDir, packageName })
  }
  consola.success(`✅ ${Object.keys(iconsByPackage).join(' and ')} packages created successfully`)
}

// Run the main function
main().catch((error) => {
  consola.error('Fatal error:', error)
  exit(1)
})
