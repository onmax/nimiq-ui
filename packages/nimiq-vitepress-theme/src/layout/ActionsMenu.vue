<script setup lang="ts">
import type { OutlineAction } from '../types'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger, Separator } from 'reka-ui'

const { allActions, nativeOptions, externalOptions, hasDropdown, variant = 'outline' } = defineProps<{
  allActions: OutlineAction[]
  nativeOptions: OutlineAction[]
  externalOptions: OutlineAction[]
  hasDropdown: boolean
  variant?: 'outline' | 'inline' | 'sidebar'
}>()
</script>

<template>
  <!-- Outline variant (vertical with hover background) -->
  <div v-if="variant === 'outline' && allActions.length > 0" flex="~ col gap-4">
    <div
      v-for="(action, index) in allActions"
      :key="`${action.label}-${action.icon}-${index}`"
      flex="~ items-center justify-between"
      relative
    >
      <div flex="~ items-center gap-8" flex-1 p-4 cursor-pointer hover:bg-neutral-100 rounded-6 transition-colors text="f-xs neutral-800" @click="() => action.onClick()">
        <div :class="action.icon" />
        <span>{{ action.label }}</span>
      </div>

      <PopoverRoot v-if="index === 0 && hasDropdown">
        <PopoverTrigger as-child>
          <button type="button" p-6 hover:bg-neutral-100 rounded-6 transition-colors>
            <div i-tabler:dots />
          </button>
        </PopoverTrigger>

        <PopoverPortal>
          <PopoverContent
            side="top"
            align="end"
            :side-offset="4"
            :avoid-collisions="true"
            min-w-200
            bg-white
            rounded-8
            shadow-lg
            border="1 neutral-200"
            py-6
          >
            <div v-for="(option, idx) in nativeOptions" :key="`native-${idx}`" flex="~ items-center gap-8" px-10 py-6 cursor-pointer hover:bg-neutral-100 transition-colors f-text-xs text-neutral-800 @click="option.onClick">
              <div :class="option.icon" text-14 />
              <span>{{ option.label }}</span>
            </div>

            <Separator v-if="nativeOptions.length > 0 && externalOptions.length > 0" my-4 h-1 bg-neutral-200 />

            <button v-for="(option, idx) in externalOptions" :key="`external-${idx}`" flex="~ items-center gap-8" px-10 py-6 cursor-pointer bg="transparent hocus:neutral-100" transition-colors text="f-xs neutral-800" @click="option.onClick">
              <div :class="option.icon" text-14 />
              <span>{{ option.label }}</span>
            </button>
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
    </div>
  </div>

  <!-- Inline variant (horizontal with borders) -->
  <div v-else-if="variant === 'inline' && allActions.length > 0" flex="~ gap-8 items-center wrap" f-my-md>
    <button
      v-for="(action, index) in allActions"
      :key="`${action.label}-${action.icon}-${index}`"
      type="button"
      flex="~ items-center gap-8"
      p="x-12 y-8"
      cursor-pointer
      hover:bg-neutral-100
      rounded-6
      transition-colors
      f-text-xs
      text-neutral-800
      border="1 neutral-300"
      @click="() => action.onClick()"
    >
      <div :class="action.icon" />
      <span>{{ action.label }}</span>
    </button>

    <PopoverRoot v-if="hasDropdown">
      <PopoverTrigger as-child>
        <button
          type="button"
          p="x-8 y-8"
          hover:bg-neutral-100
          rounded-6
          transition-colors
          border="1 neutral-300"
        >
          <div i-tabler:dots />
        </button>
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent
          side="top"
          align="start"
          :side-offset="4"
          :avoid-collisions="true"
          min-w-200
          bg-white
          rounded-8
          shadow-lg
          border="1 neutral-200"
          py-6
        >
          <div v-for="(option, idx) in nativeOptions" :key="`native-${idx}`" flex="~ items-center gap-8" px-10 py-6 cursor-pointer hover:bg-neutral-100 transition-colors f-text-xs text-neutral-800 @click="option.onClick">
            <div :class="option.icon" text-14 />
            <span>{{ option.label }}</span>
          </div>

          <Separator v-if="nativeOptions.length > 0 && externalOptions.length > 0" my-4 h-1 bg-neutral-200 />

          <div v-for="(option, idx) in externalOptions" :key="`external-${idx}`" flex="~ items-center gap-8" px-10 py-6 cursor-pointer hover:bg-neutral-100 transition-colors f-text-xs text-neutral-800 @click="option.onClick">
            <div :class="option.icon" text-14 />
            <span>{{ option.label }}</span>
          </div>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </div>

  <!-- Sidebar variant (vertical with buttons) -->
  <div v-else-if="variant === 'sidebar' && allActions.length > 0" flex="~ col gap-4">
    <div
      v-for="(action, index) in allActions"
      :key="`${action.label}-${action.icon}-${index}`"
      flex="~ items-center justify-between"
      relative
    >
      <button
        type="button"
        flex="~ items-center gap-8"
        py-8
        px-8
        rounded-4
        bg-transparent
        text-neutral-800
        hover:bg-neutral-300
        transition-colors
        f-text-xs
        text-left
        w-full
        @click="action.onClick"
      >
        <div :class="action.icon" text-14 />
        <span>{{ action.label }}</span>
      </button>

      <PopoverRoot v-if="index === 0 && hasDropdown">
        <PopoverTrigger as-child>
          <button type="button" p-6 hover:bg-neutral-100 rounded-6 transition-colors absolute right-8 top-8>
            <div i-tabler:dots />
          </button>
        </PopoverTrigger>

        <PopoverPortal>
          <PopoverContent
            side="top"
            align="end"
            :side-offset="4"
            :avoid-collisions="true"
            min-w-200
            bg-white
            rounded-8
            shadow-lg
            border="1 neutral-200"
            py-6
          >
            <div v-for="(option, idx) in nativeOptions" :key="`native-${idx}`" flex="~ items-center gap-8" px-10 py-6 cursor-pointer hover:bg-neutral-100 transition-colors f-text-xs text-neutral-800 @click="option.onClick">
              <div :class="option.icon" text-14 />
              <span>{{ option.label }}</span>
            </div>

            <Separator v-if="nativeOptions.length > 0 && externalOptions.length > 0" my-4 h-1 bg-neutral-200 />

            <div v-for="(option, idx) in externalOptions" :key="`external-${idx}`" flex="~ items-center gap-8" px-10 py-6 cursor-pointer hover:bg-neutral-100 transition-colors f-text-xs text-neutral-800 @click="option.onClick">
              <div :class="option.icon" text-14 />
              <span>{{ option.label }}</span>
            </div>
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
    </div>
  </div>
</template>
