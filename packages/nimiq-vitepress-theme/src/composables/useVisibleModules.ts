import type { NimiqVitepressThemeConfig } from '../types'
import { createSharedComposable } from '@vueuse/core'
import { useData } from 'vitepress'
import { computed } from 'vue'

export const useVisibleModules = createSharedComposable(() => {
  const { theme } = useData<NimiqVitepressThemeConfig>()

  const visibleModules = computed(() => {
    return theme.value.modules.filter(module => !module.hidden)
  })

  return {
    visibleModules,
  }
})
