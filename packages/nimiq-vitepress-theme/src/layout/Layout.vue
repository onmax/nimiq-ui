<script setup lang="ts">
import type { NimiqVitepressThemeConfig } from '../types'
import { useBreakpoints } from '@vueuse/core'
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'
import { useSecondarySidebar } from '../composables/useSecondarySidebar'
import CommandMenu from './CommandMenu.vue'
import Logo from './Logo.vue'
import MobileNav from './MobileNav.vue'
import MobileOutlineAccordion from './MobileOutlineAccordion.vue'
import PageContent from './PageContent.vue'
import SecondarySidebar from './SecondarySidebar.vue'
import Sidebar from './Sidebar.vue'

const { frontmatter } = useData()

const isHome = computed(() => frontmatter.value.layout === 'home')
const showSidebar = computed(() => {
  if (frontmatter.value.sidebar !== undefined)
    return frontmatter.value.sidebar
  if (isHome.value)
    return false
  return true
})

const { theme } = useData<NimiqVitepressThemeConfig>()
const modules = computed(() => theme.value.modules)

const { showSecondarySidebar } = useSecondarySidebar()

const breakpoints = useBreakpoints({ lg: 1224 })
const isMobileOrTablet = breakpoints.smaller('lg')
</script>

<template>
  <div v-if="!isHome" id="viewport" flex relative var:nq-sidebar-width:100vw md:var:nq-sidebar-width:288px data-layout="docs">
    <!-- TODO Add skip -->
    <div v-if="!isMobileOrTablet" flex w-full>
      <div shrink-0 relative w="$nq-sidebar-width">
        <Sidebar v-if="showSidebar" w="$nq-sidebar-width" />
      </div>
      <main
        of-hidden
        dark:bg-neutral-1100 min-h-screen flex-1 min-w-0 :class="{
          'md:max-w-1220 md:mx-auto': !showSidebar && !showSecondarySidebar,
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
        <MobileOutlineAccordion />

        <main dark:bg-neutral-1100 min-h-screen w-full mb-56>
          <PageContent />
        </main>
      </div>

      <MobileNav fixed bottom-0 />
    </template>
  </div>

  <div v-else data-layout="home">
    <template v-if="isMobileOrTablet">
      <PageContent />
      <MobileNav fixed bottom-0 />
    </template>
    <template v-else>
      <header z-1000 fixed inset-x-0 top-0 border="b-1 neutral-400" shadow bg-neutral-0 f-h-xl flex="~ gap-32" f-px-xl f-py-sm>
        <Logo />
        <CommandMenu max-w-320 ml-auto />
        <nav flex="~ items-center gap-32">
          <a v-for="module in modules" :key="module.text" shrink-0 :href="withBase(module.defaultPageLink)">
            {{ module.text }}</a>
        </nav>
      </header>
      <Content f-pt-xl />
    </template>
  </div>
</template>
