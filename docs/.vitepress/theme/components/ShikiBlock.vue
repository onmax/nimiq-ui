<script setup lang="ts">
import { computedAsync, useClipboard } from '@vueuse/core'
import { codeToHtml } from 'shiki'
import { useData } from 'vitepress'

const { code, lang, label } = defineProps<{ code: string, label?: string, lang?: string }>()

const { copied, copy } = useClipboard()
const { isDark } = useData()

const content = computedAsync(async () => {
  if (!lang)
    return code
  const theme = isDark.value ? 'vitesse-dark' : 'vitesse-light'
  return await codeToHtml(code, { lang, theme })
})
</script>

<template>
  <div class="vp-code-group" var:nq-m-size:24px>
    <div class="tabs">
      <label :data-title="label || lang || 'Code'" for="tab-26">{{ label || lang || 'Code' }}</label>
    </div>
    <div class="blocks">
      <div class="active" :class="`language-${lang}`">
        <button title="Copy Code" class="copy" :class="{ copied }" @click="copy(code)">
          Copy
        </button>
        <span class="lang">{{ lang }}</span>
        <div v-html="content" />
      </div>
    </div>
  </div>
</template>
