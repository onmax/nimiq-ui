<script setup lang="ts">
import { useChangelog } from '@nolebase/vitepress-plugin-git-changelog/client/composables/changelog';
import { onMounted } from 'vue';

const { authors, useHmr } = useChangelog();

onMounted(useHmr)
</script>

<template>
  <h2>
    {{ 'Contributors' }}
    <a class="header-anchor" mt-6 href="#contributors" aria-label="Permalink to Contributors" />
  </h2>
  <div flex="~ wrap gap-16">
    <em v-if="!authors.length">
      No contributors available.
    </em>
    <template v-else>
      <template v-for="c of authors" :key="c.name">
        <a v-if="(typeof c.url !== 'undefined')" :href="c.url" flex="~ items-center gap-8">
          <img :src="c.avatarUrl" :alt="`The avatar of contributor named as ${c.name}`" f-size-lg rounded-full>
          {{ c.name }}
        </a>
        <div v-else flex="~ items-center gap-8">
          <img :src="c.avatarUrl" :alt="`The avatar of contributor named as ${c.name}`" f-size-lg rounded-full>
          {{ c.name }}
        </div>
      </template>
    </template>
  </div>
</template>
