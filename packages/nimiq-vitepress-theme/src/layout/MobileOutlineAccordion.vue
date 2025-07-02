<script setup lang="ts">
import { Accordion } from 'reka-ui/namespaced'
import { useSecondarySidebar } from '../composables/useSecondarySidebar'

const { headingTree, isHeadingActive, showOutline } = useSecondarySidebar()
</script>

<template>
  <div v-if="showOutline" w-full bg-neutral-100 border="b neutral-300" sticky top-0 z-40>
    <Accordion.Root type="single" collapsible>
      <Accordion.Item value="outline">
        <Accordion.Header>
          <Accordion.Trigger class="outline-accordion-trigger" w-full f-px-lg py-12 flex="~ items-center justify-between" bg-transparent border-none>
            <div flex="~ items-center gap-8" text-neutral-700 f-text-sm>
              <div i-tabler:align-left />
              On this page
            </div>
            <div i-nimiq:chevron-down reka-open:rotate-180 text-16 text-neutral-600 transition-transform />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content class="outline-accordion-content" of-hidden>
          <div f-px-lg pb-12>
            <ol list-none>
              <li v-for="h2 in headingTree" :key="h2.hashPath" flex="~ col">
                <a
                  :href="`#${h2.hashPath}`"
                  py-8 px-4 block rounded-6 transition-colors
                  :class="{ 'text-blue font-semibold bg-blue-50': isHeadingActive(h2.hashPath),
                            'text-neutral-800 hocus:bg-neutral-200': !isHeadingActive(h2.hashPath) }"
                >
                  {{ h2.text }}
                </a>
                <ol v-if="h2.items.length" list-none ml-16>
                  <li v-for="h3 in h2.items" :key="h3.hashPath">
                    <a
                      :href="`#${h3.hashPath}`"
                      py-6 px-4 block rounded-6 transition-colors f-text-sm
                      :class="{ 'text-blue font-semibold bg-blue-50': isHeadingActive(h3.hashPath),
                                'text-neutral-700 hocus:bg-neutral-200': !isHeadingActive(h3.hashPath) }"
                    >
                      {{ h3.text }}
                    </a>
                  </li>
                </ol>
              </li>
            </ol>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  </div>
</template>

<style scoped>
.outline-accordion-content[data-state='open'] {
  animation: slideDown 300ms ease-out;
}

.outline-accordion-content[data-state='closed'] {
  animation: slideUp 300ms ease-out;
}

@keyframes slideDown {
  from {
    height: 0;
  }
  to {
    height: var(--reka-accordion-content-height);
  }
}

@keyframes slideUp {
  from {
    height: var(--reka-accordion-content-height);
  }
  to {
    height: 0;
  }
}
</style>
