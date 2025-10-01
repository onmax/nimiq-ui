import { htmlToMarkdown } from 'mdream'
import { join } from 'pathe'
import { useData } from 'vitepress'
import { computed, onBeforeUnmount, ref } from 'vue'
import { toast } from 'vue-sonner'
import { useChangelog } from './useChangelog'
import { useNimiqConfig } from './useNimiqConfig'

export function useSourceCode() {
  const { page, frontmatter } = useData()
  const { repoURL } = useChangelog()
  const nimiqConfig = useNimiqConfig()

  if (typeof window === 'undefined') {
    const fallbackCopied = ref(false)
    const fallbackSupported = ref(false)
    const emptyString = computed(() => '')
    const copyOptions = computed(() => ({
      markdownLink: false,
      viewMarkdown: false,
      chatgpt: false,
      claude: false,
    }))

    return {
      showSourceCode: computed(() => false),
      showCopyMarkdown: computed(() => false),
      editUrl: emptyString,
      sourceCodeUrl: emptyString,
      sourceCodeLabel: computed(() => 'View Source'),
      copyMarkdownContent: async () => {},
      copied: fallbackCopied,
      isSupported: fallbackSupported,
      copyMarkdownLink: async () => {},
      chatGPTUrl: emptyString,
      claudeUrl: emptyString,
      viewAsMarkdown: () => {},
      copyOptionsConfig: copyOptions,
      hasDropdownOptions: computed(() => false),
    }
  }

  const copied = ref(false)
  const isSupported = ref(false)
  let resetTimer: ReturnType<typeof setTimeout> | undefined

  const determineSupport = () => {
    if (typeof window === 'undefined') {
      isSupported.value = false
      return
    }

    const nav = window.navigator
    const hasClipboardAPI = !!nav?.clipboard?.writeText
    const hasLegacySupport = typeof document !== 'undefined' && typeof document.queryCommandSupported === 'function'
      && document.queryCommandSupported('copy')

    isSupported.value = hasClipboardAPI || hasLegacySupport
  }

  const resetCopiedFlag = () => {
    if (resetTimer)
      clearTimeout(resetTimer)
    resetTimer = setTimeout(() => {
      copied.value = false
      resetTimer = undefined
    }, 1500)
  }

  const copy = async (text: string) => {
    if (typeof window === 'undefined')
      throw new Error('Clipboard not available during SSR')

    const nav = window.navigator

    if (nav?.clipboard?.writeText) {
      await nav.clipboard.writeText(text)
    }
    else if (typeof document !== 'undefined' && document.body) {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.setAttribute('readonly', 'true')
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      const successful = document.execCommand?.('copy') ?? false
      document.body.removeChild(textarea)
      if (!successful)
        throw new Error('Clipboard copy failed')
    }
    else {
      throw new Error('Clipboard API not supported')
    }

    copied.value = true
    resetCopiedFlag()
  }

  if (typeof window !== 'undefined')
    determineSupport()

  onBeforeUnmount(() => {
    if (resetTimer)
      clearTimeout(resetTimer)
  })

  const getAbsolutePageUrl = () => {
    if (typeof window === 'undefined')
      return ''

    return window.location.href
  }

  const getMarkdownUrl = () => {
    if (typeof window === 'undefined')
      return ''

    const url = new URL(window.location.href)
    const pathname = url.pathname

    // If it's a clean URL (no .html), append .md
    // Handle index pages: /path/ -> /path/index.md
    if (pathname.endsWith('/')) {
      url.pathname = `${pathname}index.md`
    }
    else {
      url.pathname = `${pathname}.md`
    }

    return url.href
  }

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

      // Get the main content container
      const contentEl = document.querySelector('.vp-doc') || document.querySelector('main')
      if (!contentEl) {
        throw new Error('Could not find page content')
      }

      // Convert HTML to markdown using mdream
      const markdown = await htmlToMarkdown(contentEl.innerHTML)

      await copy(markdown)
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
      const markdownLink = `[${pageTitle}](${getAbsolutePageUrl()})`

      await copy(markdownLink)
      toast.success('Markdown link copied to clipboard')
    }
    catch (error) {
      console.error('Failed to copy markdown link:', error)
      toast.error('Failed to copy markdown link')
    }
  }

  const chatGPTUrl = computed(() => {
    const absoluteUrl = getAbsolutePageUrl()
    if (!absoluteUrl)
      return ''

    const message = `Read ${absoluteUrl} so I can ask questions about it.`
    const encodedMessage = encodeURIComponent(message)
    return `https://chatgpt.com/?hints=search&q=${encodedMessage}`
  })

  const claudeUrl = computed(() => {
    const absoluteUrl = getAbsolutePageUrl()
    if (!absoluteUrl)
      return ''

    const message = `Read ${absoluteUrl} so I can ask questions about it.`
    const encodedMessage = encodeURIComponent(message)
    return `https://claude.ai/new?q=${encodedMessage}`
  })

  const viewAsMarkdown = () => {
    if (typeof window === 'undefined')
      return

    const markdownUrl = getMarkdownUrl()
    if (markdownUrl) {
      window.open(markdownUrl, '_blank', 'noopener,noreferrer')
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
