<script setup lang="ts">
import { DrawerContent, DrawerOverlay, DrawerPortal, DrawerRoot, DrawerTrigger } from 'vaul-vue'
import { useRouter } from 'vitepress'
import { defineAsyncComponent, ref, watch } from 'vue'
import { useHeaderScroll } from '../composables/useHeaderScroll'
import { useSecondarySidebar } from '../composables/useSecondarySidebar'
import Logo from './Logo.vue'

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
    <div
      v-if="showWidget"
      id="widget"
      fixed
      bottom-64
      rounded-4
      bg-neutral-50
      shadow
      w="[calc(100vw-16px)]"
      inset-x-8
    />

    <!-- Top navigation header -->
    <header
      fixed
      inset-x-0
      top-0
      z-1000
      mx-16
      mt-16
      bg-neutral-0
      border="1 neutral-400"
      shadow
      rounded-12
      f-h-xl
      transition="[transform,opacity] duration-300 ease-out"
      :class="{ 'translate-y--120% opacity-0': !isHeaderVisible }"
    >
      <nav flex="~ items-center justify-between" f-px-xl f-py-sm>
        <!-- Logo on the left -->
        <Logo />

        <!-- Right side: Search + Menu -->
        <div flex="~ items-center gap-16">
          <!-- Search Drawer -->
          <DrawerRoot v-model:open="searchOpen" direction="right">
            <DrawerTrigger
              flex="~ items-center justify-center"
              w-40
              h-40
              rounded-6
              bg-transparent
              transition-colors
              hover:bg-neutral-200
            >
              <div i-nimiq:magnifying-glass text-20 />
            </DrawerTrigger>
            <DrawerPortal>
              <DrawerOverlay fixed inset-0 bg-neutral bg-opacity-20 />
              <DrawerContent
                fixed
                inset-y-0
                right-0
                w="80vw"
                max-w-400
                min-h-screen
                bg-neutral-100
                rounded-l-12
                f-p-sm
              >
                <SearchCommandBox @close="handleSearchClose" />
              </DrawerContent>
            </DrawerPortal>
          </DrawerRoot>

          <!-- Menu Drawer -->
          <DrawerRoot v-model:open="menuOpen" direction="right">
            <DrawerTrigger
              flex="~ items-center justify-center"
              w-40
              h-40
              rounded-6
              bg-transparent
              transition-colors
              hover:bg-neutral-200
            >
              <div i-tabler:menu-2 text-20 />
            </DrawerTrigger>
            <DrawerPortal>
              <DrawerOverlay fixed inset-0 bg-neutral bg-opacity-20 />
              <DrawerContent
                fixed
                inset-y-0
                right-0
                w="85vw"
                max-w-450
                min-h-screen
                bg-neutral-100
                rounded-l-12
                f-p-0
              >
                <div h-full w-full class="mobile-sidebar-container">
                  <Sidebar
                    :search="false"
                    class="mobile-sidebar"
                  />
                </div>
              </DrawerContent>
            </DrawerPortal>
          </DrawerRoot>
        </div>
      </nav>
    </header>
  </div>
</template>

<style scoped>
/* Enhanced floating header shadow */
header {
  box-shadow:
    0px 4px 8px color-mix(in oklch, var(--colors-neutral) 6%, transparent),
    0px 2px 4px color-mix(in oklch, var(--colors-neutral) 4%, transparent),
    0px 1px 2px color-mix(in oklch, var(--colors-neutral) 2%, transparent);
}

/* Widget styling when it has content */
#widget:not(:empty) {
  --uno: 'max-h-20vh outline outline-1.5 outline-offset--1.5 outline-neutral-400';
}

/* Fix mobile sidebar positioning and padding */
.mobile-sidebar-container {
  height: 100vh;
  overflow: hidden;
}

.mobile-sidebar-container :deep(.mobile-sidebar) {
  position: relative !important;
  inset: unset !important;
  left: unset !important;
  right: unset !important;
  top: unset !important;
  bottom: unset !important;
  height: 100% !important;
  width: 100% !important;
  padding: 0 !important;
}

.mobile-sidebar-container :deep(.mobile-sidebar > div:first-child) {
  padding: 1rem !important;
  padding-bottom: 0 !important;
}
</style>
