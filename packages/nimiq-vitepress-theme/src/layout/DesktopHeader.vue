<script setup lang="ts">
import type { NqCardProps } from '../components/NqCard.vue'
import { motion } from 'motion-v'
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from 'reka-ui'
import { withBase } from 'vitepress'
import { computed, ref } from 'vue'

import { useHeaderScroll } from '../composables/useHeaderScroll'
import { useVisibleModules } from '../composables/useVisibleModules'
import CommandMenu from './CommandMenu.vue'
import Logo from './Logo.vue'
import SocialMediaLinks from './SocialMediaLinks.vue'
import ThemeSwitcher from './ThemeSwitcher.vue'

const { visibleModules } = useVisibleModules()
const { isHeaderVisible } = useHeaderScroll()

const isModulesDropdownOpen = ref(false)

// Transform modules for NqGrid
const moduleCards = computed(() => {
  return visibleModules.value.map(({ text, icon, defaultPageLink, description }, index) => ({
    title: text,
    icon,
    href: withBase(defaultPageLink),
    iconClass: 'relative size-24', // Smaller icons for header dropdown
    description,
    // Add stagger delay for entrance animation
    delay: index * 50,
  } satisfies NqCardProps & { delay: number }))
})
</script>

<template>
  <header z-1000 fixed inset-x-0 top-0 mx-16 mt-16 border="1 neutral-400" shadow bg-neutral-0 f-h-xl flex="~ items-center gap-32" f-px-xl f-py-sm rounded-12 transition="[transform,opacity] duration-300 ease-out" :class="{ 'translate-y--120% opacity-0': !isHeaderVisible }">
    <!-- Logo on the left -->
    <Logo />

    <!-- Right side container -->
    <div flex="~ items-center gap-16" ml-auto>
      <!-- Search -->
      <CommandMenu w-full min-w-320 />

      <!-- Modules Dropdown -->
      <CollapsibleRoot v-model:open="isModulesDropdownOpen" relative>
        <CollapsibleTrigger flex="~ items-center gap-8" f-px-sm f-py-xs f-rounded-xs bg="transparent hocus:neutral-200" transition-colors group>
          <span f-text-sm font-medium>Modules</span>
          <div i-nimiq:chevron-down text-12 transition-transform duration-200 :class="{ 'rotate-180': isModulesDropdownOpen }" />
        </CollapsibleTrigger>

        <CollapsibleContent absolute top-full right-0 min-w-400 max-w-600 bg-neutral-0 border="1 neutral-400" f-rounded-md shadow-lg z-50 un-animate="collapsible" class="modules-dropdown-content" of-clip>
          <motion.div
            :initial="{ opacity: 0,
                        y: -10 }" :animate="{ opacity: 1,
                                              y: 0 }" :transition="{ duration: 0.2 }" max-h-60vh of-y-auto f-p-md
          >
            <ul v-if="moduleCards.length > 0" grid="~ cols-2 gap-12" class="nq-raw" max-w-full my-0>
              <motion.li
                v-for="(card, index) in moduleCards" :key="card.title" :initial="{ opacity: 0,
                                                                                   y: 20,
                                                                                   scale: 0.9 }" :animate="{ opacity: 1,
                                                                                                             y: 0,
                                                                                                             scale: 1 }" :transition="{ duration: 0.3,
                                                                                                                                        delay: index * 0.05,
                                                                                                                                        type: 'spring',
                                                                                                                                        stiffness: 260,
                                                                                                                                        damping: 20 }" col-span-1 mt-0 flex @click="isModulesDropdownOpen = false"
              >
                <a :href="card.href" nq-hoverable>
                  <div :class="[card.icon, card.iconClass]" scale-125 />
                  <h3 v-if="card.title" f-mt-xs f-text-lg font-medium>
                    {{ card.title }}
                  </h3>
                  <p v-if="card.description" mt-2 text="f-sm neutral-800">
                    {{ card.description }}
                  </p>
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </CollapsibleContent>
      </CollapsibleRoot>

      <!-- Social Media Links -->
      <SocialMediaLinks />

      <!-- Theme Switcher -->
      <ThemeSwitcher />
    </div>
  </header>
</template>
