import { optimizeIconSet } from './icon'
import { getFigma, prepareNpmPackage, getIconVariants, sanitizeName } from './client'
import { IconSet, mergeIconSets } from '@iconify/tools'
import { icons } from '../dist'


const variants = await getIconVariants()
console.log(`Found ${variants.length} icon variants: ${variants.join(', ')}`)

const iconsSets: IconSet[] = []

for (const variant of variants) {
  const figma = await getFigma(variant)
  const variantName = sanitizeName(variant)  
  console.log(`Icons: ${figma.iconSet.list().join(', ')}`)
  const iconSet = optimizeIconSet(figma.iconSet, variantName, { resetColors: variantName === 'icons' || variantName === 'icons-lg'  })
  iconsSets.push(iconSet)
  console.log(`Generated icon set for ${variantName}: ${iconSet.list().join(', ')}`)
}

const combinedIconSet = iconsSets.reduce((prev, curr) => mergeIconSets(prev, curr))

console.log('Preparing npm package...')
await prepareNpmPackage(combinedIconSet)
