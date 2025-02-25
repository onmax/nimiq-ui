<script setup lang="ts">
// Date logic copied from https://github.com/vuejs/vitepress/blob/58bd3e23dd2175a2e9744bdc0d649126bdd0ea2f/src/client/theme-default/components/VPDocFooterLastUpdated.vue#L18

import { useData } from 'vitepress'
import type { NimiqVitepressThemeConfig } from '../types';
import { data } from '../git.data'
import { ref, computed, watchEffect, onMounted } from 'vue'

const { theme, page, lang } = useData<NimiqVitepressThemeConfig>()

const editThisPage = computed(() => typeof theme.value.gitUrl === 'string'
  ? { link: `${theme.value.gitUrl}/blob/main/${page.value.filePath}`, text: 'Edit this page on GitHub' }
  : theme.value.gitUrl?.$resolve(page.value.filePath)
)

const date = computed(() => new Date(page.value.lastUpdated!))
// const isoDatetime = computed(() => date.value.toISOString())
const datetime = ref('')

// set time on mounted hook to avoid hydration mismatch due to
// potential differences in timezones of the server and clients
onMounted(() => {
  watchEffect(() => {
    console.log('lang.value', lang.value, date.value)
    datetime.value = new Intl.DateTimeFormat(lang.value, { dateStyle: 'short', timeStyle: 'short' }).format(date.value)
  })
})
</script>

<template>
  <div f-px-xl f-pt-xl f-pb-md flex="~ col" h-full>
    {{ data }}
    <article class="nq-prose" style="--nq-prose-max-width: none">
      <Content max-w-none />
    </article>
    <div mt-auto flex="~ items-center justify-between">
      <a :href="editThisPage.link" v-if="editThisPage" target="_blank" rel="noopener" un-text-12 op70 nq-arrow lh-0>
        {{ editThisPage.text }}
      </a>
      <p f-text-sm text-neutral-700>
        Last updated
        <!-- <time :datetime="isoDatetime" font-semibold>{{ datetime }}</time> -->
      </p>
    </div>
  </div>
</template>
