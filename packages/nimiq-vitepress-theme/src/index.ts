import type { NimiqVitepressThemeConfig } from 'nimiq-vitepress-theme/types.js'
import type { UserConfig } from 'vitepress'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { createFileSystemTypesCache } from '@shikijs/vitepress-twoslash/cache-fs'
import { defu } from 'defu'
import { defineConfigWithTheme } from 'vitepress'
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'

const defaultConfig: UserConfig<NimiqVitepressThemeConfig> = {
  title: 'Nimiq Vitepress',
  description: 'Build awesome docs with the Nimiq Style',
  markdown: {
    config: (md) => {
      md.use(groupIconMdPlugin)
    },
    theme: 'vitesse-dark',
    languages: ['vue', 'vue-html', 'js', 'ts', 'markdown', 'json', 'rs'],
    codeTransformers: [
      transformerTwoslash({
        typesCache: createFileSystemTypesCache(),
      }),
    ],
  },
}

export function defineNimiqVitepressConfig<T extends NimiqVitepressThemeConfig>(config: UserConfig<T>) {
  const mergedConfig = defu(config, defaultConfig) as UserConfig<NimiqVitepressThemeConfig>
  return defineConfigWithTheme(mergedConfig)
}
