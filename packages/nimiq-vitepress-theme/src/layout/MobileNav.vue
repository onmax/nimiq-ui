<script setup lang="ts">
import { DrawerContent, DrawerOverlay, DrawerPortal, DrawerRoot, DrawerTrigger } from 'vaul-vue'
import { useRouter } from 'vitepress'
import { defineAsyncComponent, ref, watch } from 'vue'
import { useHeaderScroll } from '../composables/useHeaderScroll'
import { useSecondarySidebar } from '../composables/useSecondarySidebar'
import Logo from './Logo.vue'
import MobileOutlineAccordion from './MobileOutlineAccordion.vue'

const searchOpen = ref(false)
const menuOpen = ref(false)

const SearchCommandBox = defineAsyncComponent(() => import('./SearchCommandBox.vue'))
const Sidebar = defineAsyncComponent(() => import('./Sidebar.vue'))

const { route } = useRouter()
const { isHeaderVisible } = useHeaderScroll()

watch(route, () => {
  searchOpen.value = false
  menuOpen.value = false
})

const { showWidget } = useSecondarySidebar()

function handleSearchClose() {
  searchOpen.value = false
}
</script>

<template>
  <div>
    <!-- Widget still stays at bottom -->
    <div v-if="showWidget" id="widget" fixed bottom-64 rounded-4 bg-neutral-50 shadow w="[calc(100vw-16px)]" inset-x-8 />

    <!-- Top navigation header -->
    <header
      fixed inset-x-0 top-0 z-1000 mx-8 mt-8 bg-neutral-0 outline="1.5 offset--1.5 neutral/6" shadow
      rounded-12 transition="[transform,opacity] duration-300 ease-out"
      :class="{ 'translate-y--120% opacity-0': !isHeaderVisible }"
    >
      <nav flex="~ items-center justify-between" f-px-sm f-py-2xs h-full>
        <!-- Logo on the left -->
        <Logo />

        <!-- Right side: Search + Menu -->
        <div flex="~ items-center gap-8">
          <!-- Search Drawer -->
          <DrawerRoot v-model:open="searchOpen" direction="bottom">
            <DrawerTrigger flex="~ items-center justify-center" size-32 rounded-6 bg="transparent hocus:neutral-200" transition-colors>
              <div i-nimiq:magnifying-glass text-14 />
            </DrawerTrigger>
            <DrawerPortal>
              <DrawerOverlay fixed inset-0 bg-neutral bg-opacity-20 />
              <DrawerContent fixed inset-x-0 bottom-0 max-h-90vw bg-neutral-100 rounded-t-12 f-p-sm>
                <SearchCommandBox @close="handleSearchClose" />
              </DrawerContent>
            </DrawerPortal>
          </DrawerRoot>

          <!-- Menu Drawer -->
          <DrawerRoot v-model:open="menuOpen" direction="right">
            <DrawerTrigger flex="~ items-center justify-center" size-32 rounded-6 bg="transparent hocus:neutral-200" transition-colors>
              <div i-tabler:menu-2 f-text-md />
            </DrawerTrigger>
            <DrawerPortal>
              <DrawerOverlay fixed inset-0 bg-neutral bg-opacity-20 />
              <DrawerContent fixed inset-y-0 right-0 w-85vw max-w-450 min-h-screen bg-neutral-100 rounded-l-12 f-p-0>
                <div w-full f-px-sm h-screen of-hidden class="mobile-sidebar-container">
                  <Sidebar :search="false" relateive inset-unset size-full p-0 />
                </div>
              </DrawerContent>
            </DrawerPortal>
          </DrawerRoot>
        </div>
      </nav>

      <MobileOutlineAccordion />
    </header>
  </div>
</template>

<style scoped>
/* Widget styling when it has content */
#widget:not(:empty) {
  --uno: 'max-h-20vh outline outline-1.5 outline-offset--1.5 outline-neutral-400';
}
</style>
