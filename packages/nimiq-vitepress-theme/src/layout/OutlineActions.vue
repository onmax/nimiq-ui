<script setup lang="ts">
import type { OutlineAction } from '../types'
import { useData } from 'vitepress'
import { computed, ref } from 'vue'
import { useSourceCode } from '../composables/useSourceCode'

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

const isExpanded = ref(false)

const customActions = computed<OutlineAction[]>(() => {
  return (theme.value.outlineActions as OutlineAction[] | undefined) || []
})

const allActions = computed(() => {
  const actions: OutlineAction[] = []

  if (showCopyMarkdown.value) {
    actions.push({
      icon: 'i-tabler:copy',
      label: 'Copy page',
      onClick: copyMarkdownContent,
    })
  }

  return [...actions, ...customActions.value]
})

const dropdownOptions = computed(() => {
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

  if (copyOptionsConfig.value.chatgpt) {
    options.push({
      icon: 'i-tabler:brand-openai',
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
      icon: 'i-tabler:sparkles',
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

const hasDropdown = computed(() => dropdownOptions.value.length > 0)

function toggleExpanded() {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div v-if="allActions.length > 0" f-mt-md>
    <hr border-neutral-200 f-my-md>

    <div flex="~ col gap-4">
      <div
        v-for="(action, index) in allActions"
        :key="index"
        flex="~ items-center justify-between"
        p-4
        cursor-pointer
        hover:bg-neutral-100
        rounded-6
        transition-colors
        @click="action.onClick"
      >
        <div flex="~ items-center gap-8" f-text-xs text-neutral-800>
          <div :class="action.icon" />
          <span>{{ action.label }}</span>
        </div>

        <button
          v-if="index === 0 && hasDropdown"
          type="button"
          p-4
          hover:bg-neutral-200
          rounded-4
          transition-colors
          @click.stop="toggleExpanded"
        >
          <div :class="isExpanded ? 'i-tabler:chevron-up' : 'i-tabler:chevron-down'" />
        </button>
      </div>

      <Transition
        enter-active-class="transition-all duration-200"
        enter-from-class="opacity-0 -translate-y-8"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-8"
      >
        <div v-if="isExpanded && hasDropdown" flex="~ col gap-4" pl-16>
          <div
            v-for="(option, idx) in dropdownOptions"
            :key="idx"
            flex="~ items-center gap-8"
            p-4
            cursor-pointer
            hover:bg-neutral-100
            rounded-6
            transition-colors
            f-text-xs
            text-neutral-700
            @click="option.onClick"
          >
            <div :class="option.icon" />
            <span>{{ option.label }}</span>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
