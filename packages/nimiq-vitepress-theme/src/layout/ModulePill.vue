<script setup lang="ts">
import type { NimiqVitepressThemeNav } from '../types'
import { withBase } from 'vitepress'

defineProps<{ item: NimiqVitepressThemeNav, component: 'a' | 'div' }>()
</script>

<template>
  <component
    :is="component" :href="withBase(item.defaultPageLink)" f-text-xs py-6 pl-12 pr-16 w-full hocus:bg-neutral-300
    transition-colors :class="{ 'grid-cols-[max-content_1fr]': !!item.icon }" grid="~ rows-2 gap-x-12 items-center"
  >
    <div v-if="item.icon" :class="item.icon" block size-28 row-span-full />
    <p flex-1 text="left neutral">
      {{ item.text }}
    </p>
    <p v-if="item.description" text="left f-xs" text-neutral-800>
      {{ item.description }}
    </p>
  </component>
</template>
