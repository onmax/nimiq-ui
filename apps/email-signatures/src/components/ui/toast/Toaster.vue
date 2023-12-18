<script setup lang="ts">
import { isVNode } from 'vue'
import { useToast } from './use-toast'
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '.'

const { toasts } = useToast()
</script>

<template>
  <ToastProvider>
    <Toast v-for="toast in toasts" :key="toast.id" v-bind="toast" class="flex flex-col items-start gap-1">
      <ToastTitle v-if="toast.title">
        {{ toast.title }}
      </ToastTitle>
      <template v-if="toast.description">
        <ToastDescription v-if="isVNode(toast.description)">
          <component :is="toast.description" />
        </ToastDescription>
        <ToastDescription v-else>
          {{ toast.description }}
        </ToastDescription>
      </template>
      <ToastClose />
      <component class="self-end mt-3" :is="toast.action" />
    </Toast>
    <ToastViewport />
  </ToastProvider>
</template>
