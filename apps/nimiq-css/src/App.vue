<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useDark } from '@vueuse/core'
useDark()
</script>

<template>
  <div w-screen max-w-4xl pt-6 mx-auto>
    <header>
      <nav flex="~ gap-x-8">
        <RouterLink to="/">Back</RouterLink>
        <RouterLink to="/components">Components</RouterLink>
        <RouterLink to="/typography">Typography</RouterLink>
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>

</style>
