<script setup lang="ts">
import ActionsMenu from '../components/ActionsMenu.vue'
import { useOutlineActions } from '../composables/useOutlineActions'

const { allActions, nativeOptions, externalOptions, hasDropdown } = useOutlineActions()
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
