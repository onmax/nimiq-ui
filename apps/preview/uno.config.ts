import { defineConfig, presetAttributify, presetUno, presetMini, presetIcons } from 'unocss'
import { presetNimiq } from 'nimiq-css'

export default defineConfig({
  presets: [
    presetMini(),
    presetUno(),
    presetAttributify(),
    presetNimiq({
      utilities: true,
      typography: true,
    }),
    presetIcons({
      collections: {
      },
    }),
  ]
})
