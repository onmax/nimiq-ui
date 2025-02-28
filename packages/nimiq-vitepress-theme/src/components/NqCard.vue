<script setup lang="ts">
import { computed } from 'vue';

export type CardColor = 'green' | 'blue' | 'red' | 'gold' | 'orange'

const { bgColor, icon, href } = defineProps<{
  icon?: string
  bgColor?: CardColor
  href?: string
}>()

const hasLink = computed(() => !!href)

const colors: Partial<Record<CardColor, string>> = { blue: '#0E65C9', green: '#1DA186', gold: '#ffffffaa' }
</script>

<template>
  <component :is="hasLink ? 'a' : 'div'" :href group :data-inverted="bgColor ? '' : undefined" class="vp-raw nq-raw"
    f-mt-md relative :style="`background-image: ${bgColor ? `var(--nq-${bgColor}-gradient)` : ''}`" :data-card="bgColor ? 'colored' : 'default'"
    :target="hasLink && href?.startsWith('http') ? '_blank' : undefined"
    :class="{ 'nq-hoverable': hasLink, 'nq-card': !hasLink, 'children:max-w-[max(50%,240px)]': bgColor, 'bg-neutral-300': !bgColor }">
    <div :class="icon" f-size="~ max-160 min-120" absolute right--12 :style="`color: ${colors[bgColor!]}`" />
    <slot />
  </component>
</template>

<style scoped>
:deep(.nq-label) {
  --uno: 'text-12 mb-4 text-neutral-700';
}

:deep(:where(h2, h3, h4, h5, h6):not(.nq-label)) {
  --uno: 'font-semibold f-text-xl ';
}


[data-inverted] :deep(*) {
  &.nq-label {
    --uno: 'text-white/50 mb-8';
  }

  &:where(h2, h3, h4, h5, h6):not(.nq-label) {
    --uno: 'text-white f-text-2xl';
  }

  &:where(p) {
    --uno: 'text-white/60 f-text-lg f-mt-4';
  }
}
</style>
