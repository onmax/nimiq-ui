<script setup lang="ts">
import { useSecondarySidebar } from '../composables/useSecondarySidebar'

const { withWidget = true } = defineProps<{ withWidget?: boolean }>()

const { headingTree, isHeadingActive, showOutline, showWidget } = useSecondarySidebar()
</script>

<template>
  <div
    f-text-xs sticky f="$h $h-min-60 $h-max-88" h="[calc(100vh-var(--f-h))]" f-top-xl f-px-sm
    w="[calc(var(--nq-sidebar-width)+24px)]" of-y-auto f-pb-xs
  >
    <div v-if="showOutline" text-neutral-700 flex="~ gap-8 items-center">
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
    <div v-if="withWidget && showWidget" id="widget" max-w-full :class="{ 'f-mt-md': showOutline }" h-max />
  </div>
</template>
