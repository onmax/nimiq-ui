import { exit } from 'node:process'
import { exists, mkdir } from 'node:fs/promises'
import { cleanupSVG, importFromFigma, parseColorsSync, runSVGO } from '@iconify/tools'

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
  const svg = iconSet.toSVG(iconName)
  if (svg) {
    cleanupSVG(svg)
    runSVGO(svg)
    parseColorsSync(svg, { defaultColor: 'currentColor' })
    iconSet.setIcon(iconName, svg.getIcon())
  }
})

// Export icon set as IconifyJSON
// create directory if it doesn't exist
if (!await exists('dist'))
  await mkdir('dist')

console.log(`Exporting ${iconSet.list().length} icons to ${process.cwd()}/dist/output.json`);
await Bun.write(
  'dist/icons.json',
  JSON.stringify(iconSet.export(), null, '\t'),
)

// Export icons as SVG (optional)
// await exportToDirectory(iconSet, {
//   target: 'svg',
// })
