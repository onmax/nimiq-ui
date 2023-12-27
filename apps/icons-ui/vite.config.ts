import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import { presetIcons, presetUno, presetWind, presetAttributify } from 'unocss'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      presets: [
        presetUno(),
        presetWind(),
        presetAttributify(),
        presetIcons({
          collections: {
          }
        }),
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
