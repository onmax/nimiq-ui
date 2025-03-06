<script setup lang="ts">
import { computedAsync, useClipboard } from '@vueuse/core'
import { codeToHtml } from 'shiki';

const { code, lang, label } = defineProps<{ code: string, label?: string, lang?:string }>()

const { copied, copy } = useClipboard()

const content = computedAsync(async () => {
  if (!lang) return code
  return await codeToHtml(code, { lang: lang, theme: 'vitesse-light', })
})

</script>

<template>
  <div class="vp-code-group" var:nq-m-size:24px>
    <div class="tabs">
      <label :data-title="label || lang || 'Code'" for="tab-26">{{ label || lang || 'Code' }}</label>
    </div>
    <div class="blocks">
      <div class="active" :class="`language-${lang}`">
        <button title="Copy Code" class="copy" :class="{ copied }" @click="copy(code)">Copy</button>
        <span class="lang">{{ lang }}</span>
        <div v-html="content"></div>
      </div>
    </div>
  </div>
</template>
