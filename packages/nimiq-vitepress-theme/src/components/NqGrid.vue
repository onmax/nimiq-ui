<script setup lang="ts">
const { cards } = defineProps<{
  cards?: {
    title?: string
    description?: string
    label?: string
  }[]
}>()
</script>

<template>
  <ul grid="~ cols-6 gap-16" class="nq-grid nq-raw">
    <slot>
      <li v-for="(card, index) in cards" :key="index" data-card="default">
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

  [data-card='large'] {
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
