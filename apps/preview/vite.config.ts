import { env } from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

import Markdown from 'unplugin-vue-markdown/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: env.BASE_URL,
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    UnoCSS(),
    Markdown({ /* options */ }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
