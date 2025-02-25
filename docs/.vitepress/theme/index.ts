import type { EnhanceAppContext, Theme } from 'vitepress'
import { Layout } from 'nimiq-vitepress-theme'

import ComponentPreview from './components/ComponentPreview.vue'

import 'nimiq-vitepress-theme/style.css'
import 'virtual:uno.css'

export default {
  Layout,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('ComponentPreview', ComponentPreview)
  },
} satisfies Theme
