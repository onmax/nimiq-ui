<script setup lang="ts">
import { useActionsMenu } from '../composables/useActionsMenu'
import { useSecondarySidebar } from '../composables/useSecondarySidebar'
import ActionsMenu from './ActionsMenu.vue'

const { allActions, nativeOptions, externalOptions, hasDropdown } = useActionsMenu()
const { showOutline, headingTree } = useSecondarySidebar()
</script>

<template>
  <div v-if="allActions.length > 0" f-mt-md>
    <hr v-if="showOutline && headingTree.length > 0" border-neutral-400 f-my-md>

    <ActionsMenu
      :all-actions="allActions"
      :native-options="nativeOptions"
      :external-options="externalOptions"
      :has-dropdown="hasDropdown"
      variant="outline"
    />
  </div>
</template>
