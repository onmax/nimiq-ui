import type { IconSet } from '@iconify/tools'
import { mergeIconSets } from '@iconify/tools'
import { checkFigmaVariants, getFigma, prepareNpmPackage, sanitizeName } from './client'
import { IconVariant } from './consts'
import { optimizeIconSet } from './icon'

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
