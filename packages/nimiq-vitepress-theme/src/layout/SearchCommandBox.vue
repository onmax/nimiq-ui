<script setup lang="ts">
// Adapted from Reka UI and Vitepress default theme

import type { SearchResult } from 'minisearch'
import type { GenericComponentInstance } from 'reka-ui'
import type { Ref } from 'vue'
import { computedAsync, debouncedWatch } from '@vueuse/core'
import Mark from 'mark.js/src/vanilla.js'
import MiniSearch from 'minisearch'
import { DialogClose, ListboxContent, ListboxFilter, ListboxItem, ListboxRoot } from 'reka-ui'
import { useData } from 'vitepress'
import { markRaw, nextTick, onMounted, ref, shallowRef, watch } from 'vue'
import { LRUCache } from '../lib/lru'

const emit = defineEmits<{ close: [] }>()

const { localeIndex } = useData()

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

onMounted(() => {
  import('@localSearchIndex').then(m => searchIndexData.value = m.default)
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
</script>

<template>
  <ListboxRoot ref="listboxRef">
    <div w-full f-px-sm flex="~ items-center">
      <ListboxFilter v-model="filterText" nq-input-box w-full bg-transparent flex-1 placeholder="Search documentation" auto-focus />
      <DialogClose>
        <div i-nimiq:close text-18 />
      </DialogClose>
    </div>

    <ListboxContent
      :ref="(node) => {
        if (node && '$el' in node) {
          resultsEl = node.$el
        }
      }"
      as="ul" max-h-55vh of-auto border="t md:y neutral-400 md:empty:t-0" empty="hidden md:block"
    >
      <ListboxItem
        v-for="p in results" :key="p.id" :value="p.id"
        class="data-[highlighted]:bg-blue-400 data-[highlighted]:text-blue data-[highlighted]:font-semibold" as-child @select="emit('close')"
      >
        <a :href="p.id" inline-flex f-p-sm f-p-xs w-full>
          <div flex="~ items-center wrap">
            <span v-for="(t, index) in p.titles" :key="index" flex="~ items-center">
              <span v-html="t" />
              <div i-nimiq:chevron-right />
            </span>
            <span>
              <span class="text" v-html="p.title" />
            </span>
          </div>
        </a>
      </ListboxItem>

      <li
        v-if="filterText && !results.length && enableNoResults"
        flex="~ items-center justify-center" text-blue f-p-sm f-text-sm
      >
        No results for "<strong>{{ filterText }}</strong>"
      </li>

      <li v-else-if="!filterText && !results.length" f-text-xs text="neutral-800 center" f-py-md>
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
