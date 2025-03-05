<script setup lang="ts">
import { computed, ref, Teleport, nextTick, watch } from 'vue';
import CodeBlock from './CodeBlock.vue';
import ShikiBlock from './ShikiBlock.vue';

const gradients = ['Neutral', 'Blue', 'Green', 'Red', 'Orange', 'Gold']

const activeGradient = ref<{color: string, darkened:boolean}>()
function getBg(color: string, darkened?: boolean) {
  return { backgroundImage: `var(--nq-${color.toLowerCase()}-gradient${darkened ? '-darkened' : ''})` }
}

function setActiveGradient(gradient: string, darkened?: boolean) {
  activeGradient.value = { color: gradient, darkened: darkened || false }
}

const cssVar = computed(() => `background-image: var(--nq-${activeGradient.value?.color.toLowerCase()}-gradient${activeGradient.value?.darkened ? '-darkened' : ''})`)
const tailwind = computed(() => {
  const className = `bg-gradient-${activeGradient.value?.color.toLowerCase()} hover:bg-gradient-${activeGradient.value?.color.toLowerCase()}-darkened transition-colors`
  return `<div class="${className}" />`
})

const card= ref<HTMLDivElement>()

const css = ref<string>()
watch(activeGradient, async () => {
  await nextTick()
  const colorCard = card.value
  if (!colorCard) return 'No CSS available'
  const computedStyle = getComputedStyle(colorCard)?.backgroundImage || ''
  css.value = `background-image: ${computedStyle}`
})
</script>

<template>
  <div grid="~ cols-[auto_1fr_1fr] items-center gap-16" f-my-md class="nq-raw" max-w-800 relative>
    <div></div>
    <span nq-label text-center>Default</span>
    <span nq-label text-center>Darkened</span>
    <div v-for="gradient in gradients" :key="gradient" contents>
      <p text="neutral-700 right" font-semibold f-text-xs sm:pr-24>{{ gradient }}</p>
      <button bg-transparent  :style="getBg(`${gradient}`)" max-h-48 aspect-square w-full rounded="4 md:6"
        outline="~ 1 offset--1 black/10 dark:white/10" @click="setActiveGradient(gradient)" />
      <button bg-transparent :style="getBg(gradient, true)" max-h-48 aspect-square w-full rounded="4 md:6"
        outline="~ 1 offset--1 black/10 dark:white/10" @click="setActiveGradient(gradient, true)" />
    </div>
  </div>

  <ClientOnly>
    <Teleport defer to="#widget">
      <div v-if="activeGradient">
        <div size-48 w-full rounded-6 :style="cssVar" ref="card" outline="1 ~ offset--1 black/10 dark:white/10" id="color-card"></div>

        <span block nq-label text-10 f-mt-md mb-2>CSS</span>
        <CodeBlock :code="css!" text-wrap />

        <span block nq-label text-10 f-mt-md mb-2>CSS Variable</span>
        <CodeBlock :code="`${cssVar}; /* Defined in nq-colors layer */`" text-wrap />

        <span block nq-label text-10 f-mt-md mb-2>Tailwind / UnoCSS</span>
        <ShikiBlock :code="tailwind" lang="html" />
      </div>
    </Teleport>
  </ClientOnly>
</template>
