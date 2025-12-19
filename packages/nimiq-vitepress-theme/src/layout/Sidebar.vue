<script setup lang="ts">
import type { NimiqVitepressSidebar, NimiqVitepressThemeConfig } from '../types'
import { createReusableTemplate } from '@vueuse/core'
import { Motion } from 'motion-v'
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger, ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'reka-ui'
import { useData, withBase } from 'vitepress'
import { ref } from 'vue'
import { useActionsMenu } from '../composables/useActionsMenu'
import { useCurrentModule } from '../composables/useCurrentModule'
import { useVisibleModules } from '../composables/useVisibleModules'
import { renderMarkdown } from '../lib/html-renderer'
import { isActive } from '../lib/route'
import ActionsMenu from './ActionsMenu.vue'
import CommandMenu from './CommandMenu.vue'
import Logo from './Logo.vue'
import ModulePill from './ModulePill.vue'
import SocialMediaLinks from './SocialMediaLinks.vue'
import ThemeSwitcher from './ThemeSwitcher.vue'

const { search = true } = defineProps<{ search?: boolean }>()

const [DefineSidebarItem, SidebarItem] = createReusableTemplate<{ item: { text: string, link?: string, icon?: string }, isInAccordion?: boolean }>()

const { page } = useData<NimiqVitepressThemeConfig>()

const { currentDocModule } = useCurrentModule()
const { visibleModules } = useVisibleModules()
const { allActions, nativeOptions, externalOptions, hasDropdown } = useActionsMenu()

const submoduleNavigatorOpen = ref(false)

// TODO Animate up and down navigation switcher

function isExternalLink(link: string) {
  return link.startsWith('http')
}

// Check if a link navigates to a different module
function isCrossModuleLink(link: string) {
  if (!link || isExternalLink(link))
    return false

  // Get the first segment of the link (e.g., '/nimiq-icons/explorer' -> 'nimiq-icons')
  const linkModule = link.split('/')[1]

  // Get current module subpath
  const currentModule = currentDocModule.value?.subpath

  // If we have both modules and they're different, it's a cross-module link
  return linkModule && currentModule && linkModule !== currentModule
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
  <aside z-200 class="nq-raw" of="x-hidden y-auto" fixed inset-y-0 left-0 overscroll-contain bg-neutral-100 flex="~ col">
    <div absolute inset-y-0 z-3 right-0 ring="0.75 neutral-400" max-xl:hidden aria-hidden var:outline-color:neutral-400 />
    <div f-p="sm md:xs" pb-0 display="~ col">
      <Logo />
      <span id="sidebar-aria-label" sr-only>
        Sidebar Navigation
      </span>
      <CommandMenu v-if="search" f-mt-sm />

      <!-- Show collapsible when currentDocModule has sidebar content -->
      <CollapsibleRoot v-if="currentDocModule?.sidebar?.length" v-model:open="submoduleNavigatorOpen" w-full f-mt-sm>
        <CollapsibleTrigger bg-transparent w-full relative group outline="~ 1.5 neutral-300" rounded="6 reka-open:b-0" transition-border-radius of-clip>
          <ModulePill :item="currentDocModule" component="div" />
          <div absolute right-16 top-18 i-nimiq:chevron-top-down transition-opacity op="80 group-hocus:100" scale-80 />
        </CollapsibleTrigger>

        <CollapsibleContent of-hidden data-open:shadow w-full mt-0>
          <Motion
            as="div"
            :initial="{ height: 0,
                        opacity: 0 }"
            :animate="submoduleNavigatorOpen ? { height: 'auto',
                                                 opacity: 1 } : { height: 0,
                                                                  opacity: 0 }"
            :transition="{ duration: 0.25,
                           ease: 'easeInOut' }"
            absolute z-90 bg-neutral-100 outline="~ 1.5 neutral-300" rounded-b-6 w="[calc(100%-30px)]" shadow
          >
            <ModulePill v-for="item in visibleModules.filter(m => m !== currentDocModule)" :key="item.text" :item="item" component="a" @click="submoduleNavigatorOpen = false" />
          </Motion>
        </CollapsibleContent>
      </CollapsibleRoot>

      <!-- Show expanded module pills when currentDocModule has no sidebar -->
      <div v-else w-full f-mt-sm>
        <span nq-label text-11 text-neutral-700>
          Modules
        </span>
        <ModulePill v-for="item in visibleModules" :key="item.text" :item="item" component="a" px-0="!" />
      </div>
    </div>

    <template v-if="currentDocModule?.sidebar?.length">
      <hr w-full border="t-1 neutral-400" f-mt-xs>

      <DefineSidebarItem v-slot="{ item: { text, link, icon }, isInAccordion }">
        <a :href="withBase(link!)" relative class="sidebar-item" :data-state="isActive(page.relativePath, link) ? 'active' : ''" reka-active:font-bold transition-all reka-active:text-blue reka-active:bg-blue-400 group :class="{ 'nq-arrow after:op-70 hocus:after:op-100': isExternalLink(link!) || isCrossModuleLink(link!) }" transition-opacity :target="isExternalLink(link!) ? '_blank' : undefined">
          <div v-if="isActive(page.relativePath, link)" aria-hidden absolute inset-y-0 bg-blue rounded-full w-2 z-2 transition-colors :class="isInAccordion ? 'left-12' : 'left-0'" />
          <div v-if="icon" :class="icon" f-size-xs text="neutral reka-active:blue" grayscale="~ reka-active:0 group-hocus:0" op="70 group-hocus:100 reka-active:100" transition-opacity mr-8 shrink-0 />
          <span flex-1 v-html="renderMarkdown(text)" />
        </a>
      </DefineSidebarItem>
      <ScrollAreaRoot relative of-hidden bg-neutral-100 var:scrollbar-size:10px as="nav" flex-1 f-px="sm md:xs" v-bind="$attrs">
        <div absolute top-0 z-2 w-full h-24 bg-gradient-to-t from-transparent to-neutral-100 />
        <ScrollAreaViewport size-full f-pt-xs as="ul">
          <li v-for="item in currentDocModule.sidebar" :key="item.label" f-pb-xs>
            <template v-if="item.items?.length">
              <span v-if="item.label" nq-label text-11 text-neutral-700>
                {{ item.label }}
              </span>
              <div v-for="subitem in item.items.filter(i => !i.hidden)" :key="subitem.text">
                <CollapsibleRoot v-if="subitem.items?.length" v-slot="{ open }" :default-open="openAccordionInitialState(subitem.items)" :unmount-on-hide="false">
                  <CollapsibleTrigger class="sidebar-item" group pr-12 pl-8 bg-transparent>
                    <div v-if="subitem.icon" :class="subitem.icon" f-text-sm text-neutral op="70 group-hocus:100" mr-8 />
                    <div :class="subitem.text" op="80 group-hocus:100" transition-opacity />
                    <span flex-1 text-left v-html="renderMarkdown(subitem.text)" />
                    <div
                      i-nimiq:chevron-down aria-hidden text="9 neutral-700/70 group-hocus:neutral-700"
                      transition="[color,transform]" :class="{ 'rotate--90': !open }"
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent un-animate-collapsible="reka-open:down reka-closed:up" of-hidden relative>
                    <div absolute inset-y-0 left-12 w-2 bg-neutral-400 z-1 rounded-full />
                    <SidebarItem v-for="subsubitem in subitem.items.filter(i => !i.hidden)" :key="subsubitem.text" px-24 :item="subsubitem" :is-in-accordion="true" />
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
        <div absolute bottom-0 z-2 w-full h-24 bg-gradient-to-b from-transparent to-neutral-100 />
      </ScrollAreaRoot>
    </template>

    <!-- Outline Actions - Mobile Only -->
    <div v-if="allActions.length > 0" border="t neutral-400" f-px-sm f-py-xs max-xl:block xl:hidden>
      <ActionsMenu
        :all-actions="allActions"
        :native-options="nativeOptions"
        :external-options="externalOptions"
        :has-dropdown="hasDropdown"
        variant="sidebar"
      />
    </div>

    <div
      border="t neutral-400" :class="{ 'border-none': !currentDocModule && allActions.length === 0,
                                       'mt-auto': !currentDocModule && allActions.length === 0 }" flex="~ items-center" f-px-sm f-py-2xs sticky bottom-0
    >
      <SocialMediaLinks size="sm" translate-x--6 />
      <ThemeSwitcher />
    </div>
  </aside>
</template>

<style scoped>
.sidebar-item {
  --uno: 'f-text-xs py-8 md:py-6 rounded-4 flex justify-between items-center w-full hocus:!bg-neutral-300 reka-active:hocus:!bg-blue-400 transition-colors';
}
</style>
