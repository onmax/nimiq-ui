import type { Theme } from 'vitepress'
import type { DefineThemeNqVpOptions } from './types'
import NqCard from './components/NqCard.vue'
import NqGrid from './components/NqGrid.vue'
import NqHeadline from './components/NqHeadline.vue'
import NqLargeCard from './components/NqLargeCard.vue'
import NqModulesGrid from './components/NqModulesGrid.vue'
import Layout from './layout/Layout.vue'
import NotFound from './layout/NotFound.vue'

import './assets/index.css'
import './assets/static-content.css'
import 'virtual:group-icons.css'

export function defineNimiqThemeConfig(options: DefineThemeNqVpOptions): Theme {
  return {
    Layout,
    NotFound,
    async enhanceApp(ctx) {
      if (options?.enhanceApp)
        options.enhanceApp(ctx)
      ctx.app.component('NqCard', NqCard)
      ctx.app.component('NqGrid', NqGrid)
      ctx.app.component('NqHeadline', NqHeadline)
      ctx.app.component('NqLargeCard', NqLargeCard)
      ctx.app.component('NqModulesGrid', NqModulesGrid)
    },
  }
}
