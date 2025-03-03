<script setup lang="ts">
// Date logic copied from https://github.com/vuejs/vitepress/blob/58bd3e23dd2175a2e9744bdc0d649126bdd0ea2f/src/client/theme-default/components/VPDocFooterLastUpdated.vue#L18

import { useData, useRoute } from 'vitepress'
import type { NimiqVitepressThemeConfig } from '../types';
import { data } from '../git.data'
import { ref, computed, onMounted, watch } from 'vue'
import { useTimeAgo } from '@vueuse/core';
import { useOutline } from '../composables/useOutline'
import '../assets/code-blocks.css'
import '../assets/typography.css'
import '../assets/github-callouts.css'

const { theme, lang, frontmatter } = useData<NimiqVitepressThemeConfig>()

const route = useRoute()

const currentPageData = computed(() => data.filter(d => d.url === route.path)[0])
const lastUpdated = computed(() => currentPageData.value?.lastUpdated)
const commitHash = computed(() => currentPageData.value?.hash || '')
const shortHash = computed(() => commitHash.value.slice(0, 7))
const editUrl = computed(() => currentPageData.value?.editUrl || '')
const commitUrl = computed(() => currentPageData.value?.commitUrl || '')

const date = computed(() => new Date(lastUpdated.value as number))
const isValidDate = computed(() => !!lastUpdated?.value && !isNaN(date.value.getTime()))
const isoDatetime = computed(() => isValidDate.value ? date.value.toISOString() : '')
const datetime = ref('')

const ago = useTimeAgo(date)

// set time on mounted hook to avoid hydration mismatch due to
// potential differences in timezones of the server and clients
onMounted(() => {
  watch(date, () => {
    if (!isValidDate.value) return
    datetime.value = new Intl.DateTimeFormat(lang.value, { dateStyle: 'short', timeStyle: 'short' }).format(date.value)
  })
})

const showEditContent = computed(() => theme.value.showEditContent !== false)
const showLastUpdated = computed(() => theme.value.showLastUpdated !== false)

const { headingTree, isHeadingActive } = useOutline()

const showOutline = computed(() => headingTree.value.length > 0 )
const showWidget = computed(() => frontmatter.value.widget !== false)
const showSecondarySidebar = computed(() => showOutline.value || showWidget.value)
</script>

<template>
  <div f-pl-xl f-pr-xs f-pt-xl f="$px $px-min-48 $px-max-72" f-pb-md flex="~ gap-16" relative h-full>
    <div flex="~ col" h-full flex-1 w="[calc(100vw-2*var(--nq-sidebar-width)-2*var(--f-px))]">
      <article flex-1 class="nq-prose" style="--nq-prose-max-width: none">
        <Content max-w-none />
      </article>
      <div mt-auto px-32 flex="~ items-center justify-between" f-text-md un-f-text-xs
        v-if="showEditContent || showLastUpdated">
        <a :href="editUrl" v-if="editUrl && showEditContent" target="_blank" rel="noopener" op70 group lh-0>
          Edit this page on <span group-hocus:text-blue transition-colors nq-arrow>GitHub</span> 
        </a>
        <div v-else></div>

        <p v-if="showLastUpdated" text-neutral-700>
          Updated
          {{ ago }}
          on
          <time :datetime="isoDatetime" font-semibold>{{ datetime }}</time>
          <span v-if="shortHash && commitUrl" ml-1 font-mono text-neutral-800>
            (<a :href="commitUrl" target="_blank" rel="noopener" un-text="neutral-800 hocus:neutral-900"
              transition-colors underline="~ dotted offset-3">
              {{ shortHash }}
            </a>)
          </span>
          <span v-else-if="shortHash" ml-1 font-mono text-neutral-800>({{ shortHash }})</span>
        </p>
      </div>
    </div>
    <div f-text-xs sticky f="$h $h-min-60 $h-max-90" h="[calc(100vh-var(--f-h))]" f-top-xl v-if="showSecondarySidebar" f-px-sm w="[calc(var(--nq-sidebar-width)+24px)]" of-y-auto f-pb-xs>
      <div text-neutral-700 flex="~ gap-8 items-center" v-if="showOutline">
        <div i-tabler:align-left />
        On this page
      </div>
      <ol list-none f-mt-xs text-neutral-800 w-max v-if="showOutline">
        <li v-for="h2 in headingTree" :key="h2.hashPath" flex="~ col" pb-4 >
          <a :href="'#' + h2.hashPath"  px-6 py-4 :class="{ 'text-blue font-semibold': isHeadingActive(h2.hashPath) }">{{ h2.text
            }}</a>
          <ol v-if="h2.items.length">
            <li v-for="h3 in h2.items" :key="h3.hashPath" flex="~ col">
              <a :href="'#' + h3.hashPath" font-normal p-4 pl-14 
                :class="{ 'text-blue font-semibold': isHeadingActive(h3.hashPath) }">{{ h3.text }}</a>
            </li>
          </ol>
        </li>
      </ol>
      <div id="widget" max-w-full v-if="showWidget" :class="{ 'f-mt-md': showOutline }" h-full />
    </div>
  </div>
</template>
