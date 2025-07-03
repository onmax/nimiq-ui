<script setup lang="ts">
import { useBreadcrumbs } from '../composables/useBreadcrumbs'
import { useChangelog } from '../composables/useChangelog'
import { useSecondarySidebar } from '../composables/useSecondarySidebar'
import { useSourceCode } from '../composables/useSourceCode'
import Changelog from './Changelog.vue'
import DocNavigation from './DocNavigation.vue'
import '../assets/code-blocks.css'
import '../assets/typography.css'
import '../assets/github-callouts.css'

const { breadcrumbs, showBreadcrumbs } = useBreadcrumbs()

const { showSecondarySidebar } = useSecondarySidebar()

const { showChangelog } = useChangelog()
const { showSourceCode, showCopyMarkdown, editUrl, sourceCodeUrl, sourceCodeLabel, copyMarkdownContent, copied } = useSourceCode()
</script>

<template>
  <div
    :class="{
      'xl:f-pr-xs xl:f-pl-xl': showSecondarySidebar,
      'xl:f-px-xl': !showSecondarySidebar,
    }" f-pt-sm f="$px $px-min-48 $px-max-72" pb="f-xl xl:sm" flex="~ gap-16" relative h-full
  >
    <div flex="~ col" h-full flex-1 max-w-full>
      <div v-if="showBreadcrumbs || showSourceCode || showCopyMarkdown" f-pb-lg flex="~ items-center justify-between">
        <ul v-if="showBreadcrumbs" flex="~ items-center gap-12">
          <li v-for="({ text, icon }, i) in breadcrumbs" :key="text" contents w-max>
            <div v-if="icon" :class="icon" />
            <span nq-label f-text-2xs w-max>{{ text }}</span>
            <div v-if="i < breadcrumbs.length - 1" i-nimiq:chevron-right text="neutral-700 9" />
          </li>
        </ul>
        <div v-else />

        <div v-if="showSourceCode || showCopyMarkdown" flex="~ items-center gap-8 sm:gap-12">
          <button
            v-if="showCopyMarkdown" nq-pill-tertiary outline="~ 1.5 neutral-500" translate-y-0 shadow-none
            un-text="f-2xs neutral-900 copied:white" rounded-4 copied:bg-green flex="~ row gap-4"
            :data-state="copied ? '' : undefined" @click="copyMarkdownContent"
          >
            <div i-nimiq:copy copied:i-nimiq:checkmark />
            <span>{{ copied ? 'Copied!' : 'Copy MD' }}</span>
          </button>

          <a
            v-if="showSourceCode" :href="sourceCodeUrl" target="_blank" rel="noopener" rounded-4 nq-pill-tertiary
            outline="~ 1.5 neutral-500" nq-arrow un-text="f-2xs neutral-900" flex="~ row gap-4"
          >
            <div i-nimiq:logos-github-mono op-80 />
            <span class="hidden sm:inline">{{ sourceCodeLabel }}</span>
          </a>
        </div>
      </div>

      <article flex-1 class="nq-prose" f-pb="lg md:3xl" var:nq-prose-max-width:none>
        <Content max-w-none px-0 />
        <Changelog v-if="showChangelog" />
      </article>
      <DocNavigation />
      <div flex="~ wrap justify-between gap-8" f-mt-xs f-text-xs px-32>
        <a :href="editUrl" target="_blank" rel="noopener" op-70 nq-arrow>
          Suggest changes on this page
        </a>
        <p text-neutral-700 font-normal italic>
          Built with the <a
            href="https://onmax.github.io/nimiq-ui/vitepress-theme/" un-text-neutral-800 target="_blank"
            rel="noopener" underline
          >Nimiq Vitepress Theme</a>
        </p>
      </div>
    </div>
  </div>
</template>
