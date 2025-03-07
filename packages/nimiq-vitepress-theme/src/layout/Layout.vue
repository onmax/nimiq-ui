<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'
import PageContent from './PageContent.vue'
import Sidebar from './Sidebar.vue'

const { frontmatter } = useData()

const showSidebar = computed(() =>
  frontmatter.value.sidebar !== false,
)
</script>

<template>
  <div flex="~" w-full>
    <!-- TODO Add skip -->
    <Sidebar v-if="showSidebar" max-w="$nq-sidebar-width" data-sidebar />

    <main flex-1 min-h-screen ml="$nq-sidebar-width" max-w="[calc(100vw-var(--nq-sidebar-width))]">
      <PageContent />
    </main>
  </div>
</template>

<style>
@propery --nq-sidebar-width {
  syntax: '<length>';
  initial-value: 0px;
}

:root:has(sidebar[data-sidebar]) {
  --nq-sidebar-width: 288px;
}
</style>
