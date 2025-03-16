<script setup lang="ts">
import type { NimiqVitepressThemeConfig } from '../types'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { useOutline } from '../composables/useOutline'
import '../assets/code-blocks.css'
import '../assets/typography.css'
import '../assets/github-callouts.css'

const { frontmatter } = useData<NimiqVitepressThemeConfig>()

const { headingTree, isHeadingActive } = useOutline()

const showOutline = computed(() => {
  // Explicit setting in frontmatter takes precedence
  if (frontmatter.value.outline !== undefined)
    return !!frontmatter.value.outline
  // Default: show if there are headings
  return headingTree.value.length > 0
})

const showWidget = computed(() =>
  frontmatter.value.widget !== false,
)

const showSecondarySidebar = computed(() => {
  // Explicit setting in frontmatter takes precedence
  if (frontmatter.value.secondarySidebar !== undefined)
    return !!frontmatter.value.secondarySidebar
  // Default: show if there's content to display
  return showOutline.value || showWidget.value
})
</script>

<template>
  <div v-if="showSecondarySidebar" f-text-xs sticky f="$h $h-min-60 $h-max-90" h="[calc(100vh-var(--f-h))]" f-top-xl f-px-sm w="[calc(var(--nq-sidebar-width)+24px)]" of-y-auto f-pb-xs>
    <div v-if="showOutline" text-neutral-700 flex="~ gap-8 items-center">
      <div i-tabler:align-left />
      On this page
    </div>
    <ol v-if="showOutline" list-none f-mt-xs text-neutral-800 w-max>
      <li v-for="h2 in headingTree" :key="h2.hashPath" flex="~ col" pb-4>
        <a :href="`#${h2.hashPath}`" px-6 py-4 :class="{ 'text-blue font-semibold': isHeadingActive(h2.hashPath) }">{{ h2.text
        }}</a>
        <ol v-if="h2.items.length">
          <li v-for="h3 in h2.items" :key="h3.hashPath" flex="~ col">
            <a
              :href="`#${h3.hashPath}`" font-normal p-4 pl-14
              :class="{ 'text-blue font-semibold': isHeadingActive(h3.hashPath) }"
            >{{ h3.text }}</a>
          </li>
        </ol>
      </li>
    </ol>
    <div v-if="showWidget" id="widget" max-w-full :class="{ 'f-mt-md': showOutline }" h-full />
  </div>
</template>
