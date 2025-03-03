<script setup lang="ts">
import { addCollection, Icon, listIcons, getIcon } from '@iconify/vue'
import { createReusableTemplate, useLocalStorage } from '@vueuse/core'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { buildIcon } from 'iconify-icon'
import CodeBlock from './CodeBlock.vue'
import ShikiBlock from './ShikiBlock.vue'

enum Variant {
  Regular = 'regular',
  Large = 'icons-lg',
  Logos = 'logos',
  Flags = 'flags',
}

const variants = ref<Record<Variant, string[]>>({
  [Variant.Regular]: [],
  [Variant.Large]: [],
  [Variant.Logos]: [],
  [Variant.Flags]: [],
})
const icons = ref<string[]>([])

const lastUpdated = ref<Date>(new Date(Date.now()))
const timeBuild = ref('')

const initialIcon = new URLSearchParams(globalThis.location?.search).get('icon') || ''

onMounted(async () => {
  const json = await fetch('https://raw.githubusercontent.com/onmax/nimiq-ui/main/packages/nimiq-icons/dist/icons.json').then(res => res.json())
  addCollection(json)
  // addCollection({ ...json, icons: Object.entries(json.icons).filter(([key]) => key.startsWith('logos-nimiq-full-white-vertical')).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}) })

  icons.value = listIcons()
  variants.value[Variant.Regular] = listIcons().filter(icon => icon.startsWith('nimiq') && !icon.startsWith(`nimiq:${Variant.Large}-`) && !icon.startsWith(`nimiq:${Variant.Logos}-`) && !icon.startsWith(`nimiq:${Variant.Flags}-`))
  variants.value[Variant.Large] = listIcons().filter(icon => icon.startsWith(`nimiq:${Variant.Large}-`))
  variants.value[Variant.Logos] = listIcons().filter(icon => icon.startsWith(`nimiq:${Variant.Logos}-`))
  variants.value[Variant.Flags] = listIcons().filter(icon => icon.startsWith(`nimiq:${Variant.Flags}-`))

  lastUpdated.value = new Date(json.lastModified * 1000)
  timeBuild.value = new Intl.DateTimeFormat('en', { dateStyle: 'short', timeStyle: 'short' }).format(lastUpdated.value)
})

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
  // @ts-ignore
  return `<svg xmlns="http://www.w3.org/2000/svg"${xlink} ${Object.entries(built.attributes).map(([k, v]) => `${k}="${v}"`).join(' ')}>${built.body}</svg>`.replaceAll('currentColor', activeColor.value)
})

const svgIconDataUrl = computed(() => {
  const svg = svgIcon.value
  if (!svg)
    return 'no icon'
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
})

const tailwindCode = computed(() => {
  const className = (!isLogo.value || (isLogo.value && isMono.value)) ? `\n\tclass="text-${activeColor.value}"` : ''
  return `<div\n\ti-${selectedIcon.value}\n\taria-hidden${className}\n/>`
})

const isLogo = computed(() => selectedIcon.value.startsWith('nimiq:logos'))
const isMono = computed(() => selectedIcon.value.endsWith('-mono'))
const isWhite = computed(() => selectedIcon.value.includes('-white-'))

// From mono -> logo -> logo-white
function rotateLogoIcon() {
  missingLogoVariant.value = false

  if (isMono.value) {
    const baseIcon = selectedIcon.value.slice(0, -5)
    if (getIcon(baseIcon)) {
      selectedIcon.value = baseIcon
    } else {
      missingLogoVariant.value = true
    }
    return
  }

  if (selectedIcon.value.match(/(horizontal|vertical)$/)) {
    const whiteVersion = selectedIcon.value.replace(/(horizontal|vertical)$/, 'white-$1')
    if (getIcon(whiteVersion) && !isWhite.value) {
      selectedIcon.value = whiteVersion
      return
    }

    const monoVersion = selectedIcon.value.replace(/(?:white-)(horizontal|vertical)/, '$1') + '-mono'
    if (getIcon(monoVersion)) {
      selectedIcon.value = monoVersion
    } else {
      missingLogoVariant.value = true
    }
    return
  }

  // For non-horizontal/vertical logos, just add mono
  const monoVersion = selectedIcon.value + '-mono'
  if (getIcon(monoVersion)) {
    selectedIcon.value = monoVersion
  } else {
    missingLogoVariant.value = true
  }
}

function selectColor(c: Color) {
  if (isLogo.value && !isMono.value) {
    selectedIcon.value = selectedIcon.value + '-mono'
  }
  activeColor.value = c
}
</script>

<template>
  <DefineGrid v-slot="{ icons, variant, classes }">
    <span block f-mt-xl f-text-2xs text="$c" nq-label op="90 dark:70" :style="`--c: rgb(var(--nq-${activeColor}-1100))`">
      {{ variant }}
    </span>

    <ul pl-0 flex flex-wrap select-none text-2xl ml--8 f-mt-xs>
      <li v-for="icon in icons" :key="icon" flex>
        <button w-max bg-transparent @click="() => selectedIcon = icon" op="70 dark:60 hocus:100" transition-opacity
          :style="`--c: rgb(var(--nq-${activeColor}))`">
          <Icon :icon text="$c" :class="[classes, { 'w-auto !h-24': icon.includes('horizontal') }]" />
        </button>
      </li>
    </ul>
  </DefineGrid>

  <div class="nq-raw">
    <ReuseGrid :icons="variants.regular" variant="regular" classes="w-20 h-28 m-8" />
    <ReuseGrid :icons="variants['icons-lg']" variant="Large Icons" classes="w-32 h-40 m-10" />
    <ReuseGrid :icons="logosMono" variant="logos mono" classes="w-32 h-40 m-10" />
    <!-- <ReuseGrid :icons="variants.flags" variant="flags" classes="w-32 h-40 m-10" /> -->
  </div>

  <ClientOnly>
    <Teleport to="#widget" defer>
      <div class="nq-raw" h-full f-pb-md flex="~ col">
        <header flex="col gap-16 items-start" v-if="!selectedIcon">
          <div stack f-p-md rounded-16 outline="dashed 3 offset--3 neutral-300" w-max>
            <div size-64 />
          </div>
          <p f-mt-sm f-text-xs pl-4 text-neutral-800 font-semibold>Select an icon</p>
        </header>
        <template v-else>
          <header flex="col gap-16 items-start"
            :style="`--c: rgb(var(--nq-${activeColor}));--c2: rgb(var(--nq-${activeColor}-400));`">
            <div stack f-p-md rounded-16 outline="~ 3 offset--3 $c2"
              :style="`background-color:rgb(var(--nq-${activeColor})/0.04)`" :class="{
                'w-auto children:h-64 children:w-full': selectedIcon.includes('horizontal'),
                'w-max children:size-64 size-124': !selectedIcon.includes('horizontal'),
                '!bg-neutral-0 dark:!bg-neutral outline-neutral-100': isLogo && !isMono && !isWhite,
                '!bg-neutral dark:!bg-neutral-0 outline-neutral-900 dark:outline-neutral-100': isLogo && !isMono && isWhite,
              }">
              <Icon :icon="selectedIcon" text="$c" />
            </div>
            <div absolute top-8 right="$f-px" mr-8 f="$px $px-min-16 $px-max-24"
              transition-opacity>
              <button @click="rotateLogoIcon" stack v-if="isLogo" bg-transparent text-neutral op="60 hocus:100" transition-opacity :class="{
                'text-neutral-0': !isMono && isWhite
              }" aspect-square p-4 rounded-full>
                <span block :class="isMono ? 'i-tabler:paint' : isWhite ? 'i-tabler:paint-off' : 'i-nimiq:moon'" />
              </button>
            </div>
            <div flex="~ items-center gap-12" f-mt-sm>
              <button v-for="c in colors" :key="c" size-21 rounded-full outline="~ 1 neutral/20"
                :data-active="activeColor === c ? '' : undefined"
                :class="{ 'op-30 hocus:op-80': c !== activeColor || (isLogo && !isMono) }" transition-colors
                @click="selectColor(c)" :style="`background-color: rgba(var(--nq-${c}));`" />
            </div>
          </header>

          <template v-if="!missingLogoVariant">
            <h3 f-mt-md>
              <CodeBlock f-text-xs :code="`i-${selectedIcon}`" />
            </h3>

            <p f-mt-xs nq-label text="9 neutral-700">Copy as</p>
            <div flex="~ items-center gap-12" mt-6 mb-12>
              <CodeBlock :code="svgIcon" display-content="SVG" />
              <CodeBlock :code="svgIconDataUrl" display-content="Data URL" />
            </div>
            <ShikiBlock :code="tailwindCode || ''" lang="html" />
          </template>
          <div v-else bg-orange-400 outline="~ 1 offset--1 orange-500" f-px-xs f-py-4 rounded-6 f-mt-md>
            <span block text-orange-1100 f-text-xs font-semibold>Missing logo variant</span>
          </div>

          <div v-if="selectedIcon === 'nimiq:spinner'" bg-orange-400 outline="~ 1 offset--1 orange-500" f-px-xs f-py-4 rounded-6 f-mt-md>
            <span block text-orange-1100 f-text-xs font-semibold>Uses SVG <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animate" target="_blank"><code bg-orange-500 px-4 rounded-2 text-current>animate</code> tag</a></span>
          </div>

          <a mt-auto href="/frankenstein/components/animated-staking-ripple" py-4 text-green-1100 v-if="selectedIcon.includes('staking') || selectedIcon.includes('leaf')" outline="~ 1 offset--1 green-500" f-px-xs f-py-4 rounded-6 f-mt-md nq-arrow>
            Check out the animated staking ripple component
          </a>
        </template>
      </div>
    </Teleport>
  </ClientOnly>

</template>
