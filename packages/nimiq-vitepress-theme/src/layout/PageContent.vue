<script setup lang="ts">
import CopyButtonGroup from '../components/CopyButtonGroup.vue'
import { useBreadcrumbs } from '../composables/useBreadcrumbs'
import { useSecondarySidebar } from '../composables/useSecondarySidebar'
import { useSourceCode } from '../composables/useSourceCode'
import DocNavigation from './DocNavigation.vue'
import '../assets/code-blocks.css'
import '../assets/typography.css'
import '../assets/github-callouts.css'

const { breadcrumbs, showBreadcrumbs } = useBreadcrumbs()

const { showSecondarySidebar } = useSecondarySidebar()

const { showSourceCode, showCopyMarkdown, editUrl, sourceCodeUrl, sourceCodeLabel } = useSourceCode()
</script>

<template>
  <div
    :class="{
      'xl:f-pr-xs xl:f-pl-xl': showSecondarySidebar,
      'xl:f-px-xl': !showSecondarySidebar,
    }" f-pt-sm f="$px $px-min-32 $px-max-64" pb="f-xl xl:sm" flex="~ gap-16" relative h-full max-xl:f-px-lg
  >
    <div flex="~ col" size-full flex-1>
      <div
        v-if="showBreadcrumbs || showSourceCode || showCopyMarkdown"
        f-pb-lg
        flex="~ items-center justify-between"
      >
        <ul v-if="showBreadcrumbs" flex="~ items-center gap-12">
          <li v-for="({ text, icon }, i) in breadcrumbs" :key="text" contents w-max>
            <div v-if="icon" :class="icon" />
            <span nq-label f-text-2xs w-max>{{ text }}</span>
            <div v-if="i < breadcrumbs.length - 1" i-nimiq:chevron-right text="neutral-700 9" />
          </li>
        </ul>
        <div v-else />

        <div v-if="showSourceCode || showCopyMarkdown" flex="~ items-center gap-8 sm:gap-12">
          <CopyButtonGroup />

          <a
            v-if="showSourceCode" :href="sourceCodeUrl" target="_blank" rel="noopener" rounded-4 nq-pill-tertiary
            outline="~ 1.5 neutral-500" nq-arrow un-text="f-2xs neutral-900" flex="~ row gap-4"
          >
            <div i-nimiq:logos-github-mono op-80 />
            <span class="hidden sm:inline">{{ sourceCodeLabel }}</span>
          </a>
        </div>
      </div>

      <article
        flex-1
        class="nq-prose"
        f-pb="lg md:3xl"
        style="--nq-prose-max-width: none;"
      >
        <div style="max-width: none; margin-left: 0; margin-right: 0;">
          <Content max-w-none px-0 />
        </div>
      </article>

      <DocNavigation />

      <div flex="~ justify-between items-center" f-mt-lg f-text-xs>
        <a :href="editUrl" target="_blank" rel="noopener" op-70 hover:opacity-100 transition-opacity flex="~ items-center gap-3">
          <span>Suggest changes on this page</span>
          <div i-nimiq:arrow-right text="neutral-700 12" />
        </a>
        <span text-neutral-600 font-normal>Built with the <a href="https://onmax.github.io/nimiq-ui/vitepress-theme/" un-text-neutral-700 target="_blank" rel="noopener" underline hover:text-neutral-800 transition-colors>Nimiq Vitepress Theme</a></span>
      </div>
    </div>
  </div>
</template>
