import { defineConfig, presetAttributify, presetMini, presetUno } from 'unocss'
import { presetNimiq } from 'nimiq-css'

export default defineConfig({
  presets: [
    // presetMini(),
    presetUno(),
    presetAttributify(),
    presetNimiq({
      utilities: true,
      typography: true,
      attributifyUtilities: true,
    }),
  ],
})
