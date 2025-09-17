<script setup lang="ts">
import type { NimiqVitepressThemeConfig } from '../types'
import { Tooltip } from 'reka-ui/namespaced'
import { useData, withBase } from 'vitepress'

const { size = 'md' } = defineProps<{
  size?: 'sm' | 'md'
}>()

const { theme } = useData<NimiqVitepressThemeConfig>()
</script>

<template>
  <nav>
    <Tooltip.Provider :delay-duration="700" :skip-delay-duration="300">
      <ul flex="~">
        <li v-for="({ icon, link, label }) in theme.links" :key="link">
          <Tooltip.Root>
            <Tooltip.Trigger
              as="a" :href="withBase(link)" target="_blank" rel="noopener noreferrer" transition-colors
              un-text="neutral-900 hocus:neutral" :class="{ 'text-18 p-8': size === 'md',
                                                            'text-16 p-6': size === 'sm' }" inline-flex="~ items-center justify-center" rounded-6
              bg="transparent hocus:neutral-200" :aria-label="label"
            >
              <div :class="icon" />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                :collision-padding="4" side="top" bg-neutral-0 f-px-2xs py-3 rounded-4
                outline="1.5 offset--1.5 neutral/8" shadow z-1000 font-semibold text="neutral-700 f-xs"
              >
                {{ label }}
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </li>
      </ul>
    </Tooltip.Provider>
  </nav>
</template>
