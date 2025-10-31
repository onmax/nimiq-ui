import type { Plugin } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { viteHtmlToMarkdownPlugin } from '@mdream/vite'
import { GitChangelog } from '@nolebase/vitepress-plugin-git-changelog/vite'
import llmstxt from 'vitepress-plugin-llms'
import { groupIconVitePlugin } from '../code-groups/vite'

type GitChangelogOptions = Parameters<typeof GitChangelog>[0]
type LlmsPluginOptions = Parameters<typeof llmstxt>[0]

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
   * LLMs.txt plugin configuration
   * Automatically generates llms.txt and llms-full.txt during build
   * Set to false to disable (only mdream markdown generation will be used)
   * @default true
   */
  llms?: LlmsPluginOptions | boolean
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
  llms = true,
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

  // Configure LLMs.txt plugin for automatic llms.txt generation
  if (llms !== false) {
    const llmsConfig = typeof llms === 'object' ? llms : {}
    externalPlugins.push(llmstxt(llmsConfig))
  }

  // Get project version from package.json
  const version = getProjectVersion()

  // Store configuration in Vite config for use in composables
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

  // Add mdream plugin to generate markdown copies of each page
  // Generates .md files alongside .html files in build output
  plugins.push(
    viteHtmlToMarkdownPlugin({
      cacheEnabled: true,
      exclude: [
        '**/node_modules/**',
        '**/@vite/**',
        '**/@id/**',
        '**/@fs/**',
        '**/__*/**', // Exclude Vite internals
        '**/*.js',
        '**/*.mjs',
        '**/*.ts',
        '**/*.tsx',
        '**/*.json',
        '**/*.css',
      ],
    }),
  )

  return plugins
}
