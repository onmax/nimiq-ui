import { defineConfig, presetAttributify, presetUno } from 'unocss'
import { presetNimiq } from 'nimiq-css'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetNimiq({
      utilities: true,
      typography: true,
    }),
  ]
})
