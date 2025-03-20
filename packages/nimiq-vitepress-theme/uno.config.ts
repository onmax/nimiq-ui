import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
import { presetNimiq } from 'nimiq-css'
import { defineConfig, presetIcons, transformerDirectives } from 'unocss'
import { presetOnmax } from 'unocss-preset-onmax'

console.log('Generating unocss styles...')

export default defineConfig({
  presets: [
    presetOnmax(),
    presetNimiq({
      utilities: true,
      attributifyUtilities: true,
      fonts: false,
      typography: true,
    }),
    presetIcons({
      collections: {
        ...createExternalPackageIconLoader('@iconify-json/tabler'),
        ...createExternalPackageIconLoader('nimiq-icons'),
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
