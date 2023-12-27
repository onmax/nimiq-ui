import { exit } from 'node:process'
import { cleanupSVG, exportJSONPackage, importFromFigma, isEmptyColor, parseColorsSync, runSVGO } from '@iconify/tools'
import { compareColors, stringToColor } from '@iconify/utils/lib/colors'

// Get Figma file ID and API token from environment variables
const file = Bun.env.FIGMA_FILE_ID
const token = Bun.env.FIGMA_API_TOKEN
if (!file || !token) {
  console.error('Please provide FIGMA_FILE_ID and FIGMA_API_TOKEN environment variables.')
  exit(1)
}

// Import icon set from Figma
const figma = await importFromFigma({
  file,
  token,
  cacheDir: 'cache',
  prefix: 'nimiq',
  ifModifiedSince: '2021-01-01T00:00:00Z',
  iconNameForNode: node => node.name.toLocaleLowerCase(),
})

if (figma === 'not_modified') {
  console.log('Figma file has not been modified since last import.')
  exit(1)
}
const { iconSet } = figma

// Clean up and optimize each icon
iconSet.list().forEach((iconName) => {
  const name = iconName.replace(/ /g, '-')
  if (name !== iconName)
    iconSet.rename(iconName, name)

  const svg = iconSet.toSVG(name)

  if (svg) {
    cleanupSVG(svg)
    runSVGO(svg)
    parseColorsSync(svg, {
      // Change default color to 'currentColor'
      defaultColor: 'currentColor',

      // Callback to parse each color
      callback: (attr, colorStr, color) => {
        if (!color) {
          // color === null, so color cannot be parsed
          // Return colorStr to keep old value
          return colorStr
        }

        if (isEmptyColor(color)) {
          // Color is empty: 'none' or 'transparent'
          // Return color object to keep old value
          return color
        }

        // Black color: change to 'currentColor'
        if (compareColors(color, stringToColor('black')!))
          return 'currentColor'

        // White color: belongs to white background rectangle: remove rectangle
        if (compareColors(color, stringToColor('white')!))
          return 'remove'

        return color
      },
    })

    console.log(`Exporting ${name}...`)
    iconSet.setIcon(name, svg.getIcon())
  }
})

await exportJSONPackage(iconSet, {
  target: 'dist',
  package: {
    name: 'nimiq-icons',
    version: '0.0.1',
    description: 'Nimiq icons',
    license: 'MIT',
  },
})
