<script setup lang="ts">
import type { NimiqVitepressThemeConfig } from '../types'
import { join } from 'pathe'
import { useData } from 'vitepress'
import { useBreadcrumbs } from '../composables/useBreadcrumbs'
import { useChangelog } from '../composables/useChangelog'
import { useSecondarySidebar } from '../composables/useSecondarySidebar'
import Changelog from './Changelog.vue'
import SecondarySidebar from './SecondarySidebar.vue'
import '../assets/code-blocks.css'
import '../assets/typography.css'
import '../assets/github-callouts.css'

const { page } = useData<NimiqVitepressThemeConfig>()
const { breadcrumbs } = useBreadcrumbs()

const { showSecondarySidebar } = useSecondarySidebar()

const { repoURL } = useChangelog()
const editUrl = useEditUrl(page.value.relativePath)

// Convert URL to file path
function useEditUrl(relativePath: string): string {
  let url = relativePath.replace(/(^|\/)$/, '$1index')
  url = url.replace(/(\.html)?$/, '.md')
  url = join(repoURL.value, url)
  return url
}
</script>

<template>
  <div :class="showSecondarySidebar ? 'f-pr-xs f-pl-xl' : 'f-px-xl'" f-pt-sm f="$px $px-min-48 $px-max-72" f-pb-sm flex="~ gap-16" relative h-full>
    <div flex="~ col" h-full flex-1 w="[calc(100vw-2*var(--nq-sidebar-width)-2*var(--f-px))]">
      <ul px-32 f-pb-lg flex="~ items-center gap-12">
        <li v-for="({ text, icon }, i) in breadcrumbs" :key="text" contents w-max>
          <div v-if="icon" :class="icon" />
          <span nq-label f-text-2xs w-max>{{ text }}</span>
          <div v-if="i < breadcrumbs.length - 1" i-nimiq:chevron-right text="neutral-700 9" />
        </li>
      </ul>

      <article flex-1 class="nq-prose" var:nq-prose-max-width:none>
        <Content max-w-none />
        <Changelog />
      </article>
      <div flex="~ wrap justify-between gap-8" f-mt-xs f-text-xs>
        <a :href="editUrl" target="_blank" rel="noopener" op-70 nq-arrow>
          Suggest changes on this page
        </a>
        <p text-neutral-700 font-normal italic>
          Built with the <a href="https://onmax.github.io/nimiq-ui/vitepress-theme/" un-text-neutral-800 target="_blank" rel="noopener" underline>Nimiq Vitepress Theme</a>
        </p>
      </div>
    </div>
    <SecondarySidebar v-if="showSecondarySidebar" />
  </div>
</template>
