import { useData } from 'vitepress'
import { computed } from 'vue'
import { useNimiqConfig } from './useNimiqConfig'
import { useSourceCode } from './useSourceCode'

export function useFooter() {
  const { page, frontmatter } = useData()
  const nimiqConfig = useNimiqConfig()
  const { editUrl } = useSourceCode()

  const suggestChangesText = computed(() => {
    // Frontmatter takes priority
    const fmValue = frontmatter.value.suggestChanges
    if (fmValue === false)
      return null

    if (typeof fmValue === 'string')
      return fmValue

    // Check global config
    const configValue = nimiqConfig.suggestChanges
    if (configValue === false)
      return null

    if (typeof configValue === 'string')
      return configValue

    if (typeof configValue === 'function') {
      const result = configValue({ path: page.value.filePath })
      return result || null
    }

    // Default fallback
    return 'Suggest changes on this page'
  })

  return {
    suggestChangesText,
    editUrl,
  }
}
