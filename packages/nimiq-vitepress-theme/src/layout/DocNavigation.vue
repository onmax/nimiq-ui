<script setup lang="ts">
import { useDocNavigation } from '../composables/useDocNavigation'
import { humanizeText } from '../utils/textUtils'

const { navigation, showNavigation } = useDocNavigation()
</script>

<template>
  <nav v-if="showNavigation && (navigation.prev || navigation.next)" grid="~ cols-1 md:cols-2 gap-8" class="nq-raw">
    <a v-if="navigation.prev" col-1 :href="navigation.prev.link" nq-hoverable h-max group gap-2>
      <div i-nimiq:arrow-left size-14 shrink-0 op="60 group-hocus:80" transition-opacity />
      <p f-text-xl>{{ humanizeText(navigation.prev.text) }}</p>
    </a>

    <a v-if="navigation.next" md:col-2 :href="navigation.next.link" nq-hoverable items-end h-max group gap-2>
      <div i-nimiq:arrow-right size-14 shrink-0 op="60 group-hocus:80" transition-opacity />
      <p f-text-xl>{{ humanizeText(navigation.next.text) }}</p>
    </a>
  </nav>
</template>
