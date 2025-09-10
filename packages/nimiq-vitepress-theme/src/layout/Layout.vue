<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { useSecondarySidebar } from '../composables/useSecondarySidebar'
import DesktopHeader from './DesktopHeader.vue'
import MobileNav from './MobileNav.vue'
import NotFound from './NotFound.vue'
import OverviewContent from './OverviewContent.vue'
import PageContent from './PageContent.vue'
import SecondarySidebar from './SecondarySidebar.vue'
import Sidebar from './Sidebar.vue'

const { frontmatter, page } = useData()

const isHome = computed(() => frontmatter.value.layout === 'home')
const isOverview = computed(() => frontmatter.value.layout === 'overview')
const is404 = computed(() => page.value.isNotFound || frontmatter.value.layout === '404')
const showSidebar = computed(() => {
  if (frontmatter.value.sidebar !== undefined)
    return frontmatter.value.sidebar
  if (isHome.value)
    return false
  return true
})

const { showSecondarySidebar } = useSecondarySidebar()

const breakpoints = useBreakpoints({ lg: 1224 })
const isMobileOrTablet = breakpoints.smaller('lg')
</script>

<template>
  <!-- 404 Not Found Page -->
  <NotFound v-if="is404" />

  <!-- Home Page -->
  <div v-else-if="isHome" data-layout="home" min-h-screen>
    <template v-if="isMobileOrTablet">
      <Content />
      <MobileNav fixed bottom-0 />
    </template>
    <template v-else>
      <DesktopHeader />
      <Content f-pt-xl />
    </template>
  </div>

  <!-- Overview Pages -->
  <div v-else-if="isOverview" id="viewport" data-layout="overview" min-h-screen>
    <OverviewContent />
  </div>

  <!-- Documentation Pages (default) -->
  <div v-else id="viewport" flex relative var:nq-sidebar-width:100vw md:var:nq-sidebar-width:288px data-layout="docs">
    <!-- TODO Add skip -->
    <div v-if="!isMobileOrTablet" flex w-full>
      <div shrink-0 relative w="$nq-sidebar-width">
        <Sidebar v-if="showSidebar" w="$nq-sidebar-width" />
      </div>
      <main
        of-hidden
        dark:bg-neutral-1100
        min-h-screen
        flex-1
        min-w-0
        :class="{
          'ml-[$nq-sidebar-width]': showSidebar,
          'ml-0': !showSidebar,
          'max-w-1400 mx-auto': !showSidebar && !showSecondarySidebar,
          'max-w-1200 mx-auto': showSidebar && !showSecondarySidebar,
          'max-w-1000 mx-auto': showSidebar && showSecondarySidebar,
        }"
      >
        <PageContent />
      </main>

      <div v-if="showSecondarySidebar" w="$nq-sidebar-width" shrink-0>
        <SecondarySidebar />
      </div>
    </div>
    <template v-else>
      <div flex="~ col" size-full>
        <main dark:bg-neutral-1100 min-h-screen w-full mb-56>
          <PageContent />
        </main>
      </div>

      <MobileNav fixed bottom-0 />
    </template>
  </div>
</template>
