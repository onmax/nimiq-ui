<script setup lang="ts">
import type { LogoContextMenuItem } from '../types'
import { useData, withBase } from 'vitepress'
import { computed, ref } from 'vue'

const { site, theme } = useData()

const removeNimiqPrefix = (str: string) => str.toLocaleLowerCase().startsWith('nimiq') ? str.slice(6) : str
const name = computed(() => removeNimiqPrefix(site.value.title))

// Context menu state
const showContextMenu = ref(false)
const contextMenuX = ref(0)
const contextMenuY = ref(0)

// Get version from Vite config
const version = (window as any).__NIMIQ_VITEPRESS_CONFIG__?.version

// Context menu configuration
const showVersion = computed(() => theme.value.logoContextMenu?.showVersion !== false)
const customItems = computed<LogoContextMenuItem[]>(() => theme.value.logoContextMenu?.items || [])
const hasContextMenu = computed(() => (showVersion.value && version) || customItems.value.length > 0)

function handleContextMenu(event: MouseEvent) {
  if (!hasContextMenu.value)
    return

  event.preventDefault()
  contextMenuX.value = event.clientX
  contextMenuY.value = event.clientY
  showContextMenu.value = true
}

function closeContextMenu() {
  showContextMenu.value = false
}

function handleItemClick(item: LogoContextMenuItem) {
  if (item.onClick) {
    item.onClick()
  }
  else if (item.href) {
    window.open(item.href, '_blank')
  }
  closeContextMenu()
}

// Close context menu on click outside
if (typeof window !== 'undefined') {
  window.addEventListener('click', () => {
    if (showContextMenu.value)
      closeContextMenu()
  })
}
</script>

<template>
  <div>
    <a
      flex="~ items-center gap-8 shrink-0"
      w-full
      relative
      text-neutral
      font-semibold
      :href="withBase('/')"
      @contextmenu="handleContextMenu"
    >
      <img v-if="theme.logo" class="logo" :src="theme.logo">
      <div v-else i-nimiq:logos-nimiq-horizontal text-20 dark:i-nimiq:logos-nimiq-white-horizontal />
      <span translate-y--1 text-16 font-light tracking-wide>{{ name }}</span>
      <span v-if="theme.betaBadge" text-10 font-semibold absolute right-8 top-7 lh-none px-3 py-6 bg-gradient-blue text-white rounded-4 outline="1.5 ~ white/10 offset--1.5">BETA</span>
    </a>

    <!-- Context Menu -->
    <Teleport v-if="showContextMenu" to="body">
      <div
        fixed
        bg-white
        dark:bg-neutral-800
        border="1 solid neutral-200 dark:neutral-700"
        rounded-8
        shadow-lg
        py-4
        min-w-150
        z-9999
        :style="{ left: `${contextMenuX}px`,
                  top: `${contextMenuY}px` }"
        @click.stop
      >
        <!-- Version -->
        <div
          v-if="showVersion && version"
          px-12
          py-6
          text-12
          text-neutral-700
          dark:text-neutral-400
          font-mono
          :border-b="customItems.length > 0 ? '1 solid neutral-200 dark:neutral-700' : undefined"
          :mb-4="customItems.length > 0"
        >
          v{{ version }}
        </div>

        <!-- Custom Items -->
        <button
          v-for="(item, index) in customItems"
          :key="index"
          w-full
          px-12
          py-8
          text-left
          text-14
          text-neutral-700
          dark:text-neutral-300
          hover="bg-neutral-100 dark:bg-neutral-700"
          transition-colors
          cursor-pointer
          flex="~ items-center gap-8"
          @click="handleItemClick(item)"
        >
          <div v-if="item.icon" :class="item.icon" text-16 />
          <span>{{ item.label }}</span>
        </button>
      </div>
    </Teleport>
  </div>
</template>
