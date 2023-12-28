import { optimizeIconSet } from './icon'
import { getFigma, prepareNpmPackage } from './client'


console.log('Getting Figma file...')
const figma = await getFigma('Icons')

const names = figma.iconSet.list()
console.log('Optimizing icons', names.join(', ') + '...')
optimizeIconSet(figma.iconSet)

console.log('Preparing npm package...')
await prepareNpmPackage(figma.iconSet)
