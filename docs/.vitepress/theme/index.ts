import type { EnhanceAppContext, Theme } from 'vitepress'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'

import { Layout } from 'nimiq-vitepress-theme'

import NqCard from 'nimiq-vitepress-theme/components/NqCard.vue'

import NqGrid from 'nimiq-vitepress-theme/components/NqGrid.vue'

import NqLargeCard from 'nimiq-vitepress-theme/components/NqLargeCard.vue'
import ComponentPreview from './components/ComponentPreview.vue'
import '@shikijs/vitepress-twoslash/style.css'

import 'virtual:uno.css'

export default {
  Layout,
  enhanceApp({ app }: EnhanceAppContext) {
    app.use(TwoslashFloatingVue)

    app.component('ComponentPreview', ComponentPreview)

    app.component('NqCard', NqCard)
    app.component('NqLargeCard', NqLargeCard)
    app.component('NqGrid', NqGrid)
  },
} satisfies Theme
