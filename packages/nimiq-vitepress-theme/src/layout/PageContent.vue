<script setup lang="ts">
import type { NimiqVitepressThemeConfig } from '../types'
import { join } from 'pathe'
import { useData } from 'vitepress'
import { useBreadcrumbs } from '../composables/useBreadcrumbs'
import { useSecondarySidebar } from '../composables/useSecondarySidebar'
import SecondarySidebar from './SecondarySidebar.vue'
import '../assets/code-blocks.css'
import '../assets/typography.css'
import '../assets/github-callouts.css'

const { page } = useData<NimiqVitepressThemeConfig>()
const { breadcrumbs } = useBreadcrumbs()

const { showSecondarySidebar } = useSecondarySidebar()

const editUrl = useEditUrl(page.value.relativePath)

// Convert URL to file path
function useEditUrl(relativePath: string): string {
  let url = relativePath.replace(/(^|\/)$/, '$1index')
  url = url.replace(/(\.html)?$/, '.md')
  url = join('https://github.com/onmax/nimiq-ui', url)
  return url
}
</script>

<template>
  <div :class="showSecondarySidebar ? 'f-pr-xs f-pl-xl' : 'f-px-xl'" f-pt-sm f="$px $px-min-48 $px-max-72" f-pb-sm flex="~ gap-16" relative h-full>
    <div flex="~ col" h-full flex-1 :class="showSecondarySidebar ? 'w-[calc(100vw-2*var(--nq-sidebar-width)-2*var(--f-px))]' : 'w-[calc(100vw-var(--nq-sidebar-width)-2*var(--f-px))]'" :style="!showSecondarySidebar ? 'max-width: calc(100vw - var(--nq-sidebar-width) - 200px)' : ''">
      <ul px-32 f-pb-lg flex="~ items-center gap-12">
        <li v-for="({ text, icon }, i) in breadcrumbs" :key="text" contents w-max>
          <div v-if="icon" :class="icon" />
          <span nq-label f-text-2xs w-max>{{ text }}</span>
          <div v-if="i < breadcrumbs.length - 1" i-nimiq:chevron-right text="neutral-700 9" />
        </li>
      </ul>

      <article flex-1 class="nq-prose" var:nq-prose-max-width:none>
        <Content max-w-none />
      </article>
      <div flex="~ justify-between items-center" f-mt-lg f-text-xs>
        <a :href="editUrl" target="_blank" rel="noopener" op-70 hover:opacity-100 transition-opacity flex="~ items-center gap-3">
          <span>Suggest changes on this page</span>
          <div i-nimiq:arrow-right text="neutral-700 12" />
        </a>
        <span text-neutral-600 font-normal>
          Built with the <a href="https://onmax.github.io/nimiq-ui/vitepress-theme/" un-text-neutral-700 target="_blank" rel="noopener" underline hover:text-neutral-800 transition-colors>Nimiq Vitepress Theme</a>
        </span>
      </div>
    </div>
    <SecondarySidebar v-if="showSecondarySidebar" />
  </div>
</template>
