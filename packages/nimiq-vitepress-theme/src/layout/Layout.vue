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
  <div id="viewport" class="flex">
    <!-- TODO Add skip -->
    <Sidebar v-if="showSidebar" />

    <main class="min-h-screen" :class="showSidebar ? 'ml-[var(--nq-sidebar-width)]' : 'ml-0'">
      <PageContent />
    </main>
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
