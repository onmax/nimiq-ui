<script setup lang="ts">
import Color from 'colorjs.io'
import { computed, nextTick, ref, watch } from 'vue'
import CodeBlock from './CodeBlock.vue'

const colors = ['Neutral', 'Blue', 'Green', 'Red', 'Orange', 'Gold', 'Purple']

const variants = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1100]

function getBg(color: string) {
  return { backgroundColor: `var(--colors-${color.toLowerCase()})` }
}

const activeColor = ref<string>()
const activeColorFormats = ref<Record<'rgb' | 'tailwind' | 'hsl' | 'oklch' | 'oklab', string>>()

watch(activeColor, async () => {
  await nextTick()
  setColorFormats()
})

function setColorFormats() {
  const colorCard = document.querySelector<HTMLDivElement>('#widget .color-card')
  if (!colorCard)
    return ''
  const computedStyle = getComputedStyle(colorCard)?.backgroundColor || ''

  const colorInstance = new Color(computedStyle)
  const rgbValues = colorInstance.to('srgb')
  activeColorFormats.value = {
    rgb: `rgb(${Math.round(rgbValues.r * 255)}, ${Math.round(rgbValues.g * 255)}, ${Math.round(rgbValues.b * 255)})`,
    tailwind: `bg-${activeColor.value!.toLowerCase()}`,
    hsl: colorInstance.to('hsl').toString(),
    oklch: colorInstance.to('oklch').toString(),
    oklab: colorInstance.to('oklab').toString(),
  }
}

const colorCodes = computed(() => {
  return [
    { label: 'rgb', text: activeColorFormats.value?.rgb },
    { label: 'tailwind / unocss', text: activeColorFormats.value?.tailwind },
    { label: 'hsl', text: activeColorFormats.value?.hsl },
    { label: 'oklch', text: activeColorFormats.value?.oklch },
    { label: 'oklab', text: activeColorFormats.value?.oklab },
  ]
})
</script>

<template>
  <div grid="~ cols-[auto_minmax(0,_1fr)] items-center gap-16" f-my-md class="nq-raw" max-w-800 relative mb-32>
    <!-- Top-left empty cell -->
    <div sticky top-0 z-9 bg-neutral-0 h-1lh f-py-xs />

    <!-- Top row: variant labels -->
    <div
      sticky top-0 z-9 f-py-xs grid="~ col-start-2 cols-12 justify-items-center gap-6 sm:gap-16" bg-neutral-0
      font-medium max-sm:children="rotate-180 [writing-mode:vertical-lr]" max-sm:py-4
    >
      <div v-for="v in variants" :key="v" nq-label f-text-xs>
        {{ v }}
      </div>
      <div absolute nq-label right--20 top--4 text-11 rotate--45>
        Default
      </div>
    </div>

    <!-- Rows for each color -->
    <div v-for="color in colors" :key="color" contents>
      <!-- Color name in first column -->
      <p text="neutral-700 right" font-semibold f-text-xs sm:pr-24>
        {{ color }}
      </p>

      <div grid="~ cols-12 gap-6 sm:gap-16">
        <button
          v-for="c in variants.map(v => `${color}-${v}`).concat([color])" :key="c" :style="getBg(c)"
          class="color-card" @click="activeColor = `${c}`"
        />
      </div>
    </div>
  </div>

  <ClientOnly>
    <Teleport defer to="#widget">
      <div v-if="activeColor">
        <h3 font-mono>
          {{ activeColor }}
        </h3>
        <div size-48 :style="getBg(activeColor)" class="color-card" />
        <ul f-mt-sm>
          <li v-for="({ label, text }) in colorCodes" :key="label" f-mt-xs>
            <span nq-label text-10>
              {{ label }}
            </span>
            <CodeBlock :code="text!" />
          </li>
        </ul>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<style scoped>
.color-card {
  --uno: 'outline-1 outline-solid outline-offset--1 outline-neutral/10';
  --uno: 'aspect-square w-full rounded-4 md:rounded-6';
}
</style>
