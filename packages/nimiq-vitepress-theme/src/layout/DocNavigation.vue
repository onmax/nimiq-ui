<script setup lang="ts">
import { useDocNavigation } from '../composables/useDocNavigation'
import { humanizeText } from '../utils/textUtils'

const { navigation, showNavigation } = useDocNavigation()
</script>

<template>
  <nav v-if="showNavigation && (navigation.prev || navigation.next)" grid="~ cols-2 gap-4 md:gap-8" items-stretch class="nq-raw">
    <a
      v-if="navigation.prev"
      col-1
      :href="navigation.prev.link"
      nq-hoverable
      h-full
      group
      gap-2
      :class="{ 'col-span-2': navigation.prev && !navigation.next }"
    >
      <div i-nimiq:arrow-left size-14 shrink-0 op="60 group-hocus:80" transition-opacity />
      <p f-text="md md:xl">{{ humanizeText(navigation.prev.text) }}</p>
    </a>

    <a
      v-if="navigation.next"
      md:col-2
      :href="navigation.next.link"
      nq-hoverable
      items-end
      h-full
      group
      gap-2
      :class="{ 'col-span-2': navigation.next && !navigation.prev }"
    >
      <div i-nimiq:arrow-right size-14 shrink-0 op="60 group-hocus:80" transition-opacity />
      <p f-text="md md:xl">{{ humanizeText(navigation.next.text) }}</p>
    </a>
  </nav>
</template>
