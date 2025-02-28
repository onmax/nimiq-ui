<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const { code } = defineProps<{ code: string }>()

const { copied, copy } = useClipboard()
</script>

<style scoped></style>

<template>
  <button bg-transparent @click="() => copy(code)" block w-full>
    <pre bg="neutral-300 hocus:neutral-400 data-active:green" text-left outline="solid 1 offset--1 black/10 dark:white/10 data-active:green-600" data-active:text-white :data-state="copied ? 'active' : ''" transition-colors py-4 rounded-6 lh-none f-text-2xs cursor-pointer><code f-px-xs lh="[1.3]"><span v-if="copied" text-white w-full font-semibold flex="~ items-center justify-center gap-4"><div i-nimiq:check text-9 />Copied</span>
        <span v-else text-wrap v-html="code"/></code></pre>
  </button>
</template>
