<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { DrawerContent, DrawerOverlay, DrawerPortal, DrawerRoot, DrawerTrigger } from 'vaul-vue'
import { useRouter, withBase } from 'vitepress'
import { ref, watch } from 'vue'
import { useSecondarySidebar } from '../composables/useSecondarySidebar'
import SecondarySidebar from './SecondarySidebar.vue'
import Sidebar from './Sidebar.vue'

const open = ref(false)
const openSecondarySidebar = ref(false)

const shouldTeleport = ref(false)
watchDebounced(
  () => openSecondarySidebar.value,
  (val) => {
    shouldTeleport.value = val
  },
  { debounce: 200 },
)

const { showSecondarySidebar } = useSecondarySidebar()

const { route } = useRouter()

watch(route, () => {
  open.value = false
  openSecondarySidebar.value = false
})

const { showWidget } = useSecondarySidebar()
</script>

<template>
  <div>
    <div v-if="showWidget" id="widget" fixed bottom-64 rounded-4 outline="~ 1.5 offset--1.5 neutral-400" h-20vh bg-neutral-50 shadow w="[calc(100vw-16px)]" inset-x-8 />
    <nav w-screen border="t neutral-300" nq-raw bg-neutral-0 z-10 :data-sidebar="open ? '' : undefined">
      <ul grid="~ items-center" :class="showSecondarySidebar ? 'cols-4' : 'cols-3'" children:children:h-56>
        <li>
          <a :href="withBase('')" stack>
            <div i-tabler:home text-20 />
          </a>
        </li>

        <li v-if="showSecondarySidebar">
          <DrawerRoot v-model:open="openSecondarySidebar">
            <DrawerTrigger stack bg-transparent>
              <div i-nimiq:widget text-18 />
            </DrawerTrigger>
            <DrawerPortal>
              <DrawerOverlay fixed inset-0 bg-neutral bg-opacity-20 />
              <DrawerContent mt-24 max-h="96%" h-80vh fixed bottom-56 left-0 right-0>
                <SecondarySidebar :with-widget="false" bg-neutral-100 w-screen f-pt-sm rounded-t-12 />
              </DrawerContent>
            </DrawerPortal>
          </DrawerRoot>
        </li>

        <li px-8>
          <a :href="withBase('')" nq-pill-blue nq-pill-lg h-48="!" w-full outline="~ 1.5 offset--1.5 white/8">
            <div i-nimiq:magnifying-glass />
          </a>
        </li>

        <li>
          <DrawerRoot v-model:open="open">
            <DrawerTrigger stack bg-transparent>
              <div i-tabler:menu-2 text-20 />
            </DrawerTrigger>
            <DrawerPortal>
              <DrawerOverlay fixed inset-0 bg-neutral bg-opacity-20 />
              <DrawerContent mt-24 max-h="96%" h-80vh fixed bottom-56 left-0 right-0>
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
    0px -18px 38px rgba(var(--nq-neutral) / 0.07),
    0px -7px 8.5px rgba(var(--nq-neutral) / 0.04),
    0px -2px 2.5px rgba(var(--nq-neutral) / 0.02);
}
</style>
