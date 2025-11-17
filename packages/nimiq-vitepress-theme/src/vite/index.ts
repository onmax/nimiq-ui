import type { Plugin } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { GitChangelog } from '@nolebase/vitepress-plugin-git-changelog/vite'
import { groupIconVitePlugin } from '../code-groups/vite'

type GitChangelogOptions = Parameters<typeof GitChangelog>[0]

export interface NimiqVitepressVitePluginOptions {
  repoURL?: string
  contentPath?: string
  gitChangelog?: GitChangelogOptions | false
}

function getProjectVersion(rootDir: string = process.cwd()): string | undefined {
  try {
    const packageJsonPath = path.resolve(rootDir, 'package.json')
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
      return packageJson.version
    }
  }
  catch (error) {
    console.warn('Failed to read version from package.json:', error)
  }
  return undefined
}

export function NimiqVitepressVitePlugin({
  repoURL,
  contentPath = '',
  gitChangelog,
}: NimiqVitepressVitePluginOptions): Plugin[] {
  const { resolveId, configureServer, load, transform } = groupIconVitePlugin()

  const externalPlugins: Plugin[] = []

  if (gitChangelog !== false) {
    const changelogConfig = gitChangelog || (repoURL ? { repoURL } : {})
    if (Object.keys(changelogConfig).length > 0) {
      externalPlugins.push(GitChangelog(changelogConfig))
    }
  }

  const version = getProjectVersion()

  const nimiqConfig = {
    repoURL,
    contentPath,
    version,
  }

  const plugins: Plugin[] = [
    {
      name: 'nimiq-vitepress-plugin',
      enforce: 'pre',
      resolveId,
      configureServer,
      load,
      transform,
      config: () => ({
        define: {
          __NIMIQ_VITEPRESS_CONFIG__: JSON.stringify(nimiqConfig),
        },
        optimizeDeps: {
          exclude: [
            'nimiq-vitepress-theme',
            'virtual:nolebase-git-changelog',
          ],
        },
        ssr: {
          noExternal: [
            'nimiq-vitepress-theme',
          ],
        },
      }),
    } satisfies Plugin,
    ...externalPlugins,
  ]

  return plugins
}
