import { optimizeIconSet } from './icon'
import { getFigma, prepareNpmPackage, sanitizeName, checkFigmaVariants } from './client'
import { IconSet, mergeIconSets } from '@iconify/tools'
import { IconVariant } from './consts'

await checkFigmaVariants()

const iconsSets: IconSet[] = []

for (const variant of Object.values(IconVariant)) {
  const figma = await getFigma(variant)
  const variantName = sanitizeName(variant)  
  console.log(`Icons: ${figma.iconSet.list().join(', ')}`)
  const iconSet = optimizeIconSet(figma.iconSet, variantName as IconVariant)
  iconsSets.push(iconSet)
  console.log(`Generated icon set for ${variantName}: ${iconSet.list().join(', ')}`)
}

const combinedIconSet = iconsSets.reduce((prev, curr) => mergeIconSets(prev, curr))

console.log('Preparing npm package...')
await prepareNpmPackage(combinedIconSet)
