<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import CodeBlock from './CodeBlock.vue'
import ShikiBlock from './ShikiBlock.vue'

const gradients = ['Neutral', 'Blue', 'Green', 'Red', 'Orange', 'Gold']

const activeGradient = ref<{ color: string, variant: 'default' | 'darkened' | 'hoverable' }>()

function setActiveGradient(gradient: string, variant: 'default' | 'darkened' | 'hoverable' = 'default') {
  activeGradient.value = { color: gradient, variant }
}

const cssVar = computed(() => {
  const variant = activeGradient.value?.variant
  if (variant === 'hoverable') {
    return `background-image: var(--colors-${activeGradient.value?.color.toLowerCase()}-gradient)`
  }
  return `background-image: var(--colors-${activeGradient.value?.color.toLowerCase()}-gradient${variant === 'darkened' ? '-darkened' : ''})`
})

const tailwind = computed(() => {
  const color = activeGradient.value?.color.toLowerCase()
  const variant = activeGradient.value?.variant

  if (variant === 'hoverable') {
    return `<div class="bg-hoverable-${color}" />`
  }
  else if (variant === 'darkened') {
    return `<div class="bg-gradient-${color}-darkened" />`
  }
  else {
    return `<div class="bg-gradient-${color}" />`
  }
})

const card = ref<HTMLDivElement>()

const css = ref<string>()
watch(activeGradient, async () => {
  await nextTick()
  const colorCard = card.value
  if (!colorCard)
    return 'No CSS available'
  const computedStyle = getComputedStyle(colorCard)?.backgroundImage || ''
  css.value = `background-image: ${computedStyle}`
})
</script>

<template>
  <div grid="~ cols-[auto_1fr_1fr] items-center gap-16" f-my-md class="nq-raw" max-w-800 relative>
    <div />
    <span nq-label text-center>Default</span>
    <span nq-label text-center>Hoverable</span>
    <div v-for="gradient in gradients" :key="gradient" contents>
      <p text="neutral-700 right" font-semibold f-text-xs sm:pr-24>
        {{ gradient }}
      </p>
      <button :class="`bg-gradient-${gradient.toLowerCase()}`" group @click="setActiveGradient(gradient, 'default')">
        <span group-hocus:op-100>
          bg-gradient-{{ gradient.toLowerCase() }}
        </span>
      </button>
      <button
        :class="`nq-hoverable-${gradient.toLowerCase()}`" relative group
        @click="setActiveGradient(gradient, 'hoverable')"
      >
        <span group-hocus:op-100>
          nq-hoverable-{{ gradient.toLowerCase() }}
        </span>
      </button>
    </div>
  </div>

  <ClientOnly>
    <Teleport defer to="#widget">
      <div v-if="activeGradient">
        <template v-if="activeGradient.variant === 'hoverable'">
          <span block nq-label text-10>Tailwind / UnoCSS</span>
          <ShikiBlock :code="tailwind" lang="html" />
        </template>

        <template v-else>
          <h3 font-mono>
            {{ activeGradient.color }}
          </h3>
          <div
            id="color-card" ref="card" size-48 w-full rounded-6 :style="cssVar"
            outline="1 ~ offset--1 neutral/10 dark:white/10"
          />

          <span block nq-label text-10 f-mt-md mb-2>CSS</span>
          <CodeBlock :code="css!" text-wrap h-max />

          <span block nq-label text-10 f-mt-md mb-2>CSS Variable</span>
          <CodeBlock h-max :code="`${cssVar}; /* Defined in nq-colors layer */`" text-wrap />

          <span block nq-label text-10 f-mt-md mb-2>Tailwind / UnoCSS</span>
          <ShikiBlock :code="tailwind" lang="html" />
        </template>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<style scoped>
button {
  --uno: 'bg-transparent relative max-h-48 aspect-square w-full f-rounded-md outline outline-1.5 outline-offset--1.5 outline-white/10';

  span {
    --uno: 'absolute bottom-2 left-2 text-white text-10 op-0 transition-opacity duration-200 whitespace-nowrap z-10 font-mono font-semibold';
  }
}
</style>
