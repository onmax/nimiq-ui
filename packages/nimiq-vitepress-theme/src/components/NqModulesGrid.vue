<script setup lang="ts">
import type { NimiqVitepressThemeConfig } from '../types'
import type { NqCardProps } from './NqCard.vue'
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'

const { theme } = useData<NimiqVitepressThemeConfig>()

const items = computed(() => {
  return theme.value.modules.map(({ text, icon, defaultPageLink, description }) => ({
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
