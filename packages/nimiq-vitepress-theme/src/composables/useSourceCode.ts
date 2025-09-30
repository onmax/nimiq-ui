import { join } from 'pathe'
import { useData } from 'vitepress'
import { computed, onBeforeUnmount, ref } from 'vue'
import { toast } from 'vue-sonner'
import { useChangelog } from './useChangelog'
import { useNimiqConfig } from './useNimiqConfig'

export function useSourceCode() {
  const { page, frontmatter, site } = useData()
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

  const generatedMarkdownPath = computed(() => {
    const filePath = page.value.relativePath || page.value.filePath || 'index.md'

    if (filePath === 'index.md')
      return '/index.md'

    if (filePath.endsWith('/index.md')) {
      const trimmed = filePath.slice(0, -'/index.md'.length)
      return `/${trimmed}.md`
    }

    return `/${filePath}`
  })

  const markdownUrl = computed(() => {
    const base = site.value.base?.replace(/\/$/, '') ?? ''
    const path = generatedMarkdownPath.value
    return `${base}${path}`
  })

  const getAbsoluteMarkdownUrl = () => {
    if (typeof window === 'undefined')
      return ''

    const origin = window.location.origin
    return new URL(markdownUrl.value, origin).href
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

      // Dev server doesn't support copying markdown
      if (import.meta.env.DEV) {
        await copy('Dev server not supported')
        toast.error('Copy markdown not supported in dev mode')
        return
      }

      const response = await fetch(markdownUrl.value)

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
      const markdownLink = `[${pageTitle}](${getAbsoluteMarkdownUrl()})`

      await copy(markdownLink)
      toast.success('Markdown link copied to clipboard')
    }
    catch (error) {
      console.error('Failed to copy markdown link:', error)
      toast.error('Failed to copy markdown link')
    }
  }

  const getRawMarkdownUrl = () => {
    const absoluteUrl = getAbsoluteMarkdownUrl()

    if (!absoluteUrl)
      return ''

    return encodeURIComponent(absoluteUrl)
  }

  const chatGPTUrl = computed(() => {
    const rawUrl = getRawMarkdownUrl()
    if (!rawUrl)
      return ''

    const message = `Read ${rawUrl} so I can ask questions about it.`
    const encodedMessage = encodeURIComponent(message)
    return `https://chatgpt.com/?hints=search&q=${encodedMessage}`
  })

  const claudeUrl = computed(() => {
    const rawUrl = getRawMarkdownUrl()
    if (!rawUrl)
      return ''

    const message = `Read ${rawUrl} so I can ask questions about it.`
    const encodedMessage = encodeURIComponent(message)
    return `https://claude.ai/new?q=${encodedMessage}`
  })

  const viewAsMarkdown = () => {
    if (typeof window !== 'undefined') {
      window.open(getAbsoluteMarkdownUrl() || markdownUrl.value, '_blank', 'noopener,noreferrer')
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
