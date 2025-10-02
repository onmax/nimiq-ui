<script setup lang="ts">
import { useSecondarySidebar } from '../composables/useSecondarySidebar'
import OutlineActions from './OutlineActions.vue'

const { withWidget = true } = defineProps<{ withWidget?: boolean }>()

const { headingTree, isHeadingActive, showOutline, showWidget } = useSecondarySidebar()
</script>

<template>
  <div
    f-text-xs sticky f="$h $h-min-60 $h-max-88" h-screen f-px-sm of-y-auto f-pb-xs flex="~ col"
  >
    <div v-if="withWidget && showWidget" id="widget" max-w-full h-max />

    <div v-if="showOutline" text-neutral-700 flex="~ gap-8 items-center" :class="{ 'f-mt-md': withWidget && showWidget }">
      <div i-tabler:align-left />
      On this page
    </div>
    <ol v-if="showOutline" list-none f-mt-xs text-neutral-800>
      <li v-for="h2 in headingTree" :key="h2.hashPath" flex="~ col" pb-4>
        <a :href="`#${h2.hashPath}`" px-6 py-4 :class="{ 'text-blue font-semibold': isHeadingActive(h2.hashPath) }">
          {{ h2.text }}
        </a>
        <ol v-if="h2.items.length">
          <li v-for="h3 in h2.items" :key="h3.hashPath" flex="~ col">
            <a
              :href="`#${h3.hashPath}`" font-normal p-4 pl-14
              :class="{ 'text-blue font-semibold': isHeadingActive(h3.hashPath) }"
            >
              {{ h3.text }}
            </a>
          </li>
        </ol>
      </li>
    </ol>

    <OutlineActions />
  </div>
</template>
