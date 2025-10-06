<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'

const { site, theme } = useData()

const removeNimiqPrefix = (str: string) => str.toLocaleLowerCase().startsWith('nimiq') ? str.slice(6) : str
const name = computed(() => removeNimiqPrefix(site.value.title))
</script>

<template>
  <div>
    <a flex="~ items-center gap-8 shrink-0" w-full text-neutral font-semibold :href="withBase('/')">
      <img v-if="theme.logo" class="logo" :src="theme.logo">
      <div v-else i-nimiq:logos-nimiq-horizontal text-20 dark:i-nimiq:logos-nimiq-white-horizontal />
      <span translate-y--1 text-16 font-light tracking-wide>{{ name }}</span>
      <span v-if="theme.betaBadge" text-10 font-semibold px-6 py-2 bg-blue-500 text-white rounded-4 translate-y--1>BETA</span>
    </a>
  </div>
</template>
