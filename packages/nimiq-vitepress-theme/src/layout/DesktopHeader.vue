<script setup lang="ts">
import { withBase } from 'vitepress'
import { useVisibleModules } from '../composables/useVisibleModules'
import CommandMenu from './CommandMenu.vue'
import Logo from './Logo.vue'

const { visibleModules } = useVisibleModules()
</script>

<template>
  <header z-1000 fixed inset-x-0 top-0 border="b-1 neutral-400" shadow bg-neutral-0 f-h-xl flex="~ gap-32" f-px-xl f-py-sm>
    <Logo />
    <CommandMenu max-w-320 ml-auto />
    <nav flex="~ items-center gap-32">
      <a v-for="module in visibleModules" :key="module.text" shrink-0 :href="withBase(module.defaultPageLink)">
        {{ module.text }}</a>
    </nav>
  </header>
</template>
