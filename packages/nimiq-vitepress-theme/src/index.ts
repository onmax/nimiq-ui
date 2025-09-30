import type { NimiqVitepressThemeConfig } from 'nimiq-vitepress-theme/types.js'
import type { UserConfig } from 'vitepress'
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
  })
}
