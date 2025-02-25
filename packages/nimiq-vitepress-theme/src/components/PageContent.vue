<script setup lang="ts">
// Date logic copied from https://github.com/vuejs/vitepress/blob/58bd3e23dd2175a2e9744bdc0d649126bdd0ea2f/src/client/theme-default/components/VPDocFooterLastUpdated.vue#L18

import { useData, useRoute } from 'vitepress'
import type { NimiqVitepressThemeConfig } from '../types';
import { data } from '../git.data'
import { ref, computed, watchEffect, onMounted } from 'vue'
import { useTimeAgo } from '@vueuse/core';

const { theme, lang } = useData<NimiqVitepressThemeConfig>()

const route = useRoute()

const currentPageData = computed(() => data.filter(d => d.url === route.path)[0])
const lastUpdated = computed(() => currentPageData.value?.lastUpdated)
const commitHash = computed(() => currentPageData.value?.hash || '')
const shortHash = computed(() => commitHash.value.slice(0, 7))
const editUrl = computed(() => currentPageData.value?.editUrl || '')
const commitUrl = computed(() => currentPageData.value?.commitUrl || '')

const date = computed(() => new Date(lastUpdated.value as number))
const isoDatetime = computed(() => date.value.toISOString())
const datetime = ref('')

const ago = useTimeAgo(date)

// set time on mounted hook to avoid hydration mismatch due to
// potential differences in timezones of the server and clients
onMounted(() => {
  watchEffect(() => {
    datetime.value = new Intl.DateTimeFormat(lang.value, { dateStyle: 'short', timeStyle: 'short' }).format(date.value)
  })
})

const showEditContent = computed(() => theme.value.showEditContent !== false)
const showLastUpdated = computed(() => theme.value.showLastUpdated !== false)
</script>

<template>
  <div f-px-xl f-pt-xl f-pb-md flex="~ col" h-full>
    <article class="nq-prose" style="--nq-prose-max-width: none">
      <Content max-w-none />
    </article>
    <div mt-auto px-32 flex="~ items-center justify-between" f-text-md un-f-text-xs v-if="showEditContent || showLastUpdated">
      <a :href="editUrl" v-if="editUrl && showEditContent" target="_blank" rel="noopener" op70 nq-arrow lh-0>
        Edit this page on GitHub
      </a>
      <div v-else></div> <!-- Empty placeholder to maintain flex spacing when edit link is hidden -->
      
      <p v-if="showLastUpdated" text-neutral-700>
        Updated
        {{ ago }}
        on
        <time :datetime="isoDatetime" font-semibold>{{ datetime }}</time>
        <span v-if="shortHash && commitUrl" ml-1 font-mono text-neutral-800>
          (<a :href="commitUrl" target="_blank" rel="noopener" un-text="neutral-800 hocus:neutral-900" transition-colors underline="~ dotted offset-3">
            {{ shortHash }}
          </a>)
        </span>
        <span v-else-if="shortHash" ml-1 font-mono text-neutral-800>({{ shortHash }})</span>
      </p>
    </div>
  </div>
</template>
