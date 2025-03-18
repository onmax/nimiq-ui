import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'

import { defineNimiqThemeConfig } from 'nimiq-vitepress-theme/client.js'

import ComponentPreview from './components/ComponentPreview.vue'

import '@shikijs/vitepress-twoslash/style.css'
import 'virtual:uno.css'

export default defineNimiqThemeConfig({
  enhanceApp({ app }) {
    app.use(TwoslashFloatingVue)

    app.component('ComponentPreview', ComponentPreview)
  },
})
