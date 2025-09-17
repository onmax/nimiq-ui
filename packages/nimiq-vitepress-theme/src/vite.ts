import type { Plugin } from 'vite'
import { GitChangelog } from '@nolebase/vitepress-plugin-git-changelog/vite'
import { groupIconVitePlugin } from './code-groups/vite'

type GitChangelogOptions = Parameters<typeof GitChangelog>[0]

export interface NimiqVitepressVitePluginOptions {
  /**
   * GitHub repository URL (e.g., 'https://github.com/owner/repo')
   * Used as default for GitChangelog and for constructing source code URLs
   */
  repoURL?: string

  /**
   * Content directory path relative to repository root
   * Specifies where documentation files are located
   * @default '' (repository root)
   */
  contentPath?: string

  /**
   * Git changelog configuration
   * If not provided, will use repoURL as default
   * Set to false to disable changelog
   */
  gitChangelog?: GitChangelogOptions | false
}

export async function NimiqVitepressVitePlugin({
  repoURL,
  contentPath = '',
  gitChangelog,
}: NimiqVitepressVitePluginOptions): Promise<Plugin[]> {
  const { resolveId, configureServer, load, transform } = groupIconVitePlugin()

  const externalPlugins: Plugin[] = []

  // Configure GitChangelog with repoURL as default
  if (gitChangelog !== false) {
    const changelogConfig = gitChangelog || (repoURL ? { repoURL } : {})
    if (Object.keys(changelogConfig).length > 0) {
      externalPlugins.push(GitChangelog(changelogConfig))
    }
  }

  // Store configuration in Vite config for use in composables
  const nimiqConfig = {
    repoURL,
    contentPath,
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
}

export default NimiqVitepressVitePlugin
