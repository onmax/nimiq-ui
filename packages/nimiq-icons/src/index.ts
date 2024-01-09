import { optimizeIconSet } from './icon'
import { getFigma, prepareNpmPackage, getIconPackages, sanitizeName } from './client'
import { IconSet, mergeIconSets } from '@iconify/tools'



const packages = await getIconPackages()
console.log(`Found ${packages.length} icon packages: ${packages.join(', ')}`)

const iconsSets: IconSet[] = []

for (const pkg of packages) {
  const figma = await getFigma(pkg)
  const pkgName = sanitizeName(pkg)  
  console.log(`Icons: ${figma.iconSet.list().join(', ')}`)
  optimizeIconSet(figma.iconSet, pkgName, { resetColors: pkgName !== 'Logos' })
  iconsSets.push(figma.iconSet)
  console.log(`Generated icon set for ${pkgName}: ${figma.iconSet.list().join(', ')}`)
}

const combinedIconSet = iconsSets.reduce((prev, curr) => mergeIconSets(prev, curr))

console.log('Preparing npm package...')
await prepareNpmPackage(combinedIconSet)
