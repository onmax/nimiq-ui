<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

const {
  title: userTitle,
  description: userDescription,
  h1 = true,
  align,
} = defineProps<{
  title: string
  description: string
  label?: string
  h1?: boolean
  align?: 'center' | 'left'
}>()

const { frontmatter } = useData()

const title = computed(() => userTitle || frontmatter.value.title)
const description = computed(() => userDescription || frontmatter.value.description)
const computedAlign = computed(() => {
  if (align)
    return align
  return frontmatter.value.layout === 'home' ? 'center' : 'left'
})
</script>

<template>
  <div
    flex="~ col" nq-component="headline"
    :class="{ 'items-start': computedAlign === 'left',
              'items-center': computedAlign === 'center',
              'f-mt-2xl': !h1 }" class="nq-raw"
    f-mb-lg
  >
    <div
      v-if="label" outline="~ 1.5 neutral-600" bg="neutral/3" px-12 py-6 rounded-full nq-label
      :class="computedAlign === 'left' ? 'text-left' : 'text-center'"
    >
      {{ label }}
    </div>
    <component
      :is="h1 ? 'h1' : 'h2'" :class="[{
                                        'f-mt-xs': label,
                                      },
                                      h1 ? 'f-text-4xl font-bold' : 'f-text-3xl font-semibold',
                                      computedAlign === 'left' ? 'text-left' : 'text-center',
      ]" text-neutral mb-0
    >
      {{ title }}
    </component>
    <p
      :class="[{
        'mt-0 f-text-2xl': h1,
        'f-mt-2xs f-text-xl': !h1,
      }, computedAlign === 'left' ? 'text-left' : 'text-center']"
    >
      {{ description }}
    </p>
  </div>
</template>
