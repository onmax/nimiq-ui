<script setup lang="ts">
import { DrawerContent, DrawerOverlay, DrawerPortal, DrawerRoot, DrawerTrigger } from 'vaul-vue'
import { useRouter, withBase } from 'vitepress'
import { defineAsyncComponent, ref, watch } from 'vue'
import { useSecondarySidebar } from '../composables/useSecondarySidebar'

const open = ref(false)

const SearchCommandBox = defineAsyncComponent(() => import('./SearchCommandBox.vue'))
const Sidebar = defineAsyncComponent(() => import('./Sidebar.vue'))

const { route } = useRouter()

watch(route, () => {
  open.value = false
})

const { showWidget } = useSecondarySidebar()

function handleClose() {
  open.value = false
}
</script>

<template>
  <div>
    <div
      v-if="showWidget" id="widget" fixed bottom-64 rounded-4 bg-neutral-50 shadow w="[calc(100vw-16px)]"
      inset-x-8
    />
    <nav w-screen border="t neutral-300" nq-raw bg-neutral-0 z-50 :data-sidebar="open ? '' : undefined">
      <ul grid="~ items-center cols-3" children:children:h-56>
        <li>
          <a :href="withBase('')" stack>
            <div i-tabler:home text-20 />
          </a>
        </li>

        <li px-8>
          <DrawerRoot v-model:open="open">
            <DrawerTrigger stack nq-pill-blue nq-pill-lg h-48="!" w-full outline="~ 1.5 offset--1.5 white/8">
              <div i-nimiq:magnifying-glass />
            </DrawerTrigger>
            <DrawerPortal>
              <DrawerOverlay fixed inset-0 bg-neutral bg-opacity-20 />
              <DrawerContent mt-24 max-h="96%" h-80vh fixed bottom-0 left-0 right-0 bg-neutral-100 rounded-t-12 f-pt-sm>
                <SearchCommandBox @close="handleClose" />
              </DrawerContent>
            </DrawerPortal>
          </DrawerRoot>
        </li>

        <li>
          <DrawerRoot>
            <DrawerTrigger stack bg-transparent>
              <div i-tabler:menu-2 text-20 />
            </DrawerTrigger>
            <DrawerPortal>
              <DrawerOverlay fixed inset-0 bg-neutral bg-opacity-20 />
              <DrawerContent mt-24 max-h="96%" h-80vh bottom-0 fixed left-0 right-0>
                <Sidebar :search="false" w-screen f-pt-sm rounded-t-12 />
              </DrawerContent>
            </DrawerPortal>
          </DrawerRoot>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
nav:not([data-sidebar]) {
  box-shadow:
    0px -18px 38px color-mix(in oklch, var(--colors-neutral) 7%, transparent),
    0px -7px 8.5px color-mix(in oklch, var(--colors-neutral) 4%, transparent),
    0px -2px 2.5px color-mix(in oklch, var(--colors-neutral) 2%, transparent);
}

#widget:not(:empty) {
  --uno: 'max-h-20vh outline outline-1.5 outline-offset--1.5 outline-neutral-400';
}
</style>
