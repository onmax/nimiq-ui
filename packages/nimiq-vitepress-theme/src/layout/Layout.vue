<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'
import { useSecondarySidebar } from '../composables/useSecondarySidebar'
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

const { secondarySidebar } = useSecondarySidebar()

const isCentered = computed(() =>
  !showSidebar.value && !secondarySidebar.value,
)
</script>

<template>
  <div id="viewport" class="flex">
    <!-- TODO Add skip -->
    <Sidebar v-if="showSidebar" />

    <main :class="{ centered: isCentered }" class="min-h-screen">
      <PageContent />
    </main>
    <SecondarySidebar v-if="secondarySidebar" />
  </div>
</template>

<style>
:root {
  --nq-sidebar-width: 288px;
}

aside {
  width: var(--nq-sidebar-width);
  flex-shrink: 0;
}

main {
  flex: 1;
}

main.centered {
  margin-left: var(--nq-sidebar-width);
  margin-right: var(--nq-sidebar-width);
}
</style>
