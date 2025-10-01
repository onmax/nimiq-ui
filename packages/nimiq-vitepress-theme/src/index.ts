import type { NimiqVitepressThemeConfig } from 'nimiq-vitepress-theme/types.js'
import type { UserConfig } from 'vitepress'
import { copyFileSync, mkdirSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import consola from 'consola'
import { defineConfig } from 'vitepress'
import inlineActionsPlugin from './vite/inline-actions-plugin'

export function defineNimiqVitepressConfig<T = NimiqVitepressThemeConfig>(config: UserConfig<T>): UserConfig<T> {
  const defaultConfig: UserConfig<T> = {
    title: 'Nimiq Vitepress',
    description: 'Build awesome docs with the Nimiq Style',
    markdown: {
      theme: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
      preConfig(md) {
        md.use(inlineActionsPlugin)
      },
    },
  }

  // Merge user's preConfig with default if provided
  const userMarkdown = config.markdown || {}
  const userPreConfig = userMarkdown.preConfig
  const userBuildEnd = config.buildEnd

  return defineConfig<T>({
    extends: defaultConfig,
    ...config,
    markdown: {
      ...defaultConfig.markdown,
      ...userMarkdown,
      preConfig(md) {
        // Apply default plugin
        md.use(inlineActionsPlugin)
        // Then apply user's preConfig if exists
        if (userPreConfig) {
          userPreConfig(md)
        }
      },
    },
    buildEnd(siteConfig) {
      const srcDir = siteConfig.srcDir
      const outDir = siteConfig.outDir

      function copyMarkdownFiles(dir: string) {
        const entries = readdirSync(dir, { withFileTypes: true })

        for (const entry of entries) {
          const fullPath = join(dir, entry.name)

          if (entry.isDirectory()) {
            copyMarkdownFiles(fullPath)
          }
          else if (entry.isFile() && entry.name.endsWith('.md')) {
            const relativePath = relative(srcDir, fullPath)
            const destPath = join(outDir, relativePath)
            const destDir = join(destPath, '..')

            mkdirSync(destDir, { recursive: true })
            copyFileSync(fullPath, destPath)
          }
        }
      }

      consola.info('Copying markdown files to build output...')
      copyMarkdownFiles(srcDir)
      consola.success('Markdown files copied successfully')

      // Call user's buildEnd if provided
      if (userBuildEnd) {
        userBuildEnd(siteConfig)
      }
    },
  })
}
