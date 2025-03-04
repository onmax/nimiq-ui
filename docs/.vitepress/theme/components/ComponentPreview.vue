<script setup>
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
</script>

<template>
  <TabsRoot w-full defaultValue="preview" f-my-lg class="nq-raw">
    <TabsList relative shrink-0 f-mx-lg flex="~ items-center justify-start gap-x-12" w-max aria-label="See the markdown code and rendered preview">
      <!-- <TabsIndicator absolute px-8 left-0 h-3 bottom-2 w="$reka-tabs-indicator-size" bg-blue
        translate-x="$reka-tabs-indicator-position" translate-y-1 transition="[width,transform]"
        duration-300 /> -->
      <TabsTrigger value="code" aria-label="Code Tab" bg-transparent transition-all data-active:font-semibold  nq-pill-tertiary data-active:nq-pill-blue translate-y-0 shadow-none ring="1.5 neutral-300 data-active:0">Code</TabsTrigger>
      <TabsTrigger value="preview" aria-label="Preview Tab" bg-transparent transition-all data-active:font-semibold  nq-pill-tertiary data-active:nq-pill-blue translate-y-0 shadow-none ring="1.5 neutral-300 data-active:0">Preview</TabsTrigger>
    </TabsList>
    <div of-hidden  f-px-sm>
      <TabsContent value="code" grow bg-white outline-none>
        <slot name="code" />
      </TabsContent>
      <TabsContent value="preview" grow   bg-white outline-none>
        <slot name="default" />
      </TabsContent>
    </div>
  </TabsRoot>
</template>
