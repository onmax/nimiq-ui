<script setup lang="ts">
import { ref, watch } from 'vue'
import { ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxLabel, ComboboxRoot, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger, VisuallyHidden } from 'reka-ui'
import { useMagicKeys, whenever, useDebounceFn } from '@vueuse/core'
import { inBrowser } from 'vitepress'

const open = ref(false)

const { meta_k } = useMagicKeys()
whenever(meta_k, (n) => {
  if (n)
    open.value = true
})

interface SearchResult {
  group: string
  items: Array<{
    title: string
    href: string
    text?: string
  }>
}

const searchResults = ref<SearchResult[]>([])
const searchInput = ref('')


// Mock data - replace this with your actual data
const searchIndex = [
  {
    group: 'Components',
    items: [
      { title: 'Button', href: '/components/button', text: 'Button component description' },
      { title: 'Input', href: '/components/input', text: 'Input component description' }
    ]
  },
  {
    group: 'Guide',
    items: [
      { title: 'Getting Started', href: '/guide/getting-started', text: 'Guide description' },
      { title: 'Installation', href: '/guide/installation', text: 'Installation guide' }
    ]
  }
]

// Debounced search function
const search = useDebounceFn((query: string) => {
  if (!query) {
    searchResults.value = []
    return
  }

  const results = searchIndex
    .map(group => ({
      group: group.group,
      items: group.items.filter(item => {
        const normalizedQuery = query.toLowerCase()
        return (
          item.title.toLowerCase().includes(normalizedQuery) ||
          item.text?.toLowerCase().includes(normalizedQuery)
        )
      })
    }))
    .filter(group => group.items.length > 0)

  searchResults.value = results
}, 200)

// Watch for input changes
watch(() => searchInput.value, (newValue) => {
  search(newValue)
})

function handleSelect(item: SearchResult['items'][0]) {
  open.value = false
  // Handle navigation here
  console.log('Selected:', item)
}

const isMac = inBrowser ? document.documentElement.classList.contains('mac') : false
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger nq-input-box group hocus:bg-neutral-300 transition-colors flex="~ items-center gap-8" p="l-12 r-4 y-4" rounded-12 f-text-xs v-bind="$attrs" style="--ring-color:rgba(var(--nq-neutral-400))">
      <div i-nimiq:magnifying-glass text-12 op="60 group-hocus:80" transition-opacity aria-hidden />
      <span inline-flex lh-none>Search</span>
      <span ml-auto f-text-3xs bg="group-hocus:neutral-400 neutral-300" ring="1 neutral-500" lh-none p="x-6 y-4" rounded-8 transition-colors>
        <kbd>{{ isMac ? '⌘' : 'Ctrl' }} K</kbd>
      </span>
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay fixed inset-0 z-100 bg="neutral/20" />
      <DialogContent fixed top="15%" left="50%" max-h-85vh w-608 max-w="[calc(100vw-32px)]" translate-x="-50%" f-text-sm rounded-12 of-hidden border z-100 bg-neutral-0 shadow f-p-xs>
        <VisuallyHidden>
          <DialogTitle>Command Menu</DialogTitle>
          <DialogDescription>Search for command</DialogDescription>
        </VisuallyHidden>

        <ComboboxRoot :open="true">
          <ComboboxInput v-model="searchInput" placeholder="Search..." rounded-4 bg-transparent px-12 py-8 w-full nq-input-box @keydown.enter.prevent />

          <ComboboxContent border="t neutral-300" p-8 max-h-20rem of-y-auto @escape-key-down="open = false">
            <ComboboxEmpty text="center neutral-900" f-p-sm v-if="searchInput && !searchResults.length">
              No results
            </ComboboxEmpty>

            <ComboboxGroup v-for="group in searchResults" :key="group.group">
              <ComboboxLabel px-16 nq-label font-semibold mt-12 mb-12>
                {{ group.group }}
              </ComboboxLabel>
              <ComboboxItem v-for="item in group.items" :key="item.href" :value="item" cursor-default px-4 py-2 rounded-md inline-flex="~ items-center gap-16" w-full @select="handleSelect(item)">
                <span>{{ item.title }}</span>
              </ComboboxItem>
            </ComboboxGroup>
          </ComboboxContent>
        </ComboboxRoot>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
