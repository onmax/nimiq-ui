<script setup lang="ts">
import type { DefaultTheme } from 'vitepress'
import { inBrowser, useData } from 'vitepress'
import { nextTick, ref, watch } from 'vue'

const { isDark } = useData<DefaultTheme.Config>()

// Flag to control whether to auto-sync color-scheme (disabled during transitions)
const isTransitioning = ref(false)

// Sync isDark with color-scheme property for light-dark() CSS functions
if (inBrowser) {
  watch(isDark, (dark) => {
    if (!isTransitioning.value) {
      globalThis.document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    }
  }, { immediate: true })
}

const enableTransitions = () => inBrowser && 'startViewTransition' in globalThis?.document && globalThis?.window.matchMedia('(prefers-reduced-motion: no-preference)').matches

async function toggleTheme(_event: MouseEvent) {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  // Start transitioning - prevent auto color-scheme sync
  isTransitioning.value = true

  const transition = globalThis.document.startViewTransition(async () => {
    isDark.value = !isDark.value
    // Set color-scheme here so the new snapshot captures the new theme
    globalThis.document.documentElement.style.colorScheme = isDark.value ? 'dark' : 'light'
    await nextTick()
  })

  // Re-enable auto sync after transition completes
  transition.finished.finally(() => {
    isTransitioning.value = false
  })
}
</script>

<template>
  <label ml-auto flex="~ items-center">
    <input type="checkbox" nq-switch text-17 bg="neutral-400" :checked="isDark" @click.prevent="toggleTheme">
    <span sr-only>Theme switcher</span>
  </label>
</template>
