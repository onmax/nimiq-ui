import type { Plugin } from 'vite'
import type { VitePluginGitChangelog } from 'vitepress-plugin-git-changelog/types'
import llmstxt from 'vitepress-plugin-llms'

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
   * LLM-friendly markdown generation options
   * Set to false to disable generation
   * @default true
   */
  llms?: boolean | Parameters<typeof llmstxt>[0]
}

export function NimiqVitepressVitePlugin(options: NimiqVitepressVitePluginOptions = {}): Plugin[] {
  const {
    repoURL,
    contentPath = '',
    gitChangelog,
    llms = true,
  } = options

  const plugins: Plugin[] = []

  // Add llmstxt plugin to generate markdown copies of each page
  if (llms !== false) {
    const llmsOptions = typeof llms === 'object' ? llms : {}
    const llmsPlugins = llmstxt({
      generateLLMsTxt: false,
      generateLLMsFullTxt: false,
      generateLLMFriendlyDocsForEachPage: true,
      injectLLMHint: false,
      excludeIndexPage: false,
      stripHTML: true,
      ...llmsOptions,
    })

    plugins.push(...llmsPlugins)
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
