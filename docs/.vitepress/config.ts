import type { NimiqVitepressThemeConfig } from 'nimiq-vitepress-theme'
import type { UserConfig } from 'vitepress'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { createFileSystemTypesCache } from '@shikijs/vitepress-twoslash/cache-fs'
import { defineConfigWithTheme } from 'vitepress'
import PreviewPlugin from './theme/plugins/component-preview'

// @unocss-include

export default defineConfigWithTheme<NimiqVitepressThemeConfig>({
  title: 'Nimiq UI',
  description: 'Build awesome apps with the Nimiq Style',
  base: '/nimiq-ui/',
  themeConfig: {
    modules: [
      {
        subpath: 'nimiq-css',
        icon: 'i-custom:nimiq-css',
        defaultPageLink: '/nimiq-css/getting-started',
        text: 'Nimiq CSS',
        description: 'The CSS framework',
        sidebar: [
          {
            label: 'Getting Started',
            items: [
              { text: 'Getting started', link: '/nimiq-css/getting-started', icon: 'i-tabler:arrow-guide ' },
              { text: 'Philosophy', link: '/nimiq-css/philosophy', icon: 'i-tabler:brain ' },
              { text: 'Migrate from Nimiq Style', link: '/nimiq-css/migrate-from-nimiq-styles', icon: 'i-tabler:arrow-move-right-filled ' },
            ],
          },
          {
            label: 'Core Features',
            items: [
              { text: 'Palette', link: '/nimiq-css/palette', icon: 'i-tabler:palette ' },
              { text: 'Utilities', link: '/nimiq-css/utilities', icon: 'i-tabler:building-factory-2 ' },
              { text: 'Typography', icon: 'i-nimiq:file-text ', items: [
                { text: 'Getting started', link: '/nimiq-css/typography' },
                { text: 'Example', link: '/nimiq-css/typography/demo-article' },
              ] },
              {
                text: 'CSS Layers',
                icon: 'i-tabler:binary-tree ',
                items: [
                  { text: 'Overview', link: '/nimiq-css/layers/index' },
                  { text: 'Preflights', link: '/nimiq-css/layers/preflights' },
                  { text: 'Colors', link: '/nimiq-css/layers/colors' },
                  { text: 'Fonts', link: '/nimiq-css/layers/fonts' },
                  { text: 'Utilities', link: '/nimiq-css/layers/utilities' },
                  { text: 'Typography', link: '/nimiq-css/layers/typography' },
                  { text: 'Static content', link: '/nimiq-css/layers/static-content' },
                ],
              },
            ],
          },
          {
            label: 'Integrations',
            items: [
              { text: 'Native CSS', link: '/nimiq-css/integrations/native-css', icon: 'i-simple-icons:css' },
              { text: 'UnoCSS', link: '/nimiq-css/integrations/unocss', icon: 'i-simple-icons:unocss' },
              { text: 'TailwindCSS', link: '/nimiq-css/integrations/tailwindcss', icon: 'i-simple-icons:tailwindcss' },
            ],
          },
        ],
      },
      {
        subpath: 'frankenstein',
        text: 'Nimiq Frankenstein',
        icon: 'i-custom:frankenstein',
        defaultPageLink: '/frankenstein/getting-started',
        description: 'The Vue 3 components',
        sidebar: [
          {
            label: 'Getting Started',
            items: [
              { text: 'Getting started', link: '/frankenstein/getting-started', icon: 'i-tabler:arrow-guide ' },
            ],
          },
          {
            label: 'Vue Components',
            items: [
              {
                text: 'Dialog Components',
                icon: 'i-custom:modal',
                items: [
                  { text: 'Basic Modal', link: '/frankenstein/components/basic-modal' },
                  { text: 'Nested Modal', link: '/frankenstein/components/nested-modal' },
                ],
              },
              {
                text: 'Animated Staking Ripple',
                icon: 'i-nimiq:leaf-3',
                link: 'frankenstein/components/animated-staking-ripple',
              },
            ],
          },
        ],
      },
      {
        subpath: 'vitepress-theme',
        text: 'Vitepress Theme',
        icon: 'i-custom:nimiq-vitepress',
        defaultPageLink: '/vitepress-theme',
        description: 'Your Vitepress with Nimiq',
        sidebar: [
          {
            items: [
              { text: 'Getting Started', link: '/vitepress-theme', icon: 'i-tabler:arrow-guide ' },
              {
                text: 'Available Components',
                icon: 'i-nimiq:icons-lg-widget',
                items: [
                  { text: 'Code Block', link: '/vitepress-theme/components/code-block' },
                  { text: 'Card', link: '/vitepress-theme/components/card' },
                  { text: 'Large Card', link: '/vitepress-theme/components/large-card' },
                  { text: 'Grid', link: '/vitepress-theme/components/grid' },
                  { text: 'Callout & Blockquotes', link: '/vitepress-theme/components/callouts-and-blockquotes' },
                  { text: 'Vitepress Components', link: '/vitepress-theme/components/vitepress-components' },
                ],
              },
            ],
          },
        ],
      },
      {
        subpath: 'nimiq-icons',
        text: 'Nimiq Icons',
        icon: 'i-custom:nimiq-vitepress',
        defaultPageLink: '/nimiq-icons/explorer',
        description: 'The Iconify Set for Nimiq',
        sidebar: [
          {
            items: [
              { text: 'Getting started', link: '/nimiq-icons', icon: 'i-tabler:arrow-guide ' },
              { text: 'Explorer', link: '/nimiq-icons/explorer', icon: 'i-tabler:telescope ' },
              { text: 'Figma', link: 'https://www.figma.com/design/iyfVJafk18HfrYLXukpf0n/Nimiq-Icons', icon: 'i-tabler:brand-figma ' },
            ],
          },
        ],
      },
    ],
    links: [
      { icon: 'i-nimiq:logos-github-mono', link: 'https://github.com/onmax/nimiq-ui' },
    ],
  },
  markdown: {
    preConfig(md) {
      md.use(PreviewPlugin)
    },
    theme: 'vitesse-dark',
    languages: ['vue', 'vue-html', 'js', 'ts', 'markdown'],
    codeTransformers: [
      transformerTwoslash({
        typesCache: createFileSystemTypesCache(),
      }),
    ],
  },
} satisfies UserConfig<NimiqVitepressThemeConfig>)
