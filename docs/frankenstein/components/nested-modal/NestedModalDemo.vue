<script setup>
import NestedModalComponent from './NestedModalComponent.vue'
</script>


<template>
  <NestedModalComponent>
    <template #trigger>
      <button>Open Modal</button>
    </template>

    <template #content>
      <NestedModalComponent nested>
        <template #trigger>
          Open a nested component
        </template>

        <template #content>
          <p>Modal content</p>
        </template>
      </NestedModalComponent>
    </template>
  </NestedModalComponent>
</template>
