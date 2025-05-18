import type { Theme } from 'vitepress'
import type { DefineThemeNqVpOptions } from './types'
import NqCard from './components/NqCard.vue'
import NqGrid from './components/NqGrid.vue'
import NqLargeCard from './components/NqLargeCard.vue'
import NqModulesGrid from './components/NqModulesGrid.vue'
import Layout from './layout/Layout.vue'

import './assets/index.css'
import 'virtual:group-icons.css'

export function defineNimiqThemeConfig(options: DefineThemeNqVpOptions): Theme {
  return {
    Layout,
    async enhanceApp(ctx) {
      if (options?.enhanceApp)
        options.enhanceApp(ctx)
      ctx.app.component('NqCard', NqCard)
      ctx.app.component('NqGrid', NqGrid)
      ctx.app.component('NqLargeCard', NqLargeCard)
      ctx.app.component('NqModulesGrid', NqModulesGrid)
    },
  }
}
