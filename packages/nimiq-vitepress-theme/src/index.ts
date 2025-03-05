import type { App } from 'vue'
import NqCard from './components/NqCard.vue'
import NqGrid from './components/NqGrid.vue'
import NqLargeCard from './components/NqLargeCard.vue'
import Layout from './layout/Layout.vue'

export { Layout, NqCard, NqGrid, NqLargeCard }
export * from './types'

export function registerNqComponents(app: App) {
  app.component('NqCard', NqCard)
  app.component('NqLargeCard', NqLargeCard)
  app.component('NqGrid', NqGrid)
}
