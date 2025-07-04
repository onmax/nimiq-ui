<script setup lang="ts">
import type { NimiqVitepressThemeConfig } from '../types'
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'
import { useRandomEmoji } from '../composables/useRandomEmoji'
import CommandMenu from './CommandMenu.vue'
import Logo from './Logo.vue'
import MobileNav from './MobileNav.vue'

const { theme, site } = useData<NimiqVitepressThemeConfig>()
const { randomEmoji } = useRandomEmoji()

const modules = computed(() => theme.value.modules || [])

const quickLinks = computed(() => [
  { text: 'Home', link: '/', icon: 'i-nimiq:home' },
  { text: 'Documentation', link: '/docs', icon: 'i-nimiq:book' },
  { text: 'Examples', link: '/examples', icon: 'i-nimiq:code' },
  { text: 'API Reference', link: '/api', icon: 'i-nimiq:api' },
])

const goBack = () => window.history.back()

function handleSearch() {
  // Trigger the command menu by dispatching the keyboard shortcut
  const event = new KeyboardEvent('keydown', {
    key: 'k',
    metaKey: true,
    bubbles: true,
  })
  document.dispatchEvent(event)
}
</script>

<template>
  <div min-h-screen bg-neutral-0 dark:bg-neutral-1100 flex flex-col>
    <!-- Header -->
    <header flex items-center justify-between px-xl py-lg>
      <Logo />
      <CommandMenu />
    </header>

    <!-- Main Content -->
    <main flex flex-col items-center justify-center flex-1 px-lg py-2xl>
      <div text-center max-w-2xl mx-auto>
        <!-- Error Icon/Emoji -->
        <div text-8xl mb-8>
          {{ randomEmoji }}
        </div>

        <!-- Error Code -->
        <div
          text-8xl font-bold text-transparent bg-clip-text
          bg-gradient-to-r from-blue-500 to-blue-700
          mb-4
        >
          404
        </div>

        <!-- Error Message -->
        <h1 text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-6>
          Page Not Found
        </h1>

        <p text-xl text-neutral-700 dark:text-neutral-300 mb-12 leading-relaxed>
          Oops! The page you're looking for seems to have vanished into the digital void.
          Don't worry, even the best explorers sometimes take a wrong turn.
        </p>

        <!-- Action Buttons -->
        <div flex gap-4 items-center justify-center flex-wrap mb-12>
          <button
            bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg transition-colors
            font-semibold flex items-center gap-2 @click="goBack"
          >
            <div i-nimiq:arrow-left />
            Go Back
          </button>

          <a
            :href="withBase('/')"
            bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700
            text-neutral-900 dark:text-neutral-100 px-8 py-4 rounded-lg
            transition-colors font-semibold flex items-center gap-2
          >
            <div i-nimiq:home />
            Go Home
          </a>
        </div>

        <!-- Search Box -->
        <div mb-12>
          <div
            bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700
            rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer
            @click="handleSearch"
          >
            <div flex items-center gap-3 text-neutral-600 dark:text-neutral-400>
              <div i-nimiq:search text-xl />
              <span>Search for what you're looking for...</span>
              <div
                ml-auto px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-700
                text-xs font-mono text-neutral-500 dark:text-neutral-400
              >
                ⌘K
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div v-if="quickLinks.length" text-center>
          <h2 text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6>
            Quick Links
          </h2>
          <div grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto>
            <a
              v-for="link in quickLinks"
              :key="link.text"
              :href="withBase(link.link)"
              bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700
              border border-neutral-300 dark:border-neutral-700 rounded-lg p-4
              flex items-center gap-3 transition-colors hover:shadow-lg
            >
              <div :class="link.icon" text-lg text-blue-500 />
              <span font-medium text-neutral-900 dark:text-neutral-100>
                {{ link.text }}
              </span>
            </a>
          </div>
        </div>

        <!-- Modules Grid (if available) -->
        <div v-if="modules.length" text-center mt-12>
          <h2 text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6>
            Explore Modules
          </h2>
          <div grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto>
            <a
              v-for="module in modules"
              :key="module.text"
              :href="withBase(module.defaultPageLink)"
              bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700
              border border-neutral-300 dark:border-neutral-700 rounded-lg p-6
              text-left transition-colors hover:shadow-lg
            >
              <div v-if="module.icon" :class="module.icon" text-2xl text-blue-500 mb-3 />
              <h3 font-semibold text-neutral-900 dark:text-neutral-100 mb-2>
                {{ module.text }}
              </h3>
              <p v-if="module.description" text-sm text-neutral-600 dark:text-neutral-400>
                {{ module.description }}
              </p>
            </a>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer text-center py-lg text-sm text-neutral-500 dark:text-neutral-400>
      <p>
        © {{ new Date().getFullYear() }} {{ site.title }}.
        Built with the
        <a
          href="https://onmax.github.io/nimiq-ui/vitepress-theme/"
          target="_blank"
          rel="noopener"
          text-blue-500 hover:text-blue-600 underline transition-colors
        >
          Nimiq VitePress Theme
        </a>
      </p>
    </footer>

    <!-- Mobile Navigation -->
    <MobileNav />
  </div>
</template>
