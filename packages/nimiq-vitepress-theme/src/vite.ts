import type { Plugin } from 'vite'
import { GitChangelog } from '@nolebase/vitepress-plugin-git-changelog/vite'
import llmstxt from 'vitepress-plugin-llms'
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

  /**
   * LLM-friendly markdown generation options
   * Set to false to disable generation
   * @default true
   */
  llms?: boolean | Parameters<typeof llmstxt>[0]
}

export async function NimiqVitepressVitePlugin({
  repoURL,
  contentPath = '',
  gitChangelog,
  llms = true,
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

  if (llms !== false) {
    const llmsOptions = typeof llms === 'object' ? llms : {}

    // Add a custom middleware to handle .md requests with proper base path handling
    // This works around a bug in vitepress-plugin-llms that causes ERR_HTTP_HEADERS_SENT
    plugins.push({
      name: 'nimiq-llms-middleware',
      enforce: 'pre',
      async configureServer(server) {
        const { readFile } = await import('node:fs/promises')
        const { resolve: resolvePath } = await import('node:path')

        server.middlewares.use(async (req, res, next) => {
          // Only handle .md and .txt requests
          if (!req.url?.endsWith('.md') && !req.url?.endsWith('.txt')) {
            return next()
          }

          try {
            const vitepressConfig = server.config?.vitepress
            const base = vitepressConfig?.site?.base || '/'
            const outDir = vitepressConfig?.outDir ?? 'dist'

            // Strip base path from URL if present
            let urlPath = req.url
            if (base !== '/' && urlPath.startsWith(base)) {
              urlPath = urlPath.slice(base.length - 1) // Keep the leading slash
            }

            // Remove extension and re-add .md
            const pathWithoutExt = urlPath.replace(/\.(md|txt)$/, '')
            const filePath = resolvePath(outDir, `${pathWithoutExt}.md`)

            const content = await readFile(filePath, 'utf-8')
            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            res.end(content)
          }
          catch {
            // File not found or other error - just pass to next middleware
            next()
          }
        })
      },
    })

    // Still include the llms plugin for build-time generation
    const llmsPlugins = llmstxt({
      generateLLMsTxt: false,
      generateLLMsFullTxt: false,
      generateLLMFriendlyDocsForEachPage: true,
      injectLLMHint: false,
      excludeIndexPage: false,
      stripHTML: false,
      ...llmsOptions,
    })

    // But filter out its configureServer hook to avoid the double middleware issue
    const buildOnlyPlugins = llmsPlugins.map((plugin) => {
      if (plugin && typeof plugin === 'object' && 'configureServer' in plugin) {
        const { configureServer, ...rest } = plugin
        return rest
      }
      return plugin
    })

    plugins.push(...buildOnlyPlugins)
  }

  return plugins
}

export default NimiqVitepressVitePlugin
