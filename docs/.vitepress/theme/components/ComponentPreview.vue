<script setup>
import { Tabs } from 'reka-ui/namespaced'
import NqPlayground from './NqPlayground.vue'
</script>

<template>
  <Tabs.Root w-full default-value="preview" f-my-lg class="nq-raw component-preview">
    <Tabs.List
      relative shrink-0 flex="~ items-center justify-start" w-max
      aria-label="See the markdown code and rendered preview" bg-neutral-400 rounded-full outline-blue
    >
      <Tabs.Indicator
        w="$reka-tabs-indicator-size" translate-x="$reka-tabs-indicator-position" absolute rounded-full
        transition="[width,transform]" bg-neutral-0 inset-y-2 duration-300
      />
      <Tabs.Trigger
        value="code" aria-label="Code Tab" z-1 font-semibold ml-2 f-px-2xs py-2 outline="blue offset-1"
        rounded-full
      >
        Code
      </Tabs.Trigger>
      <Tabs.Trigger
        value="preview" aria-label="Preview Tab" z-1 font-semibold mr-2 f-px-2xs py-2
        outline="blue offset-1" rounded-full
      >
        Preview
      </Tabs.Trigger>
    </Tabs.List>
    <div>
      <Tabs.Content value="code" grow outline-none>
        <slot name="code" />
      </Tabs.Content>
      <Tabs.Content value="preview" grow outline-none my-1lh>
        <NqPlayground>
          <slot name="default" />
        </NqPlayground>
      </Tabs.Content>
    </div>
  </Tabs.Root>
</template>

<style>
.component-preview [class*='language-'] pre {
  font-size: 1em;
}
</style>
