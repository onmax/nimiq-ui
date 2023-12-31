import { exit, env } from 'node:process'
import {  IconSet, exportJSONPackage, importFromFigma } from '@iconify/tools'
import { FigmaImportNodeData, FigmaParentNodeData } from '@iconify/tools/lib/import/figma/types/nodes'

export async function getFigma(frameName: string) {
  const file = env.FIGMA_FILE_ID
  const token = env.FIGMA_API_TOKEN
  if (!file || !token) {
    console.error('Please provide FIGMA_FILE_ID and FIGMA_API_TOKEN environment variables.')
    exit(1)
  }

  const figma = await importFromFigma({
    file,
    pages: ['Main'],
    token,
    prefix: 'nimiq',
    depth: 3,
    ifModifiedSince: '2021-01-01T00:00:00Z',
    iconNameForNode: node => {
      if (
				// Icons are stored after 2 parents: page -> container frame -> icon
				node.parents.length !== 2 ||
				// Icons use frames
				node.type !== 'FRAME' ||
        // !node.parents.find(parent => parent.name === frameName)
        // It is direct child of the frameName
        node.parents.at(-1)?.name !== frameName
			) {
				return null;
			}
      return node.name.toLocaleLowerCase().replace(/ /g, '-')
    } 
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
