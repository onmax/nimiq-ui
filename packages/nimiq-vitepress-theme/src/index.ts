import type { NimiqVitepressThemeConfig } from 'nimiq-vitepress-theme/types.js'
import type { UserConfig } from 'vitepress'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { createFileSystemTypesCache } from '@shikijs/vitepress-twoslash/cache-fs'
import { defineConfigWithTheme } from 'vitepress'

export function defineNimiqVitepressConfig<T = NimiqVitepressThemeConfig>(config: UserConfig<T>): UserConfig<T> {
  const defaultConfig: UserConfig<T> = {
    title: 'Nimiq Vitepress',
    description: 'Build awesome docs with the Nimiq Style',
    markdown: {
      theme: 'vitesse-dark',
      languages: ['vue', 'vue-html', 'js', 'ts', 'markdown', 'json', 'rs'],
      codeTransformers: [
        transformerTwoslash({
          typesCache: createFileSystemTypesCache(),
        }),
      ],
    },
  }

  return defineConfigWithTheme<T>({
    extends: defaultConfig,
    ...config,
  })
}
