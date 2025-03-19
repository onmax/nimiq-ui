import type { Plugin } from 'vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { GitChangelog } from '@nolebase/vitepress-plugin-git-changelog/vite'
import UnoCSS from 'unocss/vite'

import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import VueDevTools from 'vite-plugin-vue-devtools'
import { NimiqVitepressVitePlugin } from '../packages/nimiq-vitepress-theme/src/vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  resolve: {
    alias: {
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

    GitChangelog({
      repoURL: 'https://github.com/onmax/nimiq-ui',
    }),
    NimiqVitepressVitePlugin(),
  ],
})
