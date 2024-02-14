import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import { presetWebFonts, presetAttributify, presetUno, presetIcons } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import Markdown from 'unplugin-vue-markdown/vite'



import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/], // <-- allows Vue to compile Markdown files
    }),
    Markdown({ /* options */ }),
    UnoCSS({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          extraProperties: {
            'font-size': '1.2em',
          },
          collections: {
            carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
            logos: () => import('@iconify-json/logos/icons.json').then(i => i.default),
          }
        }),
        presetWebFonts({
          provider: 'bunny',
          fonts: {
            sans: 'Mulish:400,600,700',
            mono: 'Fira Code:400',
          },
        }),
        presetRemToPx({ baseFontSize: 4 })
      ]
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
