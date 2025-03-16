import type { IconSet } from '@iconify/tools'
import { exit } from 'node:process'
import { mergeIconSets } from '@iconify/tools'
import { checkFigmaVariants, getFigma, prepareNpmPackage, sanitizeName } from './client'
import { IconVariant } from './consts'
import { optimizeIconSet } from './icon'
import 'dotenv/config'

await checkFigmaVariants()

const iconsSets: IconSet[] = []

for (const variant of Object.values(IconVariant)) {
  const figma = await getFigma(variant)
  if (figma === 'not_modified')
    continue

  const variantName = sanitizeName(variant)

  console.log(`Icons: ${figma.iconSet.list().join(', ')}`)
  const iconSet = optimizeIconSet(figma.iconSet, variantName as IconVariant)
  iconsSets.push(iconSet)
  console.log(`Generated icon set for ${variantName}: ${iconSet.list().join(', ')}`)
}

if (iconsSets.length === 0) {
  console.log('No new icons found.')
  exit(0)
}

const combinedIconSet = iconsSets.reduce((prev, curr) => mergeIconSets(prev, curr))

console.log('Preparing npm package...')
await prepareNpmPackage(combinedIconSet)
