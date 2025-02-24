import type { NimiqVitepressThemeConfig } from 'nimiq-vitepress-theme'
import type { UserConfig } from 'vitepress'
import { defineConfigWithTheme } from 'vitepress'
import ComponentPreviewPlugin from './theme/plugins/component-preview'

export default defineConfigWithTheme<NimiqVitepressThemeConfig>({
  title: 'Nimiq UI',
  description: 'Build awesome apps with the Nimiq Style',
  themeConfig: {
    sidebar: [
      {
        label: 'Guide',
        items: [
          { text: 'Getting started', link: '/frankenstein/getting-started', icon: 'i-tabler:arrow-guide' },
        ],
      },
      {
        label: 'Components',
        items: [
          {
            text: 'Modal',
            icon: 'i-custom:modal',
            items: [
              { text: 'Basic Modal', link: '/frankenstein/components/basic-modal' },
              { text: 'Nested Modal', link: '/frankenstein/components/nested-modal' },
            ],
          },
        ],
      },
    ],
    socialLinks: [
      {'icon': 'i-nimiq:logos-github-mono', link: 'https://github.com/onmax/nimiq-ui'}
    ]
  },
   markdown: {
    preConfig(md) {
      md.use(ComponentPreviewPlugin)
    },
    theme: 'vitesse-dark',
    languages: ['vue', 'vue-html', 'js', 'ts']
  },
} satisfies UserConfig<NimiqVitepressThemeConfig>)
