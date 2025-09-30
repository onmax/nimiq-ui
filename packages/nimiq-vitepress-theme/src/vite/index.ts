import type { Plugin } from 'vite'
import type { VitePluginGitChangelog } from 'vitepress-plugin-git-changelog/types'
import { viteHtmlToMarkdownPlugin } from '@mdream/vite'

export interface NimiqVitepressVitePluginOptions {
  /**
   * GitHub repository URL for source code links
   * @example 'https://github.com/your-org/your-repo'
   */
  repoURL?: string

  /**
   * Directory path where documentation files are located relative to repository root
   * @default ''
   * @example 'docs'
   */
  contentPath?: string

  /**
   * Git changelog configuration
   * Set to false to disable changelog
   * @default Uses repoURL as default
   */
  gitChangelog?: VitePluginGitChangelog | false

  /**
   * Markdown generation options
   * Set to false to disable markdown generation
   * @default true
   */
  markdown?: boolean | {
    /**
     * Cache time-to-live for production (milliseconds)
     * @default 3600000 (1 hour)
     */
    cacheTTL?: number
    /**
     * Enable verbose logging
     * @default false
     */
    verbose?: boolean
  }
}

export function NimiqVitepressVitePlugin(options: NimiqVitepressVitePluginOptions = {}): Plugin[] {
  const {
    repoURL,
    contentPath = '',
    gitChangelog,
    markdown = true,
  } = options

  const plugins: Plugin[] = []

  // Add markdown generation plugin
  if (markdown !== false) {
    const mdreamOptions = typeof markdown === 'object' ? markdown : {}
    const mdreamPlugin = viteHtmlToMarkdownPlugin({
      cacheEnabled: true,
      cacheTTL: mdreamOptions.cacheTTL ?? 3600000,
      verbose: mdreamOptions.verbose ?? false,
      preserveStructure: true,
    })

    // Ensure the plugin runs after other plugins to avoid conflicts
    if (mdreamPlugin && typeof mdreamPlugin === 'object') {
      mdreamPlugin.enforce = 'post'
    }

    plugins.push(mdreamPlugin)
  }

  // Add Git changelog plugin if enabled
  if (gitChangelog !== false) {
    // Dynamically import to avoid hard dependency
    plugins.push({
      name: 'nimiq-vitepress-git-changelog',
      async configResolved(config) {
        const { GitChangelog } = await import('vitepress-plugin-git-changelog/vite')

        const changelogOptions = gitChangelog || {
          repoURL: repoURL || '',
        }

        const changelogPlugin = GitChangelog(changelogOptions)
        if (changelogPlugin && typeof changelogPlugin === 'object' && 'configResolved' in changelogPlugin) {
          await changelogPlugin.configResolved?.(config)
        }
      },
    })
  }

  // Inject config for source code composable
  plugins.push({
    name: 'nimiq-vitepress-config',
    config() {
      return {
        define: {
          __NIMIQ_VITEPRESS_REPO_URL__: JSON.stringify(repoURL || ''),
          __NIMIQ_VITEPRESS_CONTENT_PATH__: JSON.stringify(contentPath),
        },
      }
    },
  })

  return plugins
}
