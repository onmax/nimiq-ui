import { presetNimiq } from 'nimiq-css'
import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    // presetMini(),
    presetUno(),
    presetAttributify(),
    presetNimiq({
      // utilities: true,
      // typography: true,
      // attributifyUtilities: true,
      utilities: true,
      attributifyUtilities: true,
      typography: true,
      staticContent: true,
      fonts: false,
    }),
  ],
})
