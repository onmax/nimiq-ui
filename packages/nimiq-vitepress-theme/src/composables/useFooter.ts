import type { NimiqVitepressThemeConfig } from '../types'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { useSourceCode } from './useSourceCode'

export function useFooter() {
  const { theme, frontmatter, page } = useData<NimiqVitepressThemeConfig>()
  const { editUrl } = useSourceCode()

  const pageFooterLeftText = computed(() => {
    // Frontmatter takes priority
    const fmValue = frontmatter.value.pageFooterLeftText
    if (fmValue === false)
      return null

    if (typeof fmValue === 'string')
      return fmValue

    // Check theme config
    const themeValue = theme.value.pageFooterLeftText
    if (themeValue === false)
      return null

    if (typeof themeValue === 'string')
      return themeValue

    if (typeof themeValue === 'function') {
      const result = themeValue({ path: page.value.filePath })
      return result || null
    }

    // Default fallback
    return 'Suggest changes on this page'
  })

  return {
    pageFooterLeftText,
    editUrl,
  }
}
