<script lang="ts">
</script>

<script setup lang="ts">
import { computed, toRefs } from 'vue'

export type CardColor = 'green' | 'blue' | 'red' | 'gold' | 'orange'
export type CardLayout = 'column' | 'row'
export interface NqCardProps {
  icon?: string
  iconClass?: string
  bgColor?: CardColor
  href?: string
  title?: string
  description?: string
  label?: string
  layout?: CardLayout
}

const props = withDefaults(defineProps<NqCardProps>(), {
  layout: 'column',
})

const { bgColor, icon, href, iconClass, layout } = toRefs(props)

const hasLink = computed(() => !!href.value)

const iconClasses = computed(() => {
  if (!icon.value)
    return []

  const classes = [icon.value]

  if (iconClass.value) {
    classes.push(iconClass.value)
  }

  if (!iconClass.value) {
    classes.push('f-size-120/160')
    classes.push(layout.value === 'row' ? 'shrink-0' : 'absolute right--12')
  }
  else if (layout.value === 'row') {
    classes.push('shrink-0')
  }

  return classes
})

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
      layout === 'row' ? 'flex items-start gap-16' : '',
      { 'children:max-w-[max(50%,240px)]': bgColor },
    ]"
    p-16
  >
    <template v-if="layout === 'row'">
      <div v-if="icon" class="flex-shrink-0">
        <div :class="iconClasses" :style="`color: ${colors[bgColor!]}`" />
      </div>
      <div class="flex-1 flex flex-col">
        <span v-if="label" nq-label text-12 mb-4 text="neutral-700 data-inverted:white/50" data-inverted:mb-8>{{ label }}</span>
        <h2 v-if="title" font-semibold f-text="xl data-inverted:2xl" data-inverted:text-white v-html="title" />
        <p v-if="description" text="data-inverted:white/60" data-inverted:f-text-lg data-inverted:mt-4 v-html="description" />
      </div>
    </template>
    <template v-else>
      <div v-if="icon" :class="iconClasses" :style="`color: ${colors[bgColor!]}`" />
      <span v-if="label" nq-label text-12 mb-4 text="neutral-700 data-inverted:white/50" data-inverted:mb-8>{{ label }}</span>
      <h2 v-if="title" font-semibold f-text="xl data-inverted:2xl" data-inverted:text-white v-html="title" />
      <p v-if="description" text="data-inverted:white/60" data-inverted:f-text-lg data-inverted:mt-4 v-html="description" />
    </template>
  </component>
</template>
