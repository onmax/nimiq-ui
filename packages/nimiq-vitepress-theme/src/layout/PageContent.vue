<script setup lang="ts">
// Date logic copied from https://github.com/vuejs/vitepress/blob/58bd3e23dd2175a2e9744bdc0d649126bdd0ea2f/src/client/theme-default/components/VPDocFooterLastUpdated.vue#L18

import type { NimiqVitepressThemeConfig } from '../types'
import { useTimeAgo } from '@vueuse/core'
import { useData, useRoute } from 'vitepress'
import { computed, onMounted, ref, watch } from 'vue'
import SecondarySidebar from './SecondarySidebar.vue'
import { data } from '../lib/git.data'
import { useBreadcrumbs } from '../composables/useBreadcrumbs'
import '../assets/code-blocks.css'
import '../assets/typography.css'
import '../assets/github-callouts.css'

const { theme, lang } = useData<NimiqVitepressThemeConfig>()

const route = useRoute()

const currentPageData = computed(() => data.filter(d => d.url === route.path)[0])
const lastUpdated = computed(() => currentPageData.value?.lastUpdated)
const commitHash = computed(() => currentPageData.value?.hash || '')
const shortHash = computed(() => commitHash.value.slice(0, 7))
const editUrl = computed(() => currentPageData.value?.editUrl || '')
const commitUrl = computed(() => currentPageData.value?.commitUrl || '')

const date = computed(() => new Date(lastUpdated.value as number))
const isValidDate = computed(() => !!lastUpdated?.value && !Number.isNaN(date.value.getTime()))
const isoDatetime = computed(() => isValidDate.value ? date.value.toISOString() : '')
const datetime = ref('')

const ago = useTimeAgo(date)

// set time on mounted hook to avoid hydration mismatch due to
// potential differences in timezones of the server and clients
onMounted(() => {
  watch(date, () => {
    if (!isValidDate.value)
      return
    datetime.value = new Intl.DateTimeFormat(lang.value, { dateStyle: 'short', timeStyle: 'short' }).format(date.value)
  })
})

const showEditContent = computed(() => theme.value.showEditContent !== false)
const showLastUpdated = computed(() => theme.value.showLastUpdated !== false)

const { breadcrumbs } = useBreadcrumbs()
</script>

<template>
  <div f-pl-xl f-pr-xs f-pt-sm f="$px $px-min-48 $px-max-72" f-pb-md flex="~ gap-16" relative h-full>
    <div flex="~ col" h-full flex-1 w="[calc(100vw-2*var(--nq-sidebar-width)-2*var(--f-px))]">
      <ul px-32 f-pb-lg flex="~ items-center gap-12">
        <li v-for="({text, icon},i) in breadcrumbs" :key="text" contents w-max>
          <div v-if="icon" :class="icon" />
          <span nq-label f-text-2xs w-max>{{ text }}</span>
          <div i-nimiq:chevron-right  text="neutral-700 9" v-if="i < breadcrumbs.length - 1" />
        </li>
      </ul>

      <article flex-1 class="nq-prose" var:nq-prose-max-width:none>
        <Content max-w-none />
      </article>
      <div
        v-if="showEditContent || showLastUpdated" mt-auto px-32 flex="~ items-center justify-between" f-text-md
        un-f-text-xs
      >
        <a v-if="editUrl && showEditContent" :href="editUrl" target="_blank" rel="noopener" op70 group lh-0 nq-arrow>
          Suggest changes on this page
        </a>
        <div v-else />

        <p v-if="showLastUpdated" text-neutral-700>
          Updated
          {{ ago }}
          on
          <time :datetime="isoDatetime" font-semibold>{{ datetime }}</time>
          <span v-if="shortHash && commitUrl" ml-1 font-mono text-neutral-800>
            (<a
              :href="commitUrl" target="_blank" rel="noopener" un-text="neutral-800 hocus:neutral-900"
              transition-colors underline="~ dotted offset-3"
            >
              {{ shortHash }}
            </a>)
          </span>
          <span v-else-if="shortHash" ml-1 font-mono text-neutral-800>({{ shortHash }})</span>
        </p>
      </div>
    </div>
    <SecondarySidebar />
  </div>
</template>
