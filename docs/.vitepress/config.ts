import { defineNimiqVitepressConfig } from '../../packages/nimiq-vitepress-theme/src/'
import PreviewPlugin from './theme/plugins/component-preview'

// @unocss-include

export default defineNimiqVitepressConfig({
  title: 'Nimiq UI',
  description: 'Build awesome apps with the Nimiq Style',
  base: '/nimiq-ui/',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/nimiq-ui/favicon.svg' }],
  ],
  themeConfig: {
    search: { provider: 'local' },
    modules: [
      {
        subpath: 'nimiq-css',
        icon: 'i-local:nimiq-css',
        defaultPageLink: '/nimiq-css/getting-started',
        text: 'Nimiq CSS',
        description: 'The CSS framework',
        sidebar: [
          {
            label: 'Getting Started',
            items: [
              { text: 'Introduction', link: '/nimiq-css/getting-started', icon: 'i-tabler:rocket' },
              { text: 'Installation', link: '/nimiq-css/installation', icon: 'i-tabler:download' },
              { text: 'Philosophy', link: '/nimiq-css/philosophy', icon: 'i-tabler:brain' },
              { text: 'Migrate from Nimiq Style', link: '/nimiq-css/migrate-from-nimiq-styles', icon: 'i-tabler:arrow-move-right-filled' },
            ],
          },
          {
            label: 'Core Features',
            items: [
              { text: 'Palette', link: '/nimiq-css/palette', icon: 'i-tabler:palette ' },
              { text: 'Utilities', link: '/nimiq-css/utilities', icon: 'i-tabler:building-factory-2 ' },
              {
                text: 'Typography',
                icon: 'i-nimiq:file-text ',
                items: [
                  { text: 'Getting started', link: '/nimiq-css/typography' },
                  { text: 'Example', link: '/nimiq-css/typography/demo-article' },
                ],
              },
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
        icon: 'i-local:frankenstein',
        defaultPageLink: '/frankenstein/getting-started',
        description: 'The Vue 3 components',
        sidebar: [
          {
            label: 'Getting Started',
            items: [
              { text: 'Introduction', link: '/frankenstein/getting-started', icon: 'i-tabler:rocket' },
            ],
          },
          {
            label: 'Vue Components',
            items: [
              {
                text: 'Dialog Components',
                icon: 'i-local:modal',
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
        icon: 'i-local:nimiq-vitepress',
        defaultPageLink: '/vitepress-theme/getting-started',
        description: 'Your Vitepress with Nimiq',
        sidebar: [
          {
            label: 'Getting Started',
            items: [
              { text: 'Introduction', link: '/vitepress-theme/getting-started', icon: 'i-tabler:rocket' },
              { text: 'Installation', link: '/vitepress-theme/getting-started/installation', icon: 'i-tabler:download' },
              { text: 'Configuration', link: '/vitepress-theme/getting-started/configuration', icon: 'i-tabler:settings' },
            ],
          },
          {
            label: 'Guide',
            items: [
              { text: 'Layout Types', link: '/vitepress-theme/guide/layouts', icon: 'i-tabler:layout-grid' },
              { text: 'Frontmatter', link: '/vitepress-theme/guide/frontmatter', icon: 'i-tabler:file-description' },
              { text: 'Hiding Modules', link: '/vitepress-theme/guide/hiding-modules', icon: 'i-tabler:eye-off' },
              { text: 'VitePress Integration', link: '/vitepress-theme/guide/vitepress-integration', icon: 'i-tabler:plug' },
            ],
          },
          {
            label: 'Features',
            items: [
              { text: 'Outline Actions', link: '/vitepress-theme/features/outline-actions', icon: 'i-tabler:click' },
              { text: 'Copy as Markdown', link: '/vitepress-theme/features/copy-as-markdown', icon: 'i-tabler:copy' },
            ],
          },
          {
            label: 'Components',
            items: [
              { text: 'Card', link: '/vitepress-theme/components/card' },
              { text: 'Grid', link: '/vitepress-theme/components/grid' },
              { text: 'Headline', link: '/vitepress-theme/components/headline' },
              { text: 'Large Card', link: '/vitepress-theme/components/large-card' },
              { text: 'Links', link: '/vitepress-theme/components/links' },
              { text: 'Code Block', link: '/vitepress-theme/components/code-block' },
              { text: 'Callout & Blockquotes', link: '/vitepress-theme/components/callouts-and-blockquotes' },
              { text: 'Vitepress Components', link: '/vitepress-theme/components/vitepress-components' },
            ],
          },
        ],
      },
      {
        subpath: 'nimiq-icons',
        text: 'Nimiq Icons',
        icon: 'i-local:nimiq-vitepress',
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
      { icon: 'i-nimiq:logos-github-mono', link: 'https://github.com/onmax/nimiq-ui', label: 'GitHub' },
      { icon: 'i-nimiq:code', link: 'https://nimiq.dev', label: 'Nimiq Developer Center' },
    ],
  },
  markdown: {
    preConfig(md) {
      md.use(PreviewPlugin)
    },
  },
})
