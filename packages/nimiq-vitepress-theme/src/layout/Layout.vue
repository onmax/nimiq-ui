<script setup lang="ts">
import '../assets/index.css';
import PageContent from './PageContent.vue';
import Sidebar from './Sidebar.vue'
</script>

<template>
  <div flex="~" w-full>
    <!-- TODO Add skip -->
    <Sidebar max-w="$nq-sidebar-width"  />

    <main flex-1 min-h-screen ml="$nq-sidebar-width" max-w="[calc(100vw-var(--nq-sidebar-width))]" >
      <PageContent/>
    </main>
  </div>
</template>

<style scoped>
:global(:root) {
  --nq-sidebar-width: 288px;
}
</style>
