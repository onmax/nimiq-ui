import type { NimiqVitepressThemeConfig } from '../types'
import { useData } from 'vitepress'
import { computed } from 'vue'

export function useWideLayout() {
  const { frontmatter } = useData<NimiqVitepressThemeConfig>()

  // Determine if wide layout should be used
  const isWide = computed(() => {
    // Handle edge cases where frontmatter might be undefined/null
    if (!frontmatter.value) {
      return false
    }

    // If wide is explicitly set in frontmatter, use that value
    if (frontmatter.value.wide !== undefined) {
      return frontmatter.value.wide
    }

    // If secondarySidebar is present (explicitly set to true or false), default to true
    if (frontmatter.value.secondarySidebar !== undefined) {
      return true
    }

    // Default to false
    return false
  })

  return {
    isWide,
  }
}
