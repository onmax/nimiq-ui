<script setup lang="ts">
import { computed } from 'vue'

const { icon, href, title, description } = defineProps<{
  icon?: string
  href?: string
  title?: string
  description?: string
}>()

const hasLink = computed(() => !!href)
</script>

<template>
  <component
    :is="hasLink ? 'a' : 'div'"
    :href class="nq-raw" group bg-neutral-300 relative f-p-xl
    flex="~ items-center col justify-center"
    data-card="large"
    :target="hasLink && href?.startsWith('http') ? '_blank' : undefined"
    :class="{ 'nq-hoverable': hasLink, 'nq-card': !hasLink }"
  >
    <div :class="icon" f-size="~ max-64 min-80" mx-auto f-mb-lg op="70 group-hocus:100" transition-opacity />
      <h2 font-semibold f-text-2xl text-center>{{ title }}</h2>
      <p f-text-lg text-center text-neutral-800 f-mt-xs>{{ description }}</p>
  </component>
</template>
