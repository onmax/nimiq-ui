<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { useSecondarySidebar } from '../composables/useSecondarySidebar'
import MobileNav from './MobileNav.vue'
import MobileOutlineAccordion from './MobileOutlineAccordion.vue'
import PageContent from './PageContent.vue'
import SecondarySidebar from './SecondarySidebar.vue'
import Sidebar from './Sidebar.vue'

const { frontmatter } = useData()

const showSidebar = computed(() => {
  if (frontmatter.value.sidebar !== undefined)
    return frontmatter.value.sidebar
  if (frontmatter.value.layout === 'home')
    return false
  return true
})

const { showSecondarySidebar } = useSecondarySidebar()

const breakpoints = useBreakpoints({ lg: 1224 })
const isMobileOrTablet = breakpoints.smaller('lg')
</script>

<template>
  <div id="viewport" flex relative var:nq-sidebar-width:100vw md:var:nq-sidebar-width:288px>
    <!-- TODO Add skip -->
    <div v-if="!isMobileOrTablet" flex w-full>
      <div shrink-0 relative w="$nq-sidebar-width">
        <Sidebar v-if="showSidebar" w="$nq-sidebar-width" />
      </div>
      <main
        dark:bg-neutral-1100 min-h-screen flex-1 min-w-0 :class="{
          'md:max-w-1220 md:mx-auto': !showSidebar && !showSecondarySidebar,
        }"
      >
        <PageContent />
      </main>

      <div w="$nq-sidebar-width" shrink-0>
        <SecondarySidebar v-if="showSecondarySidebar" />
      </div>
    </div>
    <template v-else>
      <div flex="~ col" size-full>
        <MobileOutlineAccordion />

        <main dark:bg-neutral-1100 min-h-screen w-full mb-56>
          <PageContent />
        </main>
      </div>

      <MobileNav fixed bottom-0 />
    </template>
  </div>
</template>
