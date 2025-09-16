<script setup lang="ts">
import type { NimiqVitepressThemeConfig } from '../types'
import { Tooltip } from 'reka-ui/namespaced'
import { useData, withBase } from 'vitepress'

const { theme } = useData<NimiqVitepressThemeConfig>()
</script>

<template>
  <nav>
    <Tooltip.Provider :delay-duration="700" :skip-delay-duration="300">
      <ul flex="~" f-py-xs>
        <li v-for="({ icon, link, label }) in theme.links" :key="link">
          <Tooltip.Root>
            <Tooltip.Trigger
              as="a" :href="withBase(link)" target="_blank" rel="noopener noreferrer" transition-colors
              un-text="18 neutral-900 hocus:neutral" inline-flex="~ items-center justify-center" rounded-4
              bg="transparent hocus:neutral-200" f-p-2xs :aria-label="label"
            >
              <div :class="icon" />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="top" class="tooltip-content" bg-neutral-0 f-px-2xs py-3 rounded-4
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

<style>
/* Base animation properties */
.tooltip-content {
  animation-duration: 0.3s !important;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1) !important;
  will-change: transform, opacity;
}

/* Animation for all sides */
.tooltip-content[data-state='delayed-open'][data-side='top'] {
  animation-name: slideDownAndFade !important;
}

.tooltip-content[data-state='delayed-open'][data-side='bottom'] {
  animation-name: slideUpAndFade !important;
}

@keyframes slideDownAndFade {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUpAndFade {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
