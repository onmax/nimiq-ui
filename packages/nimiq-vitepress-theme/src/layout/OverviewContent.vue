<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core'
import { useData } from 'vitepress'
import { computed } from 'vue'
import MobileNav from './MobileNav.vue'
import MobileOutlineAccordion from './MobileOutlineAccordion.vue'
import Sidebar from './Sidebar.vue'
import '../assets/code-blocks.css'
import '../assets/typography.css'
import '../assets/github-callouts.css'
import 'nimiq-css/css/static-content.css'

const { frontmatter } = useData()

const showSidebar = computed(() => {
  if (frontmatter.value.sidebar !== undefined)
    return frontmatter.value.sidebar
  return true // Default to showing sidebar for overview pages
})

const breakpoints = useBreakpoints({ lg: 1224 })
const isMobileOrTablet = breakpoints.smaller('lg')
</script>

<template>
  <div flex relative var:nq-sidebar-width:100vw md:var:nq-sidebar-width:288px>
    <!-- Desktop Layout -->
    <div v-if="!isMobileOrTablet" flex w-full>
      <div shrink-0 relative w="$nq-sidebar-width">
        <Sidebar v-if="showSidebar" w="$nq-sidebar-width" />
      </div>
      <main
        of-hidden dark:bg-neutral-1100 min-h-screen w-full flex-1 min-w-0
        :class="{
          'ml-[$nq-sidebar-width]': showSidebar,
          'ml-0': !showSidebar,
          'md:max-w-1220 md:mx-auto': !showSidebar,
        }"
      >
        <article h-full>
          <Content />
        </article>
      </main>
    </div>

    <!-- Mobile Layout -->
    <template v-else>
      <div flex="~ col" size-full>
        <MobileOutlineAccordion />

        <main dark:bg-neutral-1100 min-h-screen w-full>
          <article w-full max-w-none h-full>
            <Content />
          </article>
        </main>
      </div>

      <MobileNav fixed bottom-0 />
    </template>
  </div>
</template>
