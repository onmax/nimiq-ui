<script setup lang="ts">
import { useDocNavigation } from '../composables/useDocNavigation'

const { navigation, showNavigation } = useDocNavigation()
</script>

<template>
  <nav v-if="showNavigation && (navigation.prev || navigation.next)" flex="~ gap-8" justify-between f-mt-lg>
    <a v-if="navigation.prev" :href="navigation.prev.link" nq-hoverable flex="~ gap-8" items-center un-text-neutral-800>
      <div i-nimiq:arrow-left text-16 />
      <div>
        <div text-neutral-700 f-text-2xs>Previous</div>
        <div f-text-sm>{{ navigation.prev.text }}</div>
      </div>
    </a>
    <div v-else />

    <a v-if="navigation.next" :href="navigation.next.link" nq-hoverable flex="~ gap-8" items-center un-text-neutral-800>
      <div>
        <div text-neutral-700 f-text-2xs>Next</div>
        <div f-text-sm>{{ navigation.next.text }}</div>
      </div>
      <div i-nimiq:arrow-right text-16 />
    </a>
    <div v-else />
  </nav>
</template>
