<script setup lang="ts">
import type { NqCardProps } from './NqCard.vue'

type CardSpan = 'full' | 'half' | 'default'
type NqCardInGrid = NqCardProps & { span?: CardSpan }

const { cards } = defineProps<{ cards?: NqCardInGrid[] }>()

function getSpan({ span, bgColor }: NqCardInGrid): CardSpan | undefined {
  if (span === undefined && bgColor)
    return 'half'
  return span
}
</script>

<template>
  <ul grid="~ cols-6 gap-16" class="nq-grid nq-raw">
    <slot>
      <li v-for="(card, index) in cards" :key="index" data-card="default" :data-span="getSpan(card)">
        <NqCard v-bind="card" />
      </li>
    </slot>
  </ul>
</template>

<style>
.nq-grid {
  [data-card='colored'] {
    --uno: 'col-span-3';
  }

  [data-card='default'] {
    --uno: 'col-span-2';
  }

  [data-card='half'] {
    --uno: 'col-span-2';
  }

  [data-card][data-span='full'] {
    --uno: 'col-span-6';
  }

  [data-card][data-span='half'] {
    --uno: 'col-span-3';
  }
  [data-card] {
    --uno: 'mt-0';
  }
}
</style>
