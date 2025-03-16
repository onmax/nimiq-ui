import type { NimiqVitepressThemeConfig, NimiqVitepressThemeNav } from '../types'
import { useData, useRoute, withBase } from 'vitepress'
import { computed } from 'vue'

export function useCurrentModule() {
  const { theme } = useData<NimiqVitepressThemeConfig>()

  const route = useRoute()

  const currentDocModule = computed<NimiqVitepressThemeNav>(() => {
    const module = theme.value.modules.find(module => route.path.startsWith(withBase(`/${module.subpath}`))) || theme.value.modules[0]
    return module
  })

  return {
    currentDocModule,
    text: computed(() => currentDocModule.value?.text),
    fullPath: computed(() => currentDocModule.value ? withBase(currentDocModule.value.subpath) : ''),
  }
}
