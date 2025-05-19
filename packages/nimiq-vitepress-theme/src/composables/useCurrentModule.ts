import type { NimiqVitepressThemeConfig, NimiqVitepressThemeNav } from '../types'
import { createSharedComposable } from '@vueuse/core'
import { useData, useRoute, withBase } from 'vitepress'
import { computed } from 'vue'

export const useCurrentModule = createSharedComposable(() => {
  const { theme } = useData<NimiqVitepressThemeConfig>()

  const route = useRoute()

  const currentDocModule = computed<NimiqVitepressThemeNav | undefined>(() => {
    const module = theme.value.modules.find(module => route.path.startsWith(withBase(`/${module.subpath}`)))
    return module
  })

  return {
    currentDocModule,
    text: computed(() => currentDocModule.value?.text),
    fullPath: computed(() => currentDocModule.value ? withBase(currentDocModule.value.subpath) : ''),
  }
})
