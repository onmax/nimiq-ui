<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'
import { useBreakpoints } from '@vueuse/core'
import { withBase } from 'vitepress'
import { computed } from 'vue'
import { useRandomEmoji } from '../composables/useRandomEmoji'
import DesktopHeader from './DesktopHeader.vue'
import MobileNav from './MobileNav.vue'

const [DefineNotFoundContent, ReuseNotFoundContent] = createReusableTemplate()

const breakpoints = useBreakpoints({ lg: 1224 })
const isMobileOrTablet = breakpoints.smaller('lg')

const { randomEmoji } = useRandomEmoji()

const backUrl = computed(() => {
  if (window.history.length > 1)
    return window.history.state.back
  return '/'
})
</script>

<template>
  <!-- Define the 404 content template -->
  <DefineNotFoundContent>
    <!-- 404 Content -->
    <main flex flex-col items-center justify-center flex-1 f-py-2xl>
      <div text-center mx-auto max-w-520>
        <div f-text-3xl>
          {{ randomEmoji }}
        </div>

        <span f-text-xl f-mt-md font-bold>
          404
        </span>

        <h1 f-text-3xl font-bold mt-8="!" text-neutral>
          Page Not Found
        </h1>

        <p text="f-lg neutral-800" f-mt-xs leading-relaxed>
          Oops! The page you're looking for seems to have vanished into the digital void.
          Don't worry, even the best explorers sometimes take a wrong turn.
        </p>

        <div flex="~ gap-16 items-center justify-center wrap" f-mt-sm>
          <a :href="backUrl" nq-arrow nq-pill-tertiary nq-pill-lg>
            Go Back
          </a>
          <a :href="withBase('/')" nq-arrow nq-pill-blue nq-pill-lg>
            Go Home
          </a>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer un-text="center f-sm neutral-800" f-py-lg mt-auto>
      <p>
        Built with the

        <a href="https://onmax.github.io/nimiq-ui/vitepress-theme/" target="_blank" rel="noopener" un-text-blue>
          Nimiq VitePress Theme
        </a>
      </p>
    </footer>
  </DefineNotFoundContent>

  <div data-layout="error">
    <template v-if="isMobileOrTablet">
      <div min-h-screen bg-neutral-0 flex="~ col">
        <ReuseNotFoundContent />
        <MobileNav fixed bottom-0 />
      </div>
    </template>
    <template v-else>
      <DesktopHeader />
      <div min-h-screen bg-neutral-0 flex="~ col" f-pt-xl>
        <ReuseNotFoundContent />
      </div>
    </template>
  </div>
</template>
