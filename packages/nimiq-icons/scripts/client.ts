import type { IconSet } from '@iconify/tools'
import { existsSync, writeFile } from 'node:fs'
import { env, exit } from 'node:process'
import { exportJSONPackage, importFromFigma } from '@iconify/tools'
import { dirname, resolve } from 'pathe'
import { version } from '../package.json'
import { IconVariant } from './consts'

export const sanitizeName = (name: string) => name.toLocaleLowerCase().trim().replace(/ /g, '-')

function getFigmaSecrets() {
  const file = env.FIGMA_FILE_ID
  const token = env.FIGMA_API_TOKEN
  if (!file || !token) {
    console.error('Please provide FIGMA_FILE_ID and FIGMA_API_TOKEN environment variables.')
    exit(1)
  }
  return { file, token }
}

// Check that the expected variants exists on the Figma File.
export async function checkFigmaVariants() {
  const { file, token } = getFigmaSecrets()
  const figma = await importFromFigma({
    file,
    pages: ['Main'],
    token,
    prefix: 'nimiq',
    depth: 2,
    ifModifiedSince: '2021-01-01T00:00:00Z',
    iconNameForNode: node => node.name.startsWith('_') ? null : node.name,
    simplifyStroke: true,
  })

  if (figma === 'not_modified') {
    console.log('Figma file has not been modified since last import.')
    exit(1)
  }

  const iconSetVariants = figma.iconSet.list().map(sanitizeName)

  // They must match our hardcoded Variants
  const ourVariants = Object.values(IconVariant)
  const missingVariants = ourVariants.filter(variant => !iconSetVariants.includes(variant))
  const extraUnknownVariants = iconSetVariants.filter(v => !ourVariants.includes(v as IconVariant))
  if (missingVariants.length > 0 || extraUnknownVariants.length > 0) {
    throw new Error(`There is an unknown variant or a missing variant: ${JSON.stringify({ extraUnknownVariants, missingVariants })}`)
  }

  console.log('🥳 Figma variants are correct.')
}

export async function getFigma(frameName: string) {
  const { file, token } = getFigmaSecrets()
  try {
    const figma = await importFromFigma({
      file,
      pages: ['Main'],
      token,
      cacheDir: resolve(dirname('..'), '.figma-cache'),
      prefix: 'nimiq',
      depth: 3,
      ifModifiedSince: true,
      simplifyStroke: true,
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
      console.log('Figma file has not been modified since last build.')
      exit(0)
    }

    return figma
  }
  catch (error) {
    console.error('Error fetching from Figma:', error)
    exit(1)
  }
}

export async function prepareNpmPackage(iconSet: IconSet) {
  await exportJSONPackage(iconSet, {
    target: 'src',
    package: {
      name: 'nimiq-icons',
      version,
      description: 'The Nimiq Icons as a iconify icon set.',
      homepage: 'https://github.com/onmax/nimiq-ui#readme',
      repository: {
        type: 'git',
        url: 'git+https://github.com/onmax/nimiq-ui.git',
      },
      bugs: 'https://github.com/onmax/nimiq-ui/issues',
      keywords: [
        'nimiq',
        'nimiq-ui',
        'nimiq-icons',
        'vitepress-theme',
      ],
      license: 'MIT',
    },
  })
  const content = `# auto-generated folder
This folder is auto-generated by the nimiq-icons package.
Do not modify it directly.
If you want to make changes, please refer to the Figma file.
`
  writeFile(resolve('../src/README.md'), content, (err) => {
    if (err) {
      console.error('Error writing README.md:', err)
      exit(1)
    }
  })
}
