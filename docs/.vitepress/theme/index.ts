import type { EnhanceAppContext, Theme } from 'vitepress'
import { Layout } from 'nimiq-vitepress-theme'

import ComponentPreview from './components/ComponentPreview.vue'

import NqCard from 'nimiq-vitepress-theme/components/NqCard.vue'
import NqLargeCard from 'nimiq-vitepress-theme/components/NqLargeCard.vue'
import NqGrid from 'nimiq-vitepress-theme/components/NqGrid.vue'

import 'virtual:uno.css'

export default {
  Layout,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('ComponentPreview', ComponentPreview)

    app.component('NqCard', NqCard)
    app.component('NqLargeCard', NqLargeCard)    
    app.component('NqGrid', NqGrid)
  },
} satisfies Theme
