<script setup>
import BasicModalComponent from './BasicModalComponent.vue'
</script>

<template>
  <BasicModalComponent>
    <template #trigger>
      <button>Open Modal</button>
    </template>

    <template #content>
      <p>Modal content</p>
    </template>
  </BasicModalComponent>
</template>
