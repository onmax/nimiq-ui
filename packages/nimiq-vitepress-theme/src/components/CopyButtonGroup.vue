<script setup lang="ts">
import { DropdownMenu} from 'reka-ui/namespaced'
import { Motion } from 'motion-v'
import { useSourceCode } from '../composables/useSourceCode'

const {
  showCopyMarkdown,
  copyMarkdownContent,
  copied,
  copyMarkdownLink,
  chatGPTUrl,
  claudeUrl,
  sourceCodeUrl,
  copyOptionsConfig,
  hasDropdownOptions,
} = useSourceCode()
</script>

<template>
  <div v-if="showCopyMarkdown" flex="~ items-center" outline="1 ~ neutral-500" rounded-8 h-28>
    <button
      :class="hasDropdownOptions ? 'rounded-r-0 border-r border-neutral-500' : ''"
      f-text-xs f-px-2xs py-4 font-medium transition-all flex="~ items-center gap-8"
      relative
      @click="copyMarkdownContent"
    >
      <Motion
        :animate="{
          opacity: copied ? 0 : 1,
          y: copied ? -8 : 0,
          filter: copied ? 'blur(2px)' : 'blur(0px)'
        }"
        :transition="{ duration: 0.2, ease: 'easeOut' }"
        class="i-nimiq:copy"
        style="width: 14px; height: 14px;"
      />
      <Motion
        v-if="copied"
        :initial="{ opacity: 0, y: 8, filter: 'blur(2px)' }"
        :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.2, ease: 'easeOut' }"
        class="absolute i-nimiq:check text-green"
        style="width: 14px; height: 14px;"
      />
      <span select-none font-semibold relative overflow-hidden>
        <Motion
          :animate="{
            opacity: copied ? 0 : 1,
            y: copied ? -20 : 0,
            filter: copied ? 'blur(4px)' : 'blur(0px)'
          }"
          :transition="{ duration: 0.2, ease: 'easeOut' }"
        >
          Copy page
        </Motion>
        <Motion
          v-if="copied"
          class="absolute inset-0 flex items-center text-green"
          :initial="{ opacity: 0, y: 20, filter: 'blur(4px)' }"
          :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
          :transition="{ duration: 0.2, ease: 'easeOut' }"
        >
          Copied!
        </Motion>
      </span>
    </button>

    <!-- Dropdown menu for additional copy options -->
    <DropdownMenu.Root v-if="hasDropdownOptions">
      <DropdownMenu.Trigger bg="transparent hocus:neutral-200" px-8 h-full border-0 py-9 rounded="l-0 r-8" transition-all f-text-xs flex="~ items-center justify-center" aria-label="More copy options">
          <div size-10 op-80 i-nimiq:chevron-down />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content min-w-192 bg="neutral-50" rounded-8 shadow outline="neutral/6! offset--1.5 1.5! ~" p-4 z-50
        side="bottom"
        align="end"
        :side-offset="8"
        :avoid-collisions="false"
        :collision-padding="0"
      >
        <DropdownMenu.Item v-if="copyOptionsConfig.markdownLink" flex="~ items-center gap-12" px-8 py-4 text="f-xs text-neutral-900" bg="transparent hocus:neutral-200" group transition-colors rounded-4 cursor-pointer @click="copyMarkdownLink">
          <div size-16 i-nimiq:link text="neutral-600 group-hocus:neutral-700" transition-colors  />
          <span>Copy Markdown Link</span>
        </DropdownMenu.Item>
        
        <DropdownMenu.Item v-if="copyOptionsConfig.viewMarkdown" as="a" :href="sourceCodeUrl" target="_blank" rel="noopener noreferrer" flex="~ items-center gap-12" px-8 py-4 un-text="f-xs text-neutral-900" bg="transparent hocus:neutral-200" transition-colors rounded-4 cursor-pointer nq-arrow after:op-60  after:ml-auto  group>
          <div size-16 i-nimiq:logos-github-mono text="neutral-600 group-hocus:neutral-700" transition-colors  />
          <span>View as Markdown</span>
        </DropdownMenu.Item>

        <DropdownMenu.Item v-if="copyOptionsConfig.chatgpt" as="a" :href="chatGPTUrl" target="_blank" rel="noopener noreferrer" flex="~ items-center gap-12" px-8 py-4 un-text="f-xs text-neutral-900" bg="transparent hocus:neutral-200" transition-colors rounded-4 cursor-pointer nq-arrow after:op-60 after:ml-auto group>
          <div size-16 i-simple-icons:openai text="neutral-600 group-hocus:neutral-700" transition-colors  />
          <span>Open in ChatGPT</span>
        </DropdownMenu.Item>

        <DropdownMenu.Item v-if="copyOptionsConfig.claude" as="a" :href="claudeUrl" target="_blank" rel="noopener noreferrer" flex="~ items-center gap-12" px-8 py-4 un-text="f-xs text-neutral-900" bg="transparent hocus:neutral-200" transition-colors rounded-4 cursor-pointer nq-arrow after:op-60  after:ml-auto  group>
          <div size-16 i-simple-icons:claude text="neutral-600 group-hocus:neutral-700" transition-colors  />
          <span>Open in Claude</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
</template>
