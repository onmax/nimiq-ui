import type { NimiqVitepressThemeConfig, NimiqVitepressThemeNav } from '../types'
import { useData, useRoute, withBase } from 'vitepress'
import { computed } from 'vue'

export function useCurrentModule() {
  const { theme } = useData<NimiqVitepressThemeConfig>()

  const route = useRoute()

  const baseUrl = withBase('/').slice(0, -1)
  const currentPageNoBase = computed(() => route.path.slice(baseUrl.length))

  const currentDocModule = computed<NimiqVitepressThemeNav>(() => {
    return theme.value.modules.find(module => currentPageNoBase.value.startsWith(module.subpath)) || theme.value.modules[0]
  })

  return {
    currentDocModule,
    text: computed(() => currentDocModule.value.text),
    fullPath: computed(() => withBase(currentDocModule.value.subpath)),
  }
}
