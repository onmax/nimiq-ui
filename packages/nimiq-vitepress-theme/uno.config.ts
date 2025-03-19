import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
import { defineConfig, presetIcons, transformerDirectives } from 'unocss'
import { presetOnmax } from 'unocss-preset-onmax'
import { presetNimiq } from '../nimiq-css/src/index'

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
