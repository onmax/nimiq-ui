<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'

const { site, theme } = useData()

const removeNimiqPrefix = (str: string) => str.toLocaleLowerCase().startsWith('nimiq') ? str.slice(6) : str
const name = computed(() => removeNimiqPrefix(site.value.title))
</script>

<template>
  <div>
    <a flex="~ items-center shrink-0 gap-8" w-full text-neutral font-semibold :href="withBase('/')">
      <img v-if="theme.logo" class="logo" :src="theme.logo">
      <div v-else i-nimiq:logos-nimiq-horizontal text-18 dark:i-nimiq:logos-nimiq-white-horizontal />
      <span translate-y--1 text-16 font-light tracking-wide>{{ name }}</span>
    </a>
  </div>
</template>