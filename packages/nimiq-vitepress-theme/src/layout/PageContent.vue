<script setup lang="ts">
import {join} from 'pathe'
import type { NimiqVitepressThemeConfig } from '../types'
import { useData } from 'vitepress'
import { useBreadcrumbs } from '../composables/useBreadcrumbs'
import SecondarySidebar from './SecondarySidebar.vue'
import '../assets/code-blocks.css'
import '../assets/typography.css'
import '../assets/github-callouts.css'
import { useSecondarySidebar } from '../composables/useSecondarySidebar'
import Contributors from './Contributors.vue'

const { page } = useData<NimiqVitepressThemeConfig>()

const { breadcrumbs } = useBreadcrumbs()

const { showSecondarySidebar } = useSecondarySidebar()

// repoUrl && cachedInfo.relativePath ? `${repoUrl}/blob/main/${cachedInfo.relativePath}` : '',
const editUrl = useEditUrl(page.value.relativePath)

// Convert URL to file path
function useEditUrl(relativePath: string): string {
  let url = relativePath.replace(/(^|\/)$/, '$1index')
  url = url.replace(/(\.html)?$/, '.md')
  url = join(__GIT_REMOTE_URL__, url)

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
      </article>

      <Contributors />
      <a :href="editUrl" target="_blank" rel="noopener" op70 group lh-0 nq-arrow>
        Suggest changes on this page
      </a>
      <p text="center neutral-700" f-text-xs f-mt-2xs font-normal italic>
        Built with the <a href="https://onmax.github.io/nimiq-ui/vitepress-theme/" un-text-neutral-800 target="_blank" rel="noopener" underline>Nimiq Vitepress Theme</a>
      </p>
    </div>
    <SecondarySidebar v-if="showSecondarySidebar" />
  </div>
</template>
