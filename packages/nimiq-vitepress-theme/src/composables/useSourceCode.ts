import { useClipboard } from '@vueuse/core'
import { join } from 'pathe'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { toast } from 'vue-sonner'
import { useChangelog } from './useChangelog'

export function useSourceCode() {
  const { page, frontmatter } = useData()
  const { repoURL } = useChangelog()
  const { copy, copied, isSupported } = useClipboard()

  const showSourceCode = computed(() => {
    if (!isSupported.value)
      return false

    const copyOptions = frontmatter.value.copyOptions

    if (copyOptions === 'hidden') return false
    if (copyOptions === 'source-only') return true

    return false // Hidden by default to reduce UI clutter
  })

  const showCopyMarkdown = computed(() => {
    const copyOptions = frontmatter.value.copyOptions

    if (copyOptions === 'hidden') return false
    if (copyOptions === 'source-only') return false

    return true // Enable by default for better UX
  })

  const copyOptionsConfig = computed(() => {
    const fm = frontmatter.value

    return {
      markdownLink: fm.copyMarkdownLink !== false,
      viewMarkdown: fm.copyViewMarkdown !== false,
      chatgpt: fm.copyChatGPT !== false,
      claude: fm.copyClaude !== false,
    }
  })

  const hasDropdownOptions = computed(() => {
    const config = copyOptionsConfig.value
    return config.markdownLink || config.viewMarkdown || config.chatgpt || config.claude
  })

  const getRepoFilePath = computed(() => {
    const pathPrefix = frontmatter.value.sourceCodePathPrefix

    if (pathPrefix !== undefined) {
      return pathPrefix ? join(pathPrefix, page.value.filePath) : page.value.filePath
    }

    // Detect monorepo patterns to add docs/ prefix
    if (repoURL.value && (
      repoURL.value.includes('/nimiq-ui') ||
      repoURL.value.includes('/ui') ||
      page.value.filePath.includes('docs/') === false
    )) {
      return join('docs', page.value.filePath)
    }

    return page.value.filePath
  })

  const editUrl = computed(() => {
    if (!repoURL.value)
      return ''
    return join(repoURL.value, getRepoFilePath.value)
  })

  const sourceCodeUrl = computed(() => {
    if (!repoURL.value)
      return ''

    return join(repoURL.value, 'blob/main', getRepoFilePath.value)
  })

  const sourceCodeLabel = computed(() => {
    return 'View Source'
  })

  const copyMarkdownContent = async () => {
    try {
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
      toast.success('Page content copied to clipboard')
    }
    catch (error) {
      console.error('Failed to copy markdown content:', error)
      console.error('Source URL was:', sourceCodeUrl.value)
      toast.error('Failed to copy page content')
    }
  }

  const copyMarkdownLink = async () => {
    try {
      const pageTitle = page.value.title || document.title || 'Documentation Page'
      const currentURL = typeof window !== 'undefined' ? window.location.href : ''
      const markdownLink = `[${pageTitle}](${currentURL})`

      await copy(markdownLink)
      toast.success('Markdown link copied to clipboard')
    }
    catch (error) {
      console.error('Failed to copy markdown link:', error)
      toast.error('Failed to copy markdown link')
    }
  }

  const getRawMarkdownUrl = () => {
    let rawUrl = sourceCodeUrl.value

    if (rawUrl.includes('github.com') && rawUrl.includes('/blob/')) {
      rawUrl = rawUrl
        .replace('github.com', 'raw.githubusercontent.com')
        .replace('/blob/', '/')
    }

    return rawUrl
  }

  const chatGPTUrl = computed(() => {
    const rawUrl = getRawMarkdownUrl()
    const message = `Read ${rawUrl} so I can ask questions about it.`
    const encodedMessage = encodeURIComponent(message)
    return `https://chatgpt.com/?hints=search&q=${encodedMessage}`
  })

  const claudeUrl = computed(() => {
    const rawUrl = getRawMarkdownUrl()
    const message = `Read ${rawUrl} so I can ask questions about it.`
    const encodedMessage = encodeURIComponent(message)
    return `https://claude.ai/new?q=${encodedMessage}`
  })

  const viewAsMarkdown = () => {
    if (typeof window !== 'undefined') {
      window.open(sourceCodeUrl.value, '_blank', 'noopener,noreferrer')
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
    copyMarkdownLink,
    chatGPTUrl,
    claudeUrl,
    viewAsMarkdown,
    copyOptionsConfig,
    hasDropdownOptions,
  }
}
