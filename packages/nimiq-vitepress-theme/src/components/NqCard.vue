<script lang="ts">
</script>

<script setup lang="ts">
import { computed } from 'vue'

export type CardColor = 'green' | 'blue' | 'red' | 'gold' | 'orange'
export interface NqCardProps {
  icon?: string
  iconClass?: string
  bgColor?: CardColor
  href?: string
  title?: string
  description?: string
  label?: string
}

const { bgColor, icon, href, iconClass } = defineProps<NqCardProps>()

const hasLink = computed(() => !!href)

const colors: Partial<Record<CardColor, string>> = { blue: '#0E65C9', green: '#1DA186', gold: '#ffffffaa' }
</script>

<template>
  <component
    :is="hasLink ? 'a' : 'div'"
    :href class="nq-raw" group relative
    :style="`background-image: ${bgColor ? `var(--colors-${bgColor}-gradient)` : ''}`"
    :data-inverted="bgColor ? '' : undefined"
    :data-card="bgColor ? 'colored' : 'default'"
    :target="hasLink && href?.startsWith('http') ? '_blank' : undefined"
    :class="[
      hasLink ? 'nq-hoverable' : 'nq-card',
      { 'children:max-w-[max(50%,240px)]': bgColor },
    ]"
  >
    <div v-if="icon" :class="[`${icon} ${iconClass}`, iconClass ? iconClass : 'f-size-120/160 absolute right--12']" :style="`color: ${colors[bgColor!]}`" />
    <span nq-label text-12 mb-4 text="neutral-700 data-inverted:white/50" data-inverted:mb-8>{{ label }}</span>
    <h2 font-semibold f-text="xl data-inverted:2xl" data-inverted:text-white v-html="title" />
    <p text="data-inverted:white/60" data-inverted:f-text-lg data-inverted:mt-4 v-html="description" />
  </component>
</template>
