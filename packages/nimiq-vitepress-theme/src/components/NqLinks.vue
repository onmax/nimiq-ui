<script setup lang="ts">
import { computed } from 'vue'

interface NqLinksItem {
  label: string
  href: string
  icon?: string
  variant?: `nq-pill-${'blue' | 'gold' | 'green' | 'secondary' | 'tertiary' | 'orange'}`
  title?: string
}

const props = defineProps<{ item?: NqLinksItem, items?: NqLinksItem[] }>()

const items = computed(() => props.items?.length ? props.items : props.item ? [props.item] : [])
</script>

<template>
  <div flex="~ gap-8" class="nq-raw">
    <a v-for="{ label, href, icon, title = label, variant = 'nq-pill-secondary' } in items" :key="href" :href :title target="_blank" rel="noopener noreferrer" nq-arrow f-text-xs mx-0 font-semibold z-100 :class="variant">
      <div v-if="icon" :class="icon" mr-4 />
      {{ label }}
    </a>
  </div>
</template>
