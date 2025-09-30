import type { NimiqVitepressThemeConfig } from 'nimiq-vitepress-theme/types.js'
import type { UserConfig } from 'vitepress'
import { defineConfig } from 'vitepress'
import { generateMarkdownFiles } from './vite/markdown-generator'

export function defineNimiqVitepressConfig<T = NimiqVitepressThemeConfig>(config: UserConfig<T>): UserConfig<T> {
  const defaultConfig: UserConfig<T> = {
    title: 'Nimiq Vitepress',
    description: 'Build awesome docs with the Nimiq Style',
    markdown: {
      theme: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
    },
    buildEnd: async (siteConfig) => {
      await generateMarkdownFiles(siteConfig.outDir)
    },
  }

  return defineConfig<T>({
    extends: defaultConfig,
    ...config,
  })
}
