<script setup lang="ts">
import { addCollection, getIcon, Icon, listIcons } from '@iconify/vue'
import { createReusableTemplate, useLocalStorage } from '@vueuse/core'
import { buildIcon } from 'iconify-icon'
import nimiqIcons from 'nimiq-icons/icons.json'
import { computed, ref, watchEffect } from 'vue'
import CodeBlock from './CodeBlock.vue'
import ShikiBlock from './ShikiBlock.vue'

enum Variant {
  Regular = 'regular',
  Duotone = 'duotone',
  Logos = 'logos',
  // Flags = 'flags',
}

const variants = ref<Record<Variant, string[]>>({
  [Variant.Regular]: [],
  [Variant.Duotone]: [],
  [Variant.Logos]: [],
  // [Variant.Flags]: [],
})
const icons = ref<string[]>([])

const lastUpdated = ref<Date>(new Date(Date.now()))
const timeBuild = ref('')

const initialIcon = new URLSearchParams(globalThis.location?.search).get('icon') || ''

addCollection(nimiqIcons)
// addCollection({ ...json, icons: Object.entries(json.icons).filter(([key]) => key.startsWith('logos-nimiq-full-white-vertical')).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}) })

icons.value = listIcons()
variants.value[Variant.Regular] = listIcons().filter(icon => icon.startsWith('nimiq') && !icon.startsWith(`nimiq:${Variant.Duotone}-`) && !icon.startsWith(`nimiq:${Variant.Logos}-`))
variants.value[Variant.Duotone] = listIcons().filter(icon => icon.startsWith(`nimiq:${Variant.Duotone}-`))
variants.value[Variant.Logos] = listIcons().filter(icon => icon.startsWith(`nimiq:${Variant.Logos}-`))
// variants.value[Variant.Flags] = listIcons().filter(icon => icon.startsWith(`nimiq:${Variant.Flags}-`))

lastUpdated.value = new Date(nimiqIcons.lastModified * 1000)
timeBuild.value = new Intl.DateTimeFormat('en', { dateStyle: 'short', timeStyle: 'short' }).format(lastUpdated.value)

const logosMono = computed(() => variants.value[Variant.Logos].filter(icon => icon.endsWith('-mono')))

const [DefineGrid, ReuseGrid] = createReusableTemplate<{ icons: string[], variant: string, classes: string }>()

const selectedIcon = ref<string>(initialIcon)
const missingLogoVariant = ref(false)

watchEffect(() => {
  const params = new URLSearchParams(globalThis.location?.search)
  if (selectedIcon.value)
    params.set('icon', selectedIcon.value)
  else
    params.delete('icon')
  globalThis.history?.replaceState({}, '', `${globalThis.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`)
})

const colors = ['neutral', 'blue', 'green', 'gold', 'red', 'orange', 'purple'] as const
type Color = typeof colors[number]
const activeColor = useLocalStorage<Color>('icon-color', 'neutral')

const svgIcon = computed(() => {
  const data = getIcon(selectedIcon.value)
  if (!data)
    return
  const built = buildIcon(data, { height: 32 })
  if (!built)
    return
  const xlink = built.body.includes('xlink:') ? ' xmlns:xlink="http://www.w3.org/1999/xlink"' : ''
  return `<svg xmlns="http://www.w3.org/2000/svg"${xlink} ${Object.entries(built.attributes).map(([k, v]) => `${k}="${v}"`).join(' ')}>${built.body}</svg>`.replaceAll('currentColor', activeColor.value)
})

const svgIconDataUrl = computed(() => {
  const svg = svgIcon.value
  if (!svg)
    return 'no icon'
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
})

const baseLogo = computed(() => selectedIcon.value.replace(/(?:white-)?(horizontal|vertical)?-mono/, '$1'))
const isLogo = computed(() => selectedIcon.value.startsWith('nimiq:logos'))
const isMono = computed(() => selectedIcon.value.endsWith('-mono'))
const isWhite = computed(() => selectedIcon.value.includes('-white-'))
const tailwindCode = computed(() => {
  const className = (!isLogo.value || (isLogo.value && isMono.value)) ? `\n\tclass="text-${activeColor.value}"` : ''
  return `<div\n\ti-${selectedIcon.value}\n\taria-hidden${className}\n/>`
})
const hasWhite = computed(() => {
  return getIcon(`${baseLogo.value}-white-horizontal`) || getIcon(`${baseLogo.value}-white-vertical`)
})

// From mono -> logo -> logo-white
function rotateLogoIcon() {
  missingLogoVariant.value = false

  if (isMono.value) {
    selectedIcon.value = baseLogo.value
    return
  }

  if (!isWhite.value && selectedIcon.value.match(/(horizontal|vertical)$/)) {
    const whiteVersion = selectedIcon.value.replace(/(horizontal|vertical)$/, 'white-$1')
    if (!hasWhite.value) {
      selectedIcon.value = whiteVersion
      return
    }
  }

  selectedIcon.value = `${selectedIcon.value}-mono`
}

function selectColor(c: Color) {
  if (isLogo.value && !isMono.value) {
    selectedIcon.value = `${selectedIcon.value}-mono`
  }
  activeColor.value = c
}
</script>

<template>
  <DefineGrid v-slot="{ icons: iconsVariant, variant, classes }">
    <span block f-mt-xl f-text-2xs text="$c" nq-label op="90 dark:70" :style="`--c: var(--colors-${activeColor}-1100)`">
      {{ variant }}
    </span>

    <ul pl-0 flex flex-wrap select-none text-2xl ml--8 f-mt-xs>
      <li v-for="icon in iconsVariant" :key="icon" flex>
        <button
          w-max bg-transparent op="70 dark:60 hocus:100" transition-opacity :style="`--c: var(--colors-${activeColor})`"
          @click="() => selectedIcon = icon"
        >
          <Icon
            :icon text="$c" :class="[classes, { 'w-auto !h-24': icon.includes('horizontal'),
                                                'animate-spin': icon === 'nimiq:spinner' }]"
          />
        </button>
      </li>
    </ul>
  </DefineGrid>

  <div class="nq-raw">
    <ReuseGrid :icons="variants.regular" variant="regular" classes="w-20 h-28 m-8" />
    <ReuseGrid :icons="variants.duotone" variant="Duotone" classes="w-32 h-40 m-10" />
    <ReuseGrid :icons="logosMono" variant="logos mono" classes="w-32 h-40 m-10" />
    <!-- <ReuseGrid :icons="variants.flags" variant="flags" classes="w-32 h-40 m-10" /> -->
  </div>

  <ClientOnly>
    <Teleport to="#widget" defer>
      <div class="nq-raw" h-full f-pb-md flex="~ col" max-md:f-p-xs of-y-auto>
        <header v-if="!selectedIcon" flex="~ md:col gap-16 items-start">
          <div stack f-p-md rounded-16 outline="dashed 3 offset--3 neutral-300" w-max>
            <div size-64 />
          </div>
          <p f-mt-sm f-text-xs pl-4 text-neutral-800 font-semibold shrink-0>
            Select an icon
          </p>

          <div flex="~ wrap items-center gap-12" f-mt-sm>
            <button
              v-for="c in colors" :key="c" shrink-0 size-21 rounded-full outline="~ 1 neutral/20"
              :data-active="activeColor === c ? '' : undefined"
              :class="{ 'op-30 hocus:op-80': c !== activeColor || (isLogo && !isMono) }" transition-colors
              :style="`background-color: var(--colors-${c});`" @click="selectColor(c)"
            />

            <button v-if="isLogo" stack bg="neutral-500 data-active:neutral" text-neutral-0 size-21 transition-opacity aspect-square rounded-full :data-state="!isMono ? 'active' : ''" @click="rotateLogoIcon">
              <span block :class="isMono ? 'i-tabler:paint' : isWhite ? 'i-tabler:paint-off' : !hasWhite ? 'i-nimiq:moon' : 'i-tabler:paint-off'" />
            </button>
          </div>
        </header>
        <template v-else>
          <header
            flex="~ md:col gap-16 items-start"
            :style="`--c: var(--colors-${activeColor});--c2: var(--colors-${activeColor}-400);`"
          >
            <div
              stack f-p-md rounded-16 outline="~ 3 offset--3 $c2"
              :style="`background-color: color-mix(in oklch, var(--colors-${activeColor}) 4%, transparent)`" :class="{
                'w-auto children:h-64 children:w-full': selectedIcon.includes('horizontal'),
                'w-max children:size-64 size-124': !selectedIcon.includes('horizontal'),
                '!bg-neutral-0 dark:!bg-neutral outline-neutral-100': isLogo && !isMono && !isWhite,
                '!bg-neutral dark:!bg-neutral-0 outline-neutral-900 dark:outline-neutral-100': isLogo && !isMono && isWhite,
              }"
            >
              <Icon :icon="selectedIcon" text="$c" :class="{ 'animate-spin': selectedIcon === 'nimiq:spinner' }" />
            </div>
            <div>
              <div flex="~ items-center wrap gap-12" f-mt-sm>
                <button
                  v-for="c in colors" :key="c" shrink-0 size-21 rounded-full outline="~ 1 neutral/20"
                  :data-active="activeColor === c ? '' : undefined"
                  :class="{ 'op-30 hocus:op-80': c !== activeColor || (isLogo && !isMono) }" transition-colors
                  :style="`background-color: var(--colors-${c});`" @click="selectColor(c)"
                />

                <button v-if="isLogo" stack bg="neutral-500 data-active:neutral" text-neutral-0 size-21 transition-opacity aspect-square rounded-full :data-state="!isMono ? 'active' : ''" @click="rotateLogoIcon">
                  <span block :class="isMono ? 'i-tabler:paint' : isWhite ? 'i-tabler:paint-off' : !hasWhite ? 'i-nimiq:moon' : 'i-tabler:paint-off'" />
                </button>
              </div>

              <p md:hidden mt-10 font-semibold>
                <CodeBlock text-13 :code="`i-${selectedIcon}`" />
              </p>
            </div>
          </header>

          <template v-if="!missingLogoVariant">
            <p f-mt-md nq-label text="9 neutral-700">
              Copy as
            </p>
            <p mt-4 font-semibold max-md:hidden>
              <CodeBlock text-13 :code="`i-${selectedIcon}`" />
            </p>
            <div flex="~ items-center gap-$f-gap" f-my-2xs f="$gap $gap-min-8 $gap-max-12">
              <CodeBlock :code="svgIcon!" display-content="SVG" />
              <CodeBlock :code="svgIconDataUrl" display-content="Data URL" />
            </div>
            <ShikiBlock :code="tailwindCode || ''" lang="html" mt-0 />
          </template>
          <div v-else bg-orange-400 outline="~ 1 offset--1 orange-500" f-px-xs f-py-4 rounded-6 f-mt-md>
            <span block text-orange-1100 f-text-xs font-semibold>Missing logo variant</span>
          </div>

          <div v-if="selectedIcon === 'nimiq:spinner'" bg-blue-400 outline="~ 1 offset--1 blue-500" f-px-xs f-py-4 rounded-6 f-mt-md>
            <span block text-blue-1100 f-text-xs font-semibold>Uses CSS <code bg-blue-500 px-4 rounded-2 text-current>animate-spin</code> class</span>
          </div>

          <a v-if="selectedIcon.includes('staking') || selectedIcon.includes('leaf')" mt-auto href="/frankenstein/components/animated-staking-ripple" py-4 text-green-1100 outline="~ 1 offset--1 green-500" f-px-xs f-py-4 rounded-6 f-mt-md nq-arrow>
            Check out the animated staking ripple component
          </a>
        </template>
      </div>
    </Teleport>
  </ClientOnly>
</template>
