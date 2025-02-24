<script setup lang="ts">
import CommandMenu from './CommandMenu.vue';
import Logo from './Logo.vue'
import ThemeSwitcher from './ThemeSwitcher.vue';
import { createReusableTemplate } from '@vueuse/core';
import { useData, useRoute } from 'vitepress';
import { computed, useTemplateRef, watch } from 'vue';
import type { NimiqVitepressThemeConfig } from '../types'
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from 'reka-ui'

const [DefineSidebarItem, SidebarItem] = createReusableTemplate<{ item: { text: string, link?: string, icon?: string } }>()

const { theme } = useData<NimiqVitepressThemeConfig>()


const route = useRoute()

function isActive(link?: string) {
  return link === route.path
}

const items = computed(() => {
  return theme.value.sidebar
})

const nav = useTemplateRef<HTMLElement>('nav')

watch(items, () => {
  const aEl = nav.value?.querySelector('.font-bold')
  if (aEl) {
    aEl.scrollIntoView({ block: 'center' })
  }
})

// TODO Animate up and down
// TODO Add icon
</script>

<template>
  <aside z-20 w-full of="x-hidden y-auto" fixed inset-y-0 left-0 overscroll-contain bg-neutral-100 flex="~ col">
    <div f-p-xs flex-1>

      <Logo />
      <CommandMenu f-mt-sm />
      <span id="sidebar-aria-label" sr-only>
        Sidebar Navigation
      </span>

      <DefineSidebarItem v-slot="{ item: { text, link, icon } }">
        <a :href="link" class="item" px-24 :class="{ 'font-bold text-blue bg-blue-500': isActive(link) }">
          <div :class="icon" f-text-2xs v-if="icon" text-neutral op-90 mr-8 shrink-0 />
          <div aria-hidden absolute inset-y-8 left-12 bg-blue rounded-full w-2 z-2 v-if="isActive(link)" />
          {{ text }}
        </a>
      </DefineSidebarItem>

      <nav v-if="theme.sidebar" v-bind="$attrs" of-y-auto ref="nav" f-mt-sm>
        <ul>
          <li v-for="item in items" :key="item.label" f-pb-xs>
            <template v-if="item.items?.length">
              <span nq-label text-11 text-neutral-700>
                {{ item.label }}
              </span>
              <div v-for="subitem in item.items" :key="subitem.text" mt-4>
                <CollapsibleRoot v-if="subitem.items?.length" v-slot="{ open }" mb-24 :default-open="true">
                  <CollapsibleTrigger class="item" group pr-12 pl-8 bg-transparent>
                    <div :class="subitem.icon" f-text-2xs v-if="subitem.icon" text-neutral op-90 mr-8 />
                    <div :class="subitem.text" op="80 group-hocus:100" transition-opacity />
                    <span flex-1 text-left>{{ subitem.text }}</span>
                    <div i-nimiq:chevron-down aria-hidden text="9 neutral-700 group-hocus:neutral-800"
                      transition="[color,transform]" :class="{ 'rotate--90': !open }" />
                  </CollapsibleTrigger>
                  <CollapsibleContent of-hidden data-open:animate-slide-down data-closed:animate-slide-up relative>
                    <div absolute inset-y-0 left-12 w-2 bg-neutral-400 z-1 rounded-full />
                    <SidebarItem v-for="subsubitem in subitem.items" :key="subsubitem.text" :item="subsubitem" />
                  </CollapsibleContent>
                </CollapsibleRoot>
                <SidebarItem v-else :item="subitem" />
              </div>
            </template>
          </li>
        </ul>
      </nav>
    </div>

    <div border="t neutral-400" flex="~ items-center" f-px-sm>
      <nav>
        <ul flex="~ gap-4" f-py-xs>
          <li v-for="({ icon, link }) in theme.socialLinks" :key="link">
            <a :href="link" target="_blank" rel="noopener noreferrer" aria-label="ariaLabel" transition-colors
              un-text="18 neutral-900 hocus:neutral">
              <div :class="icon" />
              <span sr-only>Visit us on {{ icon }}</span>
            </a>
          </li>
        </ul>
      </nav>
      <ThemeSwitcher />
    </div>
  </aside>
</template>

<style scoped>
.item {
  --uno: 'f-text-xs py-8 md:py-6 rounded-4 flex justify-between items-center w-full hocus:!bg-neutral-300 transition-colors';
}
</style>
