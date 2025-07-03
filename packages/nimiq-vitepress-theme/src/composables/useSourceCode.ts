import { useClipboard } from '@vueuse/core'
import { join } from 'pathe'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { useChangelog } from './useChangelog'

export function useSourceCode() {
  const { page, frontmatter } = useData()
  const { repoURL } = useChangelog()
  const { copy, copied, isSupported } = useClipboard()

  const showSourceCode = computed(() => {
    if (!isSupported.value)
      return false

    if (frontmatter.value.sourceCode !== undefined)
      return !!frontmatter.value.sourceCode

    // Default behavior: true for non-home layouts
    const layout = frontmatter.value.layout || 'docs'
    return layout !== 'home'
  })

  const showCopyMarkdown = computed(() => {
    if (frontmatter.value.copyMarkdown !== undefined)
      return frontmatter.value.copyMarkdown

    // Default behavior: same as showSourceCode
    return showSourceCode.value
  })

  // Get the actual file path in the repository
  const getRepoFilePath = computed(() => {
    // Allow custom path prefix configuration via frontmatter
    const pathPrefix = frontmatter.value.sourceCodePathPrefix

    if (pathPrefix !== undefined) {
      // If explicitly set (including empty string), use it
      return pathPrefix ? join(pathPrefix, page.value.filePath) : page.value.filePath
    }

    // Auto-detect based on common patterns
    // If the repoURL suggests this is a monorepo with docs/ structure
    if (repoURL.value && (
      repoURL.value.includes('/nimiq-ui') // Known monorepo pattern
      || repoURL.value.includes('/ui') // Common monorepo pattern
      || page.value.filePath.includes('docs/') === false // VitePress running from docs/ but filePath doesn't include it
    )) {
      return join('docs', page.value.filePath)
    }

    // Default: use filePath as-is for standalone projects
    return page.value.filePath
  })

  const editUrl = computed(() => {
    if (!repoURL.value)
      return ''
    return join(repoURL.value, getRepoFilePath.value)
  })

  const sourceCodeUrl = computed(() => {
    // If sourceCode is a string, use it as custom URL
    if (typeof frontmatter.value.sourceCode === 'string')
      return frontmatter.value.sourceCode

    // Default to GitHub markdown content
    if (!repoURL.value)
      return ''

    return join(repoURL.value, 'blob/main', getRepoFilePath.value)
  })

  const sourceCodeLabel = computed(() => {
    return frontmatter.value.sourceCodeLabel || 'View Source'
  })

  const copyMarkdownContent = async () => {
    try {
      // Convert to raw GitHub URL for fetching
      let rawUrl = sourceCodeUrl.value

      if (rawUrl.includes('github.com') && rawUrl.includes('/blob/')) {
        rawUrl = rawUrl
          .replace('github.com', 'raw.githubusercontent.com')
          .replace('/blob/', '/')
      }

      const response = await fetch(rawUrl)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const content = await response.text()
      await copy(content)
    }
    catch (error) {
      console.error('Failed to copy markdown content:', error)
      console.error('Source URL was:', sourceCodeUrl.value)
    }
  }

  return {
    showSourceCode,
    showCopyMarkdown,
    editUrl,
    sourceCodeUrl,
    sourceCodeLabel,
    copyMarkdownContent,
    copied,
    isSupported,
  }
}
