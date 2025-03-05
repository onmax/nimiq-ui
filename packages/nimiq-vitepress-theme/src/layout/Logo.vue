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
    </a>
  </div>
</template>
