<script setup lang="ts">
import type { NimiqVitepressSidebar, NimiqVitepressThemeConfig, NimiqVitepressThemeNav } from '../types'
import { createReusableTemplate } from '@vueuse/core'
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger, ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'reka-ui'
import { useData, withBase } from 'vitepress'
import { ref } from 'vue'
import { useCurrentModule } from '../composables/useCurrentModule'
import { renderMarkdown } from '../lib/html-renderer'
import { isActive } from '../lib/route'
import CommandMenu from './CommandMenu.vue'
import Logo from './Logo.vue'
import ThemeSwitcher from './ThemeSwitcher.vue'

const [DefineNavItem, NavItem] = createReusableTemplate<{ item: NimiqVitepressThemeNav, component: 'a' | 'div' }>()
const [DefineSidebarItem, SidebarItem] = createReusableTemplate<{ item: { text: string, link?: string, icon?: string } }>()

const { theme, page } = useData<NimiqVitepressThemeConfig>()

const { currentDocModule } = useCurrentModule()

const submoduleNavigatorOpen = ref(false)

// TODO Animate up and down navigation switcher

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
  <aside z-20 of="x-hidden y-auto" fixed inset-y-0 left-0 overscroll-contain bg-neutral-100 flex="~ col">
    <div absolute inset-y-0 z-3 right-0 ring="0.75 neutral-400" aria-hidden var:outline-color:neutral-400 />
    <div f-p-xs pb-0 display="~ col">
      <Logo />
      <CommandMenu f-mt-sm />
      <span id="sidebar-aria-label" sr-only>
        Sidebar Navigation
      </span>

      <DefineNavItem v-slot="{ item: { text, defaultPageLink, icon, description }, component }">
        <component :is="component" :href="withBase(defaultPageLink)" f-text-xs py-6 pl-12 pr-16 w-full hocus:bg-neutral-300 transition-colors :class="{ 'grid-cols-[max-content_1fr]': !!icon }" grid="~ rows-2 gap-x-12 items-center">
          <div v-if="icon" :class="icon" block size-28 row-span-full />
          <p flex-1 text-left>
            {{ text }}
          </p>
          <p v-if="description" text="left f-xs" text-neutral-800>
            {{ description }}
          </p>
        </component>
      </DefineNavItem>
      <CollapsibleRoot v-model:open="submoduleNavigatorOpen" w-full f-mt-sm>
        <CollapsibleTrigger bg-transparent w-full relative group ring="1.5 neutral-400" rounded="6 reka-open:b-0" transition-border-radius of-clip>
          <NavItem :item="currentDocModule" component="div" />
          <div absolute right-16 top-18 i-nimiq:chevron-top-down transition-opacity op="80 group-hocus:100" scale-80 />
        </CollapsibleTrigger>

        <CollapsibleContent of-hidden data-open:shadow w-full mt-0>
          <div absolute z-90 bg-neutral-100 ring="1.5 neutral-300" rounded-b-6 data-open:animate-slide-down data-closed:animate-slide-up w="[calc(100%-30px)]">
            <NavItem v-for="item in theme.modules" :key="item.text" :item="item" component="a" @click="submoduleNavigatorOpen = false" />
          </div>
        </CollapsibleContent>
      </CollapsibleRoot>
    </div>

    <hr w-full h-1.5 bg-neutral-200 f-mt-xs>

    <DefineSidebarItem v-slot="{ item: { text, link, icon } }">
      <a :href="withBase(link!)" class="sidebar-item" :data-state="isActive(page.relativePath, link) ? 'active' : ''" data-active:font-bold transition-all data-active:text-blue data-active:bg-blue-400 group :class="{ 'nq-arrow after:op-70 hocus:after:op-100': isExternalLink(link!) }" transition-opacity :target="isExternalLink(link!) ? '_blank' : undefined">
        <div v-if="isActive(page.relativePath, link)" aria-hidden absolute inset-y-0 bg-blue op-70 rounded-full w-2 z-2 transition-colors left="0 [[data-state=open]_&]:12" />
        <div v-if="icon" :class="icon" f-text-sm text="neutral data-active:blue" op="70 group-hocus:100" transition-opacity mr-8 shrink-0 />
        <span flex-1 v-html="renderMarkdown(text)" />
      </a>
    </DefineSidebarItem>
    <ScrollAreaRoot relative of-hidden bg-neutral-100 var:scrollbar-size:10px as="nav" flex-1 f-px-xs v-bind="$attrs">
      <div absolute top-0 z-2 w-full h-24 bg-gradient="to-t from-transparent to-neutral-100" />
      <ScrollAreaViewport size-full f-pt-xs as="ul">
        <li v-for="item in currentDocModule.sidebar" :key="item.label" f-pb-xs>
          <template v-if="item.items?.length">
            <span v-if="item.label" nq-label text-11 text-neutral-700>
              {{ item.label }}
            </span>
            <div v-for="subitem in item.items" :key="subitem.text">
              <CollapsibleRoot v-if="subitem.items?.length" v-slot="{ open }" :default-open="openAccordionInitialState(subitem.items)">
                <CollapsibleTrigger class="sidebar-item" group pr-12 pl-8 bg-transparent>
                  <div v-if="subitem.icon" :class="subitem.icon" f-text-sm text-neutral op="70 group-hocus:100" mr-8 />
                  <div :class="subitem.text" op="80 group-hocus:100" transition-opacity />
                  <span flex-1 text-left v-html="subitem.text" />
                  <div
                    i-nimiq:chevron-down aria-hidden text="9 neutral-700 group-hocus:neutral-800"
                    transition="[color,transform]" :class="{ 'rotate--90': !open }"
                  />
                </CollapsibleTrigger>
                <CollapsibleContent un-animate-collapsible="reka-open:down reka-closed:up" of-hidden relative>
                  <div absolute inset-y-0 left-12 w-2 bg-neutral-400 z-1 rounded-full />
                  <SidebarItem v-for="subsubitem in subitem.items" :key="subsubitem.text" px-24 :item="subsubitem" />
                </CollapsibleContent>
              </CollapsibleRoot>
              <SidebarItem v-else :item="subitem" px-8 />
            </div>
          </template>
        </li>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar inset-y-0 flex="~" select-none touch-none p-2 z-20 bg="neutral-300" w-10 orientation="vertical">
        <ScrollAreaThumb flex-1 bg-neutral-500 rounded-5 relative content-empty before="absolute top--50% left--50% -translate-x--50% -translate-y--50% size-full min-h-40 min-w-40" />
      </ScrollAreaScrollbar>
      <div absolute bottom-0 z-2 w-full h-24 bg-gradient="to-b from-transparent to-neutral-100" />
    </ScrollAreaRoot>

    <div border="t neutral-400" flex="~ items-center" f-px-sm sticky bottom-0>
      <nav>
        <ul flex="~ gap-4" f-py-xs>
          <li v-for="({ icon, link }) in theme.links" :key="link">
            <a
              :href="withBase(link)" target="_blank" rel="noopener noreferrer" transition-colors
              un-text="18 neutral-900 hocus:neutral"
              aria-label="Visit us on {{ icon }}"
            >
              <div :class="icon" />
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
