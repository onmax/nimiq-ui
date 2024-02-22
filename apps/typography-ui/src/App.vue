<script setup lang="ts">
import Article from './article.md'
import { useDark,  } from '@vueuse/core'

const isDark = useDark()
</script>

<template>
  <header pt-32 pb-24 font-sans border="b gray-400">
    <div max-w-700 mx-auto dark="text-white">
      <div flex="~ justify-between items-center" dark-text-white>
        <h1 m0>The Nimiq Typography</h1>
        <div flex="~ items-center gap-16">
          <button @click="() => isDark = !isDark" bg="white/20" rounded-6 p-6 border-none cursor-pointer>
            <div i-carbon:light v-if="isDark"></div>
            <div v-else i-carbon:moon></div>
          </button>

          <a href="https://github.com/onmax/nimiq-ui/tree/main/packages/nimiq-typography" bg="white/20" rounded-6 p-6 border-none cursor-pointer >
            <div i-logos:github-icon/> 
          </a>
        </div>
      </div>
      <p op50>
        A CSS stylesheet for the Nimiq typography.
      </p>
      <details mt-8 op50>
        <summary>Installation</summary>
        <div mt-12 pl-16>
          
          <code>npm i nimiq-typography</code>
          <p>
            In your main entry file:
          </p>
          <code>
            import 'nimiq-typography/nimiq-typography.css'
          </code>
        </div>
      </details>
    </div>

  </header>

  <main class="prose" min-h-screen>
    <Article />

    <details>
      <summary>Not Prose</summary>
      <Article class="raw"/>
    </details>
  </main>
</template>

<style>
html,
body {
  background-color: #f8f8f8;
  margin: 0;
  padding: 0;

  .dark & {
    background: #1b1d33;
    color-scheme: dark;
  }
}
</style>
