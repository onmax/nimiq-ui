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

const { showSecondarySidebar } = useSecondarySidebar()
</script>

<template>
  <div id="viewport" class="flex">
    <!-- TODO Add skip -->
    <Sidebar v-if="showSidebar" />

    <main
      :class="{
        'mx-$nq-sidebar-width': !showSidebar && !showSecondarySidebar,
        'ml-$nq-sidebar-width': showSidebar,
      }" class="min-h-screen"
    >
      <PageContent />
    </main>
    <SecondarySidebar v-if="showSecondarySidebar" />
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
</style>
