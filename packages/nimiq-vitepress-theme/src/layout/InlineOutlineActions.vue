<script setup lang="ts">
import { useActionsMenu } from '../composables/useActionsMenu'
import ActionsMenu from './ActionsMenu.vue'

const { allActions, nativeOptions, externalOptions, hasDropdown } = useActionsMenu()
</script>

<template>
  <section v-if="allActions.length > 0">
    <ActionsMenu
      :all-actions="allActions"
      :native-options="nativeOptions"
      :external-options="externalOptions"
      :has-dropdown="hasDropdown"
      variant="inline"
    />
  </section>
</template>
