<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { useSecondarySidebar } from '../composables/useSecondarySidebar'
import MobileNav from './MobileNav.vue'
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

const breakpoints = useBreakpoints({ md: 768 })
const isMobile = breakpoints.smaller('md')
</script>

<template>
  <div id="viewport" flex relative var:nq-sidebar-width:100vw md:var:--colors-sidebar-width:288px>
    <!-- TODO Add skip -->
    <template v-if="!isMobile">
      <Sidebar v-if="showSidebar" w="$nq-sidebar-width" shrink-0 />
      <main
        min-h-screen flex-1 :class="{
          'md:max-w-1220 md:mx-auto': !showSidebar && !showSecondarySidebar,
          'md:ml-$nq-sidebar-width': showSidebar,
        }"
      >
        <PageContent />
      </main>

      <SecondarySidebar v-if="showSecondarySidebar" />
    </template>
    <template v-else>
      <main min-h-screen w-full mb-56>
        <PageContent />
      </main>

      <!-- <SecondarySidebar v-if="showSecondarySidebar" /> -->
      <MobileNav fixed bottom-0 />
    </template>
  </div>
</template>
