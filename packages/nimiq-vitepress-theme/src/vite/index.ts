import type { IncomingMessage } from 'node:http'
import type { Plugin, PreviewServerHook, ServerHook } from 'vite'
import { viteHtmlToMarkdownPlugin } from '@mdream/vite'
import { GitChangelog } from '@nolebase/vitepress-plugin-git-changelog/vite'
import { groupIconVitePlugin } from '../code-groups/vite'

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
   * Customize the "Suggest changes" footer text
   * - false: hide the footer link
   * - string: use custom text (supports markdown)
   * - function: dynamic text based on page path
   */
  suggestChanges?: false | string | ((options: { path: string }) => string)

  /**
   * Git changelog configuration
   * If not provided, will use repoURL as default
   * Set to false to disable changelog
   */
  gitChangelog?: GitChangelogOptions | false
}

export function NimiqVitepressVitePlugin({
  repoURL,
  contentPath = '',
  suggestChanges,
  gitChangelog,
}: NimiqVitepressVitePluginOptions): Plugin[] {
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
    suggestChanges,
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

  // Add mdream plugin to generate markdown copies of each page
  const markdownPlugin = guardMarkdownMiddleware(
    viteHtmlToMarkdownPlugin({
      outputDir: 'markdown',
      cacheEnabled: true,
      exclude: [
        '**/node_modules/**',
        '**/@vite/**',
        '**/@id/**',
        '**/@fs/**',
        '**/*.js',
        '**/*.mjs',
        '**/*.ts',
        '**/*.tsx',
      ],
    }),
  )

  plugins.push(markdownPlugin)

  return plugins
}

function guardMarkdownMiddleware(plugin: Plugin): Plugin {
  const shouldServeMarkdown = (req: IncomingMessage | undefined) => {
    if (!req?.url) {
      return false
    }

    if (req.url.endsWith('.md')) {
      return true
    }

    const accept = req.headers.accept ?? ''
    return accept.includes('text/markdown')
  }
  interface HookObject<T> {
    handler: T
    order?: 'pre' | 'post' | null
  }

  const isHookObject = <T>(value: unknown): value is HookObject<T> => {
    return Boolean(value) && typeof value === 'object' && 'handler' in (value as Record<string, unknown>)
  }

  const wrapHook = <T extends (server: any) => any>(hook?: T | HookObject<T>) => {
    if (!hook) {
      return hook
    }

    const original = typeof hook === 'function' ? hook : hook.handler

    const wrapped: T = ((server: any) => {
      const middlewares = (server as any)?.middlewares
      if (!middlewares?.use) {
        return original(server)
      }

      const originalUse = middlewares.use.bind(middlewares)

      middlewares.use = (fn: any) => originalUse((req: IncomingMessage, res: any, next: any) => {
        if (shouldServeMarkdown(req)) {
          return fn(req, res, next)
        }
        return next()
      })

      const result = original(server)

      const restore = () => {
        middlewares.use = originalUse
      }

      if (typeof result === 'function') {
        return (...args: any[]) => {
          try {
            return result(...args)
          }
          finally {
            restore()
          }
        }
      }

      if (result && typeof result.then === 'function') {
        return (result.finally(restore))
      }

      restore()
      return result
    }) as T

    if (!isHookObject<T>(hook)) {
      return wrapped
    }

    return {
      ...hook,
      handler: wrapped,
    }
  }

  plugin.configureServer = wrapHook(plugin.configureServer as ServerHook | HookObject<ServerHook>) as typeof plugin.configureServer
  plugin.configurePreviewServer = wrapHook(plugin.configurePreviewServer as PreviewServerHook | HookObject<PreviewServerHook>) as typeof plugin.configurePreviewServer

  return plugin
}
