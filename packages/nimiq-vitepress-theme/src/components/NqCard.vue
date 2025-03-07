<script lang="ts">
</script>

<script setup lang="ts">
import { computed } from 'vue'

export type CardColor = 'green' | 'blue' | 'red' | 'gold' | 'orange'
export interface NqCardProps {
  icon?: string
  bgColor?: CardColor
  href?: string
  title?: string
  description?: string
  label?: string
}

const { bgColor, icon, href } = defineProps<NqCardProps>()

const hasLink = computed(() => !!href)

const colors: Partial<Record<CardColor, string>> = { blue: '#0E65C9', green: '#1DA186', gold: '#ffffffaa' }
</script>

<template>
  <component
    :is="hasLink ? 'a' : 'div'" :href group :data-inverted="bgColor ? '' : undefined" class="nq-raw"
    f-mt-md relative :style="`background-image: ${bgColor ? `var(--nq-${bgColor}-gradient)` : ''}`" :data-card="bgColor ? 'colored' : 'default'"
    :target="hasLink && href?.startsWith('http') ? '_blank' : undefined"
    :class="{ 'nq-hoverable': hasLink, 'nq-card': !hasLink, 'children:max-w-[max(50%,240px)]': bgColor, 'bg-neutral-300': !bgColor }"
  >
    <div v-if="icon" :class="icon" f-size="~ max-160 min-120" absolute right--12 :style="`color: ${colors[bgColor!]}`" />
    <slot>
      <span nq-label>{{ label }}</span>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </slot>
  </component>
</template>

<style>
@layer nq-vp {
  [data-card] {
    .nq-label {
      --uno: 'text-12 mb-4 text-neutral-700';
    }

    :where(h2, h3, h4, h5, h6):not(.nq-label) {
      --uno: 'font-semibold f-text-xl ';
    }

    [data-inverted] * {
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
  }
}
</style>
