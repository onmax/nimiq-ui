import type { Plugin } from 'vite'
import { dirname, resolve } from 'node:path'
import { env } from 'node:process'

import { fileURLToPath } from 'node:url'
import UnoCSS from 'unocss/vite'

import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import VueDevTools from 'vite-plugin-vue-devtools'

function getVueProdHydrationMismatchDetailsFlag() {
  if (!env) {
    console.warn('WARNING: env is not available when trying to get Vue Prod Hydration Mismatch Details Flag')
    throw new Error('env is not available')
  }

  return !!env.VUE_PROD_HYDRATION_MISMATCH_DETAILS_FLAG
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: getVueProdHydrationMismatchDetailsFlag(),
  },
  optimizeDeps: {
    exclude: [
      'vitepress',
    ],
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './'),
      'nimiq-vitepress-theme': resolve(__dirname, '../packages/nimiq-vitepress-theme/src/'),
    },
  },
  plugins: [
    VueDevTools() as Plugin,
    Inspect({
      build: true,
      outputDir: '.vite-inspect',
    }),
    UnoCSS(),
  ],
})
