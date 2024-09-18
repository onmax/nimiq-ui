import { env, exit } from 'node:process'
import type { IconSet } from '@iconify/tools'
import { exportJSONPackage, importFromFigma } from '@iconify/tools'
import { IconVariant } from './consts'

export const sanitizeName = (name: string) => name.toLocaleLowerCase().replace(/ /g, '-')

function getFigmaSecrets() {
  const file = env.FIGMA_FILE_ID
  const token = env.FIGMA_API_TOKEN
  console.log({file,token})
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
  const figma = await importFromFigma({
    file,
    pages: ['Main'],
    token,
    prefix: 'nimiq',
    depth: 3,
    ifModifiedSince: '2021-01-01T00:00:00Z',
    simplifyStroke: true,
    iconNameForNode: (node) => {
      if (
        // Icons are stored after 2 parents: page -> container frame -> icon
        node.parents.length !== 2
        // Icons use frames
        || node.type !== 'FRAME'
        // !node.parents.find(parent => parent.name === frameName)
        // It is direct child of the frameName
        || sanitizeName(node.parents.at(-1)?.name || '') !== frameName
      ) {
        return null
      }
      return sanitizeName(node.name)
    },
  })

  if (figma === 'not_modified') {
    console.log('Figma file has not been modified since last import.')
    exit(1)
  }

  return figma
}

export async function prepareNpmPackage(iconSet: IconSet) {
  await exportJSONPackage(iconSet, {
    target: 'dist',
    package: {
      name: 'nimiq-icons',
      version: '0.0.1',
      description: 'Nimiq icons',
      license: 'MIT',
    },
  })
}
