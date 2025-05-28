import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
import { defineConfig, presetIcons, transformerDirectives } from 'unocss'
import { presetOnmax } from 'unocss-preset-onmax'
import { presetNimiq } from '../nimiq-css/src'

console.log('Generating unocss styles...')

export default defineConfig({
  presets: [
    presetOnmax({
      // Remove when https://github.com/unocss/unocss/issues/4694
      presets: { wind4: { preflights: { theme: { mode: true } } } },
    }),
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
