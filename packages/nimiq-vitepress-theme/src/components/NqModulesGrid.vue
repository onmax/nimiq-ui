<script setup lang="ts">
import type { NqCardProps } from './NqCard.vue'
import { withBase } from 'vitepress'
import { computed } from 'vue'
import { useVisibleModules } from '../composables/useVisibleModules'

const { visibleModules } = useVisibleModules()

const items = computed(() => {
  return visibleModules.value.map(({ text, icon, defaultPageLink, description }) => ({
    title: text,
    icon,
    href: withBase(defaultPageLink),
    iconClass: 'relative size-32',
    description,
  } satisfies NqCardProps))
})
</script>

<template>
  <NqGrid :cards="items" />
</template>
