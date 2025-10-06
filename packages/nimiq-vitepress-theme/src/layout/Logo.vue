<script setup lang="ts">
import type { LogoContextMenuItem } from '../types'
import { ContextMenu } from 'reka-ui/namespaced'
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'

const { site, theme } = useData()

const removeNimiqPrefix = (str: string) => str.toLocaleLowerCase().startsWith('nimiq') ? str.slice(6) : str
const name = computed(() => removeNimiqPrefix(site.value.title))

// Get version from Vite config
declare const __NIMIQ_VITEPRESS_CONFIG__: { version?: string, repoURL?: string, contentPath?: string } | undefined
const version = __NIMIQ_VITEPRESS_CONFIG__?.version

// Context menu configuration
const showVersion = computed(() => theme.value.logoContextMenu?.showVersion !== false)
const customItems = computed<LogoContextMenuItem[]>(() => theme.value.logoContextMenu?.items || [])
const hasContextMenu = computed(() => (showVersion.value && version) || customItems.value.length > 0)

function handleItemClick(item: LogoContextMenuItem) {
  if (item.onClick) {
    item.onClick()
  }
  else if (item.href) {
    window.open(item.href, '_blank')
  }
}
</script>

<template>
  <ContextMenu.Root v-if="hasContextMenu">
    <ContextMenu.Trigger as-child>
      <a
        flex="~ items-center gap-8 shrink-0"
        w-max
        relative
        text-neutral
        font-semibold
        :href="withBase('/')"
      >
        <img v-if="theme.logo" class="logo" :src="theme.logo">
        <div v-else i-nimiq:logos-nimiq-horizontal text-20 dark:i-nimiq:logos-nimiq-white-horizontal />
        <span translate-y--1 text-16 font-light tracking-wide>{{ name }}</span>
        <span v-if="theme.betaBadge" nq-label absolute right--50 top--8 w-35 text-9 lh-none px-4 py-3 bg-gradient-blue text-white rounded-4 outline="1.5 white/10 offset--1.5">BETA</span>
      </a>
    </ContextMenu.Trigger>

    <ContextMenu.Portal>
      <ContextMenu.Content
        bg-white
        dark:bg-neutral-800
        border="1 solid neutral-200 dark:neutral-700"
        rounded-8
        shadow-lg
        py-4
        min-w-150
        z-1000
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
        >
          v{{ version }}
        </div>

        <ContextMenu.Separator v-if="showVersion && version && customItems.length > 0" my-4 h-1 bg-neutral-200 dark:bg-neutral-700 />

        <!-- Custom Items -->
        <ContextMenu.Item
          v-for="(item, index) in customItems"
          :key="index"
          px-12
          py-8
          text-14
          text-neutral-700
          dark:text-neutral-300
          hover="bg-neutral-100 dark:bg-neutral-700"
          transition-colors
          cursor-pointer
          flex="~ items-center gap-8"
          outline-none
          @click="handleItemClick(item)"
        >
          <div v-if="item.icon" :class="item.icon" text-16 />
          <span>{{ item.label }}</span>
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Portal>
  </ContextMenu.Root>

  <a
    v-else
    flex="~ items-center gap-8 shrink-0"
    w-max
    relative
    text-neutral
    font-semibold
    :href="withBase('/')"
  >
    <img v-if="theme.logo" class="logo" :src="theme.logo">
    <div v-else i-nimiq:logos-nimiq-horizontal text-20 dark:i-nimiq:logos-nimiq-white-horizontal />
    <span translate-y--1 text-16 font-light tracking-wide>{{ name }}</span>
    <span v-if="theme.betaBadge" text-9 font-semibold absolute right--50 top-7 w-35 lh-none px-3 py-6 bg-gradient-blue text-white rounded-4 outline="1.5 ~ white/10 offset--1.5">BETA</span>
  </a>
</template>
