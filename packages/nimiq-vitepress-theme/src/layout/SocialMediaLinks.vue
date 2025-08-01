<script setup lang="ts">
import type { NimiqVitepressThemeConfig } from '../types'
import { useData, withBase } from 'vitepress'

const { theme } = useData<NimiqVitepressThemeConfig>()
</script>

<template>
  <nav>
    <ul flex="~ gap-4" f-py-xs>
      <li v-for="({ icon, link }) in theme.links" :key="link">
        <a
          :href="withBase(link)"
          target="_blank"
          rel="noopener noreferrer"
          transition-colors
          un-text="18 neutral-900 hocus:neutral"
          :aria-label="`Visit us on ${icon}`"
        >
          <div :class="icon" />
        </a>
      </li>
    </ul>
  </nav>
</template>
