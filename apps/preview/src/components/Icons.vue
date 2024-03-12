<script setup lang="ts">
import { ref, onMounted } from 'vue';
import iconsData from '../../../../packages/nimiq-icons/dist/icons.json';
import { Icon, listIcons, addCollection } from '@iconify/vue';

// Create a reactive data property for the icons
const iconList = ref<string[]>([]);

onMounted(() => {
  addCollection(iconsData);
  iconList.value = listIcons();
})
</script>

<template>
   <ul flex flex-wrap select-none justify-center text-2xl text-dark-600 dark:text-dark-900>
    <li flex="~ col gap-x-2 items-center" m-2 v-for="icon in iconList" :key="icon" w-max>
      <Icon :icon="icon" />
      <span text-xs op40>{{ icon.replace('nimiq:','') }}</span>
    </li>
  </ul>
</template>
