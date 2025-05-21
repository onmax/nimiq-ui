import type { Plugin } from 'vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import UnoCSS from 'unocss/vite'

import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import VueDevTools from 'vite-plugin-vue-devtools'
import { NimiqVitepressVitePlugin } from '../packages/nimiq-vitepress-theme/src/vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig(async () => ({
  resolve: {
    alias: {
      'nimiq-vitepress-theme': resolve(__dirname, '../packages/nimiq-vitepress-theme/src/'),
    },
  },
  plugins: [
    VueDevTools() as Plugin,
    Inspect(),
    UnoCSS(),
    NimiqVitepressVitePlugin({
      gitChangelog: { repoURL: 'https://github.com/onmax/nimiq-ui' },
    }),
  ],
}))
