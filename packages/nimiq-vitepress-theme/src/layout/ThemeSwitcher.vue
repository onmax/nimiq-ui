<script setup lang="ts">
import { type DefaultTheme, inBrowser, useData } from 'vitepress';
import { nextTick } from 'vue';
import { useWindowSize } from '@vueuse/core';

const { isDark } = useData<DefaultTheme.Config>()

const enableTransitions = () => inBrowser && 'startViewTransition' in globalThis?.document && globalThis?.window.matchMedia('(prefers-reduced-motion: no-preference)').matches

const { height:windowHeight, width: windowWidth }  = useWindowSize()

function getHexagonPoints(x: number, y: number, r: number): string {
  const angles = [0, 60, 120, 180, 240, 300]
  return angles.map((angle) => {
    const radian = (Math.PI / 180) * angle
    const dx = r * Math.cos(radian)
    const dy = r * Math.sin(radian)
    return `${x + dx}px ${y + dy}px`
  }).join(', ')
}

async function toggleTheme({ clientX: x, clientY: y }: MouseEvent) {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    
    return
  }

  const maxDistance = Math.max(x, windowWidth.value - x, y / Math.sqrt(3), (windowHeight.value - y) / Math.sqrt(3))
  const clipPath = [`polygon(${getHexagonPoints(x, y, 0)})`, `polygon(${getHexagonPoints(x, y, maxDistance)})`]

  await globalThis.document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  globalThis.document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    { duration: 300, easing: 'ease-in', pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)` },
  )
}
</script>

<template>
 
      <label ml-auto flex="~ items-center">
        <input type="checkbox" nq-switch text-17 bg="neutral-400" :checked="isDark" @click.prevent="toggleTheme">
        <span sr-only>Theme switcher</span>
      </label>
</template>
