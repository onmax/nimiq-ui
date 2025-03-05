<script setup lang="ts">
import CommandMenu from './CommandMenu.vue';
import Logo from './Logo.vue'
import ThemeSwitcher from './ThemeSwitcher.vue';
import { createReusableTemplate } from '@vueuse/core';
import { useData, withBase } from 'vitepress';
import { useTemplateRef, watch } from 'vue';
import type { NimiqVitepressSidebar, NimiqVitepressThemeConfig, NimiqVitepressThemeNav } from '../types'
import { ref } from 'vue'
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from 'reka-ui'
import { useCurrentModule } from '../composables/useCurrentModule';
import { isActive } from '../lib/route';

const [DefineNavItem, NavItem] = createReusableTemplate<{ item: NimiqVitepressThemeNav, component: 'a' | 'div' }>()
const [DefineSidebarItem, SidebarItem] = createReusableTemplate<{ item: { text: string, link?: string, icon?: string } }>()

const { theme, page } = useData<NimiqVitepressThemeConfig>()

const {currentDocModule} = useCurrentModule()
const nav = useTemplateRef<HTMLElement>('nav')

watch(theme, () => {
  const aEl = nav.value?.querySelector('.font-bold')
  if (aEl) {
    aEl.scrollIntoView({ block: 'center' })
  }
})


const submoduleNavigatorOpen = ref(false)

// TODO Animate up and down accordion
// TODO Animate up and down combobox

function isExternalLink(link: string) {
  return link.startsWith('http')
}

// An accordion is collapsed by default if it has more than 6 items and the current page is not part of the accordion
function openAccordionInitialState(items: NimiqVitepressSidebar['items'][number]['items']) {
  const currentPageIsChild = items?.some(item => isActive(page.value.relativePath, item.link))
  // Open if either:
  // 1. Current page is inside this accordion OR
  // 2. The accordion has 6 or fewer items
  return currentPageIsChild || (items?.length || 0) <= 6
} 
</script>

<template>
  <aside z-20 w-full of="x-hidden y-auto" fixed inset-y-0 left-0 overscroll-contain bg-neutral-100 flex="~ col">
    <div absolute inset-y-0 right-0 ring="0.75 neutral-400" aria-hidden />
    <div f-p-xs flex-1>
      <Logo />
      <CommandMenu f-mt-sm />
      <span id="sidebar-aria-label" sr-only>
        Sidebar Navigation
      </span>

      <DefineNavItem v-slot="{ item: { text, subpath, defaultPageLink, icon, description }, component }">
        <component :is="component"  :href="withBase(defaultPageLink)" f-text-xs py-6 pl-12 pr-16 rounded-6  w-full hocus:bg-neutral-300 transition-colors :class="{ 'font-bold text-blue bg-blue-400': isActive(page.relativePath, subpath), 'grid-cols-[max-content_1fr]':!!icon }" grid="~ rows-2 gap-x-12 items-center">
          <div :class="icon" block size-28 row-span-full v-if="icon" />
          <span flex-1 text-left>{{ text }}</span>
          <p v-if="description" text="left f-xs" text-neutral-800>{{ description }}</p>
        </component>
      </DefineNavItem>

      <CollapsibleRoot v-model:open="submoduleNavigatorOpen" w-full f-mt-sm>
        <CollapsibleTrigger bg-transparent w-full relative group ring="1.5 neutral-400" rounded-6>
          <NavItem :item="currentDocModule" component="div" />
          <div absolute right-16 top-18 i-nimiq:chevron-top-down transition-opacity op="80 group-hocus:100" scale-80 />
        </CollapsibleTrigger>

        <CollapsibleContent  of-hidden data-open:shadow w-full z-90 mt-6>
          <div absolute z-90 bg-neutral-100  ring="1.5 neutral-300" rounded-6 data-open:animate-slide-down data-closed:animate-slide-up w="[calc(100%-30px)]">
            <NavItem @click="submoduleNavigatorOpen=false" v-for="item in theme.modules" :key="item.text" :item="item" component="a" />
          </div>
        </CollapsibleContent>
      </CollapsibleRoot>

      <DefineSidebarItem v-slot="{ item: { text, link, icon } }">
        <a :href="withBase(link!)" class="sidebar-item" :data-state="isActive(page.relativePath, link) ? 'active' : ''" data-active:font-bold transition-all data-active:text-blue data-active:bg-blue-400 group :class="{ 'nq-arrow after:op-70 hocus:after:op-100': isExternalLink(link!) }" transition-opacity :target="isExternalLink(link!) ? '_blank' : undefined">
          <div aria-hidden absolute inset-y-0 bg-blue op-70 rounded-full w-2 z-2 transition-colors v-if="isActive(page.relativePath, link)" left="0 [[data-state=open]_&]:12" />
          <div :class="icon" f-text-sm v-if="icon" text="neutral data-active:blue" op="70 group-hocus:100" transition-opacity mr-8 shrink-0 />
          <span flex-1>{{ text }}</span>
        </a>
      </DefineSidebarItem>

      <nav v-bind="$attrs" of-y-auto ref="nav" f-mt-sm>
        <div i-nimiq:fire />
        <ul>
          <li v-for="item in currentDocModule.sidebar" :key="item.label" f-pb-xs>
            <template v-if="item.items?.length">
              <span nq-label text-11 text-neutral-700 v-if="item.label">
                {{ item.label }}
              </span>
              <div v-for="subitem in item.items" :key="subitem.text">
                <CollapsibleRoot v-if="subitem.items?.length" v-slot="{ open }" :default-open="openAccordionInitialState(subitem.items)">
                  <CollapsibleTrigger class="sidebar-item" group pr-12 pl-8 bg-transparent>
                    <div :class="subitem.icon" f-text-sm v-if="subitem.icon" text-neutral op="70 group-hocus:100" mr-8 />
                    <div :class="subitem.text" op="80 group-hocus:100" transition-opacity />
                    <span flex-1 text-left>{{ subitem.text }}</span>
                    <div i-nimiq:chevron-down aria-hidden text="9 neutral-700 group-hocus:neutral-800"
                      transition="[color,transform]" :class="{ 'rotate--90': !open }" />
                  </CollapsibleTrigger>
                  <CollapsibleContent of-hidden data-open:animate-slide-down data-closed:animate-slide-up relative>
                    <div absolute inset-y-0 left-12 w-2 bg-neutral-400 z-1 rounded-full />
                    <SidebarItem v-for="subsubitem in subitem.items" px-24 :key="subsubitem.text" :item="subsubitem" />
                  </CollapsibleContent>
                </CollapsibleRoot>
                <SidebarItem v-else :item="subitem" px-8 />
              </div>
            </template>
          </li>
        </ul>
      </nav>
    </div>

    <div border="t neutral-400" flex="~ items-center" f-px-sm>
      <nav>
        <ul flex="~ gap-4" f-py-xs>
          <li v-for="({ icon, link }) in theme.links" :key="link">
            <a :href="withBase(link)" target="_blank" rel="noopener noreferrer" aria-label="ariaLabel" transition-colors
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
.sidebar-item {
  --uno: 'f-text-xs py-8 md:py-6 rounded-4 flex justify-between items-center w-full hocus:!bg-neutral-300 data-active:hocus:!bg-blue-400 transition-colors';
}
</style>
