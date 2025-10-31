<script setup lang="ts">
import type { NqCardProps } from './NqCard.vue'
import NqCard from './NqCard.vue'
import NqLargeCard from './NqLargeCard.vue'

const { cards = [], largeCards = false } = defineProps<{ cards?: NqCardInGrid[], largeCards?: boolean }>()

type CardSpan = 'full' | 'half' | 'default'
type NqCardInGrid = NqCardProps & { span?: CardSpan }

function getSpan({ span, bgColor }: NqCardInGrid): CardSpan | undefined {
  if (span === undefined && bgColor)
    return 'half'
  return span || 'default'
}
</script>

<template>
  <ul v-if="cards.length > 0 || $slots.default" grid="~ cols-2 md:cols-6 gap-8 md:gap-16" class="nq-grid nq-raw" f-my-md>
    <slot>
      <li v-for="(card, index) in cards" :key="index" :data-span="getSpan(card)">
        <component :is="largeCards ? NqLargeCard : NqCard" v-bind="card" />
      </li>
    </slot>
  </ul>
</template>

<style scoped>
ul.nq-grid {
  [data-span='full'] {
    --uno: 'md:col-span-6';
  }

  [data-span='half'] {
    --uno: 'md:col-span-3';
  }

  [data-span='default'] {
    --uno: 'col-span-2';
  }

  li {
    --uno: 'mt-0 flex';
  }
}

:global(ul.nq-grid li > *) {
  --uno: 'flex-1';
}
</style>
