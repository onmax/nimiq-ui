import { useClipboard } from '@vueuse/core'
import { join } from 'pathe'
import { useData } from 'vitepress'
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner'
import { useChangelog } from './useChangelog'
import { useNimiqConfig } from './useNimiqConfig'

export function useSourceCode() {
  const { page, frontmatter } = useData()
  const { repoURL } = useChangelog()
  const nimiqConfig = useNimiqConfig()

  // Use a safer approach for SSR compatibility
  const clipboardResult = typeof window !== 'undefined'
    ? useClipboard()
    : { copy: async () => {}, copied: ref(false), isSupported: ref(false) }
  const { copy, copied, isSupported } = clipboardResult

  const showSourceCode = computed(() => {
    if (!isSupported.value)
      return false

    const copyOptions = frontmatter.value.copyOptions

    if (copyOptions === 'hidden')
      return false
    if (copyOptions === 'source-only')
      return true

    return false // Hidden by default to reduce UI clutter
  })

  const showCopyMarkdown = computed(() => {
    const copyOptions = frontmatter.value.copyOptions

    if (copyOptions === 'hidden')
      return false
    if (copyOptions === 'source-only')
      return false

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

  // Get the effective repo URL, prioritizing plugin config over changelog
  const effectiveRepoURL = computed(() => {
    return nimiqConfig.repoURL || repoURL.value
  })

  const getRepoFilePath = computed(() => {
    const pathPrefix = frontmatter.value.sourceCodePathPrefix

    // If explicit path prefix is set in frontmatter, use it
    if (pathPrefix !== undefined) {
      return pathPrefix ? join(pathPrefix, page.value.filePath) : page.value.filePath
    }

    // Use contentPath from plugin config if available
    if (nimiqConfig.contentPath) {
      return join(nimiqConfig.contentPath, page.value.filePath)
    }

    // Fallback to legacy monorepo detection logic
    if (effectiveRepoURL.value && (
      effectiveRepoURL.value.includes('/nimiq-ui')
      || effectiveRepoURL.value.includes('/ui')
      || page.value.filePath.includes('docs/') === false
    )) {
      return join('docs', page.value.filePath)
    }

    return page.value.filePath
  })

  const editUrl = computed(() => {
    if (!effectiveRepoURL.value)
      return ''
    return `${effectiveRepoURL.value.replace(/\/$/, '')}/${getRepoFilePath.value}`
  })

  const sourceCodeUrl = computed(() => {
    if (!effectiveRepoURL.value)
      return ''

    return `${effectiveRepoURL.value.replace(/\/$/, '')}/blob/main/${getRepoFilePath.value}`
  })

  const sourceCodeLabel = computed(() => {
    return 'View Source'
  })

  const copyMarkdownContent = async () => {
    try {
      if (typeof window === 'undefined') {
        toast.error('Copy functionality not available during server-side rendering')
        return
      }

      const currentPath = window.location.pathname
      const markdownPath = currentPath.replace(/\.html$/, '.md').replace(/\/$/, '/index.md')
      const markdownUrl = `${window.location.origin}${markdownPath}`

      const response = await fetch(markdownUrl)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const content = await response.text()
      await copy(content)
      toast.success('Page content copied to clipboard')
    }
    catch (error) {
      console.error('Failed to copy markdown content:', error)
      toast.error('Failed to copy page content')
    }
  }

  const copyMarkdownLink = async () => {
    try {
      if (typeof window === 'undefined') {
        toast.error('Copy functionality not available during server-side rendering')
        return
      }

      const pageTitle = page.value.title || document.title || 'Documentation Page'
      const currentPath = window.location.pathname
      const markdownPath = currentPath.replace(/\.html$/, '.md').replace(/\/$/, '/index.md')
      const markdownUrl = `${window.location.origin}${markdownPath}`
      const markdownLink = `[${pageTitle}](${markdownUrl})`

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

    return encodeURIComponent(rawUrl)
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
