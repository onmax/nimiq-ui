<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div bg-neutral-0 dark="text-white">
    <div w-screen max-w-4xl pt-6 mx-auto>
      <header flex justify-between>
        <nav flex="~ gap-x-8">
          <RouterLink to="/">Back</RouterLink>
          <RouterLink to="/components">Components</RouterLink>
          <RouterLink to="/typography">Typography</RouterLink>
        </nav>
        <button @click="toggleDark()" px-4 py-2 rounded-full font-bold bg-neutral-400>
          {{ isDark ? 'Dark' : 'Light' }}
        </button>
      </header>
      
      <RouterView />
    </div>
  </div>
</template>

<style scoped>

</style>
