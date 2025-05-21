import type { Plugin } from 'vite'
import { GitChangelog } from '@nolebase/vitepress-plugin-git-changelog/vite'
import { groupIconVitePlugin } from './code-groups/vite'

type GitChangelogOptions = Parameters<typeof GitChangelog>[0]

export interface NimiqVitepressVitePluginOptions {
  gitChangelog: GitChangelogOptions | false
}

export async function NimiqVitepressVitePlugin({ gitChangelog }: NimiqVitepressVitePluginOptions): Promise<Plugin[]> {
  const { resolveId, configureServer, load, transform } = groupIconVitePlugin()

  const externalPlugins: Plugin[] = []

  if (gitChangelog !== false) {
    externalPlugins.push(GitChangelog(gitChangelog))
  }

  return [
    {
      name: 'nimiq-vitepress-plugin',
      enforce: 'pre',
      resolveId,
      configureServer,
      load,
      transform,
      config: () => ({
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
}

export default NimiqVitepressVitePlugin
