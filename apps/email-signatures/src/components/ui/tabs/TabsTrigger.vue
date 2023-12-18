<script setup lang="ts">
import { TabsTrigger, type TabsTriggerProps } from 'radix-vue'
import { cn } from '../../../lib/utils'

const props = defineProps<TabsTriggerProps & { class?: string, notification?: boolean }>()
</script>

<template>
  <TabsTrigger
    v-bind="props"
    :class="
      cn(
        'inline-flex relative items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        props.class,
      )
    "
  >
    <span class="absolute inline-flex w-2 h-2 rounded-full opacity-75 top-1 right-2 animate-ping bg-slate-400" v-if="notification"></span>

    <slot />
  </TabsTrigger>
</template>
