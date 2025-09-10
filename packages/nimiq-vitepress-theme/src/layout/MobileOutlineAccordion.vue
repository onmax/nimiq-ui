<script setup lang="ts">
import { Accordion } from 'reka-ui/namespaced'
import { useSecondarySidebar } from '../composables/useSecondarySidebar'

const { headingTree, isHeadingActive, showOutline } = useSecondarySidebar()
</script>

<template>
  <Accordion.Root v-if="showOutline" type="single" collapsible animate-accordion class="nq-raw">
    <Accordion.Item value="outline">
      <Accordion.Header>
        <Accordion.Trigger border="t-1 neutral-200" w-full f-px-sm py-12 flex="~ items-center justify-between" bg-transparent border-none>
          <div flex="~ items-center gap-8" text-neutral-700 f-text-sm>
            <div i-tabler:align-left />
            On this page
          </div>
          <div i-nimiq:chevron-down reka-open:rotate-180 mr-8 text-12 text-neutral-600 transition-transform />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content animate-accordion of-hidden>
        <div f-px-sm pb-12 f-text-sm>
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
</template>
