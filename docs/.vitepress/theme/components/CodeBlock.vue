<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const { code, displayContent } = defineProps<{ code: string, displayContent?: string }>()

const { copied, copy } = useClipboard()
</script>

<template>
  <button bg-transparent block w-full f-text-2xs @click="() => copy(code)">
    <code
      f-px-xs lh="[1.3]" whitespace-normal stack py-8 rounded-6 bg="neutral-100 hocus:neutral-200 data-active:green" text-left outline="solid 1 offset--1 black/10 dark:white/10 data-active:green-600" data-active:text-white
      :data-state="copied ? 'active' : 'inactive'" transition-colors lh-none cursor-pointer
    >
      <span pointer-events-none bg-green h-full op="0 data-active:100" transition-all text-white w-full font-semibold flex="~ items-center justify-center gap-4" scale="80 data-active:100">
        <div i-nimiq:check text-9 />
        Copied
      </span>
      <span block op="100 data-active:0" transition-colors>{{ displayContent || code }}</span>
    </code>
  </button>
</template>
