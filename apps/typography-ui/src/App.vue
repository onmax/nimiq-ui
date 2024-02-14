<script setup lang="ts">
import Article from './article.md'
</script>

<template>
  <header  pt-32 pb-24 font-sans border="b gray-400">
    <div max-w-700 mx-auto>
      <div flex="~ justify-between items-center">
        <h1 m0>The Nimiq Typography</h1>
        <a href="https://github.com/onmax/nimiq-ui/tree/main/packages/nimiq-typography" class="text-blue-500">GitHub</a>
        <div i-logos:github />
      </div>
      <p>
        A CSS stylesheet for the Nimiq typography.
      </p>
      <details mt-8>
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
  </main>
</template>

<style>
html,
body {
  background-color: #f8f8f8;
  margin: 0;
  padding: 0;
}
</style>
