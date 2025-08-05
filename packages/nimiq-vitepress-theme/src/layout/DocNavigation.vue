<script setup lang="ts">
import { useDocNavigation } from '../composables/useDocNavigation'

const { navigation, showNavigation } = useDocNavigation()
</script>

<template>
  <nav v-if="showNavigation && (navigation.prev || navigation.next)" class="grid grid-cols-1 sm:grid-cols-2 gap-8" f-mt-lg>
    <!-- Previous Card -->
    <a
      v-if="navigation.prev"
      :href="navigation.prev.link"
      class="navigation-card navigation-card-prev group block px-6 py-8 rounded-12 border border-neutral-200 hover:bg-neutral-50 focus-visible:outline-blue-500 transition-colors bg-white"
    >
      <div class="inline-flex items-center mb-4 pl-16">
        <div class="i-nimiq:arrow-left size-16 pt-24 shrink-0 text-neutral-600 group-hover:text-blue-600 transition-[color,translate] group-active:-translate-x-0.5" />
      </div>
      <p class="font-medium f-text-xl text-neutral-900 mb-1 truncate pl-16">{{ navigation.prev.text }}</p>
    </a>
    <div v-else />

    <!-- Next Card -->
    <a
      v-if="navigation.next"
      :href="navigation.next.link"
      class="navigation-card navigation-card-next group block px-6 py-8 rounded-12 border border-neutral-200 hover:bg-neutral-50 focus-visible:outline-blue-500 transition-colors text-right bg-white"
    >
      <div class="inline-flex items-center mb-4 justify-end pr-16">
        <div class="i-nimiq:arrow-right size-16 pt-24 shrink-0 text-neutral-600 group-hover:text-blue-600 transition-[color,translate] group-active:translate-x-0.5" />
      </div>
      <p class="font-medium f-text-xl text-neutral-900 mb-1 truncate pr-16">{{ navigation.next.text }}</p>
    </a>
    <div v-else />
  </nav>
</template>

<style scoped>
.navigation-card {
  min-height: 120px;
}

@media (max-width: 640px) {
  nav {
    grid-template-columns: 1fr;
  }
}
</style>
