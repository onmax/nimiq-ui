<script setup lang="ts">
import { computed } from 'vue';

const { icon, href } = defineProps<{
  icon?: string
  href?: string
}>()

const hasLink = computed(() => !!href)
</script>

<template>
  <component :is="hasLink ? 'a' : 'div'" :href group class="vp-raw nq-raw" data-card="large"
    f-mt-md bg-neutral-300 relative flex="~ items-center col justify-center" f-p-xl
    :target="hasLink && href?.startsWith('http') ? '_blank' : undefined"
    :class="{ 'nq-hoverable': hasLink, 'nq-card': !hasLink }">
    <div :class="icon" f-size="~ max-64 min-80" mx-auto f-mb-lg op="70 group-hocus:100" transition-opacity />
    <slot />
  </component>
</template>

<style scoped>
:deep(.nq-label) {
  --uno: 'text-12 mb-4 text-center text-neutral-700';
}

:deep(:where(h2, h3, h4, h5, h6):not(.nq-label)) {
  --uno: 'font-semibold f-text-2xl text-center';
}

:deep(p) {
  --uno: 'f-text-lg text-center text-neutral-800 f-mt-xs';
}
</style>
