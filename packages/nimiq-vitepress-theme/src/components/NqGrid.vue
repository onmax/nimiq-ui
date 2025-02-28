<script setup lang="ts">
// defineProps<{ test: string }>()
</script>

<template>
  <div grid="~ cols-6 gap-16" class="nq-grid">
    <slot />
  </div>
</template>

<style scoped>
:global(.nq-grid [data-card="colored"]) {
  --uno: 'col-span-3';
}

:global(.nq-grid [data-card="default"]) {
  --uno: 'col-span-2';
}

:global(.nq-grid [data-card="large"]) {
  --uno: 'col-span-2';
}

:global(.nq-grid [data-card]) {
  --uno: 'mt-0';
}
</style>
