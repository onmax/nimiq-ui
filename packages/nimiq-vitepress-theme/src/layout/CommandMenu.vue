<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from 'reka-ui'
import { useMagicKeys, whenever } from '@vueuse/core'
import { inBrowser } from 'vitepress'

const open = ref(false)

const { meta_k } = useMagicKeys()
whenever(meta_k, (n) => {
  if (n)
    open.value = true
})

const isMac = inBrowser ? document.documentElement.classList.contains('mac') : false

const SearchCommandBox = defineAsyncComponent(() => import('./SearchCommandBox.vue'))

function handleClose() {
  requestAnimationFrame(() => {
    open.value = false
  })
}
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger nq-input-box group hocus:bg-neutral-300 transition-colors flex="~ items-center gap-8"
      p="l-12 r-4 y-4" rounded-12 f-text-xs v-bind="$attrs" style="--ring-color:rgba(var(--nq-neutral-400))" ref="el">
      <div i-nimiq:magnifying-glass text-12 op="60 group-hocus:80" transition-opacity aria-hidden />
      <span inline-flex lh-none>Search</span>
      <span ml-auto f-text-3xs bg="group-hocus:neutral-400 neutral-300" ring="1 neutral-500" lh-none p="x-6 y-4"
        rounded-8 transition-colors>
        <kbd>{{ isMac ? '⌘' : 'Ctrl' }} K</kbd>
      </span>
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay bg="darkblue/70" fixed inset-0 z-30 />
      <DialogContent fixed top="10%" left="50%" max-h-85vh w-90vw max-w-420px translate-x="-50%" rounded-6 bg-neutral-100
        shadow of-hidden z-100 outline="1.5 neutral">
        <DialogTitle class="sr-only">
          Search documentation
        </DialogTitle>
        <DialogDescription class="sr-only">
          Show related results based on search term
        </DialogDescription>

        <SearchCommandBox @close="handleClose" />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
