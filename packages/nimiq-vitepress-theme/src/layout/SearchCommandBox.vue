<script setup lang="ts">
// Adapted from Reka UI and Vitepress default theme

import type { SearchResult } from 'minisearch'
import type { GenericComponentInstance } from 'reka-ui'
import type { Ref } from 'vue'
import type { NimiqVitepressThemeConfig } from '../types'
import { computedAsync, debouncedWatch } from '@vueuse/core'
import Mark from 'mark.js/src/vanilla.js'
import MiniSearch from 'minisearch'
import { DialogClose, ListboxContent, ListboxFilter, ListboxItem, ListboxRoot } from 'reka-ui'
import { useData, withBase } from 'vitepress'
import { computed, markRaw, nextTick, onMounted, ref, shallowRef, watch } from 'vue'
import { useSourceCode } from '../composables/useSourceCode'
import { LRUCache } from '../lib/lru'

const emit = defineEmits<{ close: [] }>()

const { localeIndex, theme, isDark } = useData<NimiqVitepressThemeConfig>()

const {
  copyMarkdownContent,
  copyMarkdownLink,
  chatGPTUrl,
  claudeUrl,
  sourceCodeUrl,
  copyOptionsConfig,
  showCopyMarkdown,
} = useSourceCode()

const filterText = ref('')
const enableNoResults = ref(false)
const resultsEl = shallowRef<HTMLElement>()
const searchIndexData = shallowRef()
const results: Ref<(SearchResult & Result)[]> = shallowRef([])
const listboxRef = ref<GenericComponentInstance<typeof ListboxRoot>>()

interface Result {
  title: string
  titles: string[]
  text?: string
}

onMounted(async () => {
  // @ts-expect-error internal function
  import('@localSearchIndex').then((m) => {
    searchIndexData.value = m.default
  })
})

const mark = computedAsync(async () => {
  if (!resultsEl.value)
    return
  return markRaw(new Mark(resultsEl.value))
}, null)

const searchIndex = computedAsync(async () =>
  markRaw(
    MiniSearch.loadJSON<Result>(
      (await searchIndexData.value[localeIndex.value]?.())?.default,
      {
        fields: ['title', 'titles', 'text'],
        storeFields: ['title', 'titles'],
        searchOptions: {
          fuzzy: 0.2,
          prefix: true,
          boost: { title: 4, text: 2, titles: 1 },
        },
      },
    ),
  ),
)

const cache = new LRUCache(16) // 16 files

// Computed lists for better maintainability
const moduleItems = computed(() =>
  theme.value.modules?.filter(m => !m.hidden) || [],
)

const socialItems = computed(() =>
  theme.value.links || [],
)

const copyItems = computed(() => {
  if (!showCopyMarkdown.value)
    return []

  const items = []

  // Copy page content (always available if showCopyMarkdown is true)
  items.push({
    value: 'copy-page',
    icon: 'i-nimiq:copy',
    label: 'Copy page content',
    action: handleCopyPage,
  })

  // Copy markdown link
  if (copyOptionsConfig.value.markdownLink) {
    items.push({
      value: 'copy-markdown-link',
      icon: 'i-nimiq:link',
      label: 'Copy markdown link',
      action: handleCopyMarkdownLink,
    })
  }

  // View as markdown
  if (copyOptionsConfig.value.viewMarkdown) {
    items.push({
      value: 'view-markdown',
      icon: 'i-nimiq:logos-github-mono',
      label: 'View as markdown',
      action: handleViewAsMarkdown,
    })
  }

  // AI tools
  if (copyOptionsConfig.value.claude) {
    items.push({
      value: 'open-claude',
      icon: 'i-local:claude',
      label: 'Open in Claude',
      action: handleOpenInClaude,
    })
  }

  if (copyOptionsConfig.value.chatgpt) {
    items.push({
      value: 'open-chatgpt',
      icon: 'i-local:openai',
      label: 'Open in ChatGPT',
      action: handleOpenInChatGPT,
    })
  }

  return items
})

const utilityItems = computed(() => [
  {
    value: 'theme-switcher',
    icon: 'i-nimiq:moon',
    label: `Switch to ${isDark.value ? 'light' : 'dark'} theme`,
    action: toggleTheme,
  },
])

debouncedWatch(
  () => [searchIndex.value, filterText.value] as const,
  async ([index, filterTextValue], old, onCleanup) => {
    if (old?.[0] !== index) {
      // in case of hmr
      cache.clear()
    }

    let canceled = false
    onCleanup(() => {
      canceled = true
    })

    if (!index)
      return

    // Search
    results.value = index
      .search(filterTextValue)
      .slice(0, 16) as (SearchResult & Result)[]

    if (canceled)
      return

    const terms = new Set<string>()

    results.value = results.value.map((r) => {
      const [id, anchor] = r.id.split('#')
      const map = cache.get(id) as Map<string, string> | undefined
      const text = map?.get(anchor) ?? ''
      for (const term in r.match) {
        terms.add(term)
      }
      return { ...r, text }
    })

    await nextTick()
    if (canceled)
      return

    await new Promise((r) => {
      mark.value?.unmark({
        done: () => {
          mark.value?.markRegExp(formMarkRegex(terms), { done: r })
        },
      })
    })

    enableNoResults.value = true
    listboxRef.value?.highlightFirstItem()
  },
  { debounce: 200, immediate: true },
)

watch(filterText, () => {
  enableNoResults.value = false
})

function formMarkRegex(terms: Set<string>) {
  return new RegExp(
    [...terms]
      .sort((a, b) => b.length - a.length)
      .map(term => `(${term.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')})`)
      .join('|'),
    'gi',
  )
}

function toggleTheme() {
  isDark.value = !isDark.value
  emit('close')
}

function handleSocialLink(link: string) {
  window.open(withBase(link), '_blank', 'noopener,noreferrer')
  emit('close')
}

function handleModuleLink(link: string) {
  window.location.href = withBase(link)
  emit('close')
}

async function handleCopyPage() {
  await copyMarkdownContent()
  emit('close')
}

async function handleCopyMarkdownLink() {
  await copyMarkdownLink()
  emit('close')
}

function handleViewAsMarkdown() {
  window.open(sourceCodeUrl.value, '_blank', 'noopener,noreferrer')
  emit('close')
}

function handleOpenInChatGPT() {
  window.open(chatGPTUrl.value, '_blank', 'noopener,noreferrer')
  emit('close')
}

function handleOpenInClaude() {
  window.open(claudeUrl.value, '_blank', 'noopener,noreferrer')
  emit('close')
}
</script>

<template>
  <ListboxRoot ref="listboxRef">
    <div w-full flex="~ items-center" relative f-p-2xs>
      <ListboxFilter v-model="filterText" rounded-3 nq-input-box of-hidden w-full bg-transparent flex-1 placeholder="Search documentation" auto-focus border="none" outline="1.5 ~ neutral-500 hocus:blue" transition-outline-color />
      <DialogClose absolute right-4 stack size-48="!" cursor-pointer>
        <div i-nimiq:cross text="10 group-focus-within:blue neutral-700" right-16 mx-auto />
      </DialogClose>
    </div>

    <ListboxContent
      :ref="(node) => { if (node && '$el' in node){ resultsEl = node.$el } }"
      as="ul" md:max-h-55vh of-auto empty="hidden md:block"
    >
      <!-- Manual Options (only show when no filter text) -->
      <template v-if="!filterText">
        <!-- 1. Modules (Most Important - Navigation) -->
        <ListboxItem
          v-for="module in moduleItems" :key="module.subpath"
          :value="`module-${module.subpath}`"
          class="data-[highlighted]:bg-blue-400 data-[highlighted]:text-blue data-[highlighted]:font-semibold"
          as-child @select="handleModuleLink(module.defaultPageLink)"
        >
          <div inline-flex f-p-sm f-p-xs w-full group cursor-pointer>
            <div flex="~ items-center gap-12">
              <div :class="module.icon || 'i-nimiq:document-filled'" size-24 text="neutral-700 group-hocus:blue" />
              <div flex="~ col">
                <span>{{ module.text }}</span>
                <span v-if="module.description" text="f-xs neutral-800">{{ module.description }}</span>
              </div>
            </div>
          </div>
        </ListboxItem>

        <!-- 2. Utility Actions (Theme, etc.) -->
        <ListboxItem
          v-for="item in utilityItems" :key="item.value"
          :value="item.value"
          class="data-[highlighted]:bg-blue-400 data-[highlighted]:text-blue data-[highlighted]:font-semibold"
          as-child @select="item.action"
        >
          <div inline-flex f-p-sm f-p-xs w-full group cursor-pointer>
            <div flex="~ items-center gap-12">
              <div :class="item.icon" size-16 text="neutral-700 group-hocus:blue" />
              <span>{{ item.label }}</span>
            </div>
          </div>
        </ListboxItem>

        <!-- 3. Copy & Page Actions -->
        <ListboxItem
          v-for="item in copyItems" :key="item.value"
          :value="item.value"
          class="data-[highlighted]:bg-blue-400 data-[highlighted]:text-blue data-[highlighted]:font-semibold"
          as-child @select="item.action"
        >
          <div inline-flex f-p-sm f-p-xs w-full group cursor-pointer>
            <div flex="~ items-center gap-12">
              <div :class="item.icon" size-16 text="neutral-700 group-hocus:blue" />
              <span>{{ item.label }}</span>
            </div>
          </div>
        </ListboxItem>

        <!-- 4. Social Media Links -->
        <ListboxItem
          v-for="social in socialItems" :key="social.link"
          :value="`social-${social.link}`"
          class="data-[highlighted]:bg-blue-400 data-[highlighted]:text-blue data-[highlighted]:font-semibold"
          as-child @select="handleSocialLink(social.link)"
        >
          <div inline-flex f-p-sm f-p-xs w-full group cursor-pointer>
            <div flex="~ items-center gap-12">
              <div :class="social.icon" size-16 text="neutral-700 group-hocus:blue" />
              <span>{{ social.label }}</span>
            </div>
          </div>
        </ListboxItem>

        <!-- Separator -->
        <li v-if="results.length" h-1 bg-neutral-200 my-8 />
      </template>

      <!-- Search Results -->
      <ListboxItem
        v-for="p in results" :key="p.id" :value="p.id"
        class="data-[highlighted]:bg-blue-400 data-[highlighted]:text-blue data-[highlighted]:font-semibold" as-child @select="emit('close')"
      >
        <a :href="p.id" inline-flex f-p-sm f-p-xs w-full group>
          <div flex="~ items-center gap-12">
            <div i-nimiq:document-filled size-16 text="neutral-700 group-hocus:blue" />
            <div flex="~ items-center wrap">
              <span v-for="(t, index) in p.titles" :key="index" flex="~ items-center" font-normal>
                <span v-html="t" />
                <div i-nimiq:chevron-right mx-8 text="8 neutral-700 group-hocus:blue" />
              </span>
              <span font-normal>
                <span v-html="p.title" />
              </span>
            </div>
          </div>
        </a>
      </ListboxItem>

      <li v-if="filterText && !results.length && enableNoResults" flex="~ items-center justify-center" f-p-sm f-text-sm>
        No results for "<strong>{{ filterText }}</strong>"
      </li>

      <li v-else-if="!filterText && !results.length && !moduleItems.length && !utilityItems.length && !copyItems.length && !socialItems.length" italic text="f-xs neutral-700 center" f-py-md>
        Start typing to search
      </li>
    </ListboxContent>

    <div f-py-2xs f-px-xs f-text-xs text-neutral-800 bg-neutral-200 bg-opacity-40 nq-prose-compact children:mx-0 hidden flex="md:~ items-center gap-4 justify-between" h-max>
      <span flex="~ items-center gap-4">
        <kbd aria-label="Up arrow">
          <div i-tabler:arrow-up />
        </kbd>
        <kbd aria-label="Down arrow">
          <div i-tabler:arrow-down />
        </kbd>
        to navigate
      </span>
      <span flex="~ items-center gap-4">
        <kbd aria-label="Enter">
          enter
        </kbd>
        to select
      </span>
      <span flex="~ items-center gap-4">
        <kbd aria-label="Escape">esc</kbd>
        to close
      </span>
    </div>
  </ListboxRoot>
</template>

<style scoped>
:global([data-markjs]) {
  --uno: 'bg-blue rounded-2 px-2 text-white pb-1';
}
</style>
