<script setup lang="ts">
import type { OutlineAction } from '../types'
import { Separator } from 'reka-ui'
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

function toggleExpanded() {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div v-if="allActions.length > 0" f-my-lg>
    <div flex="~ gap-8 items-center wrap">
      <div v-for="(action, index) in allActions" :key="index" flex="~ items-center" relative>
        <button
          type="button"
          flex="~ items-center gap-8"
          p="x-12 y-8"
          cursor-pointer
          hover:bg-neutral-100
          rounded-6
          transition-colors
          f-text-xs
          text-neutral-800
          border="1 neutral-300"
          @click="() => action.onClick()"
        >
          <div :class="action.icon" />
          <span>{{ action.label }}</span>
        </button>

        <div v-if="index === 0 && hasDropdown" relative ml-8>
          <button
            type="button"
            p="x-8 y-8"
            hover:bg-neutral-100
            rounded-6
            transition-colors
            border="1 neutral-300"
            @click.stop="toggleExpanded"
          >
            <div i-tabler:dots />
          </button>

          <Transition
            enter-active-class="transition-all duration-200"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-150"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div v-if="isExpanded" absolute left-0 top="[calc(100%+4px)]" min-w-200 bg-white rounded-8 shadow-lg border="1 neutral-200" z-50 py-6>
              <div v-for="(option, idx) in nativeOptions" :key="`native-${idx}`" flex="~ items-center gap-8" px-10 py-6 cursor-pointer hover:bg-neutral-100 transition-colors f-text-xs text-neutral-800 @click="() => { option.onClick(); isExpanded = false }">
                <div :class="option.icon" text-14 />
                <span>{{ option.label }}</span>
              </div>

              <Separator v-if="nativeOptions.length > 0 && externalOptions.length > 0" my-4 h-1 bg-neutral-200 />

              <div v-for="(option, idx) in externalOptions" :key="`external-${idx}`" flex="~ items-center gap-8" px-10 py-6 cursor-pointer hover:bg-neutral-100 transition-colors f-text-xs text-neutral-800 @click="() => { option.onClick(); isExpanded = false }">
                <div :class="option.icon" text-14 />
                <span>{{ option.label }}</span>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>
