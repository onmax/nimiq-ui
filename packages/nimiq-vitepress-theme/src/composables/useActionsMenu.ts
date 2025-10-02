import type { OutlineAction } from '../types'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { useSourceCode } from './useSourceCode'

// @unocss-include

export function useActionsMenu() {
  const { theme } = useData()
  const {
    copyMarkdownContent,
    copyMarkdownLink,
    chatGPTUrl,
    claudeUrl,
    viewAsMarkdown,
    copyOptionsConfig,
    showCopyMarkdown,
  } = useSourceCode()

  const customActions = computed<OutlineAction[]>(() => {
    return (theme.value.outlineActions as OutlineAction[] | undefined) || []
  })

  const allActions = computed(() => {
    const actions: OutlineAction[] = []

    if (showCopyMarkdown.value) {
      actions.push({
        icon: 'i-nimiq:copy',
        label: 'Copy page',
        onClick: copyMarkdownContent,
      })
    }

    return [...actions, ...customActions.value]
  })

  const nativeOptions = computed(() => {
    const options: OutlineAction[] = []

    if (copyOptionsConfig.value.markdownLink) {
      options.push({
        icon: 'i-tabler:link',
        label: 'Copy markdown link',
        onClick: copyMarkdownLink,
      })
    }

    if (copyOptionsConfig.value.viewMarkdown) {
      options.push({
        icon: 'i-tabler:eye',
        label: 'View as markdown',
        onClick: viewAsMarkdown,
      })
    }

    return options
  })

  const externalOptions = computed(() => {
    const options: OutlineAction[] = []

    if (copyOptionsConfig.value.chatgpt) {
      options.push({
        icon: 'i-local:openai',
        label: 'Open in ChatGPT',
        onClick: () => {
          if (typeof window !== 'undefined') {
            window.open(chatGPTUrl.value, '_blank', 'noopener,noreferrer')
          }
        },
      })
    }

    if (copyOptionsConfig.value.claude) {
      options.push({
        icon: 'i-local:claude',
        label: 'Open in Claude',
        onClick: () => {
          if (typeof window !== 'undefined') {
            window.open(claudeUrl.value, '_blank', 'noopener,noreferrer')
          }
        },
      })
    }

    return options
  })

  const hasDropdown = computed(() => nativeOptions.value.length > 0 || externalOptions.value.length > 0)

  return {
    customActions,
    allActions,
    nativeOptions,
    externalOptions,
    hasDropdown,
  }
}
