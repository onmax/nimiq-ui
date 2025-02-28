import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
import { defineConfig, presetAttributify, presetIcons, presetWind3, transformerDirectives } from 'unocss'
import { presetFluidSizing } from 'unocss-preset-fluid-sizing'
import { presetScalePx } from 'unocss-preset-scale-px'
import { presetNimiq } from '../nimiq-css/src/index'

export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify(),
    presetNimiq({
      utilities: true,
      attributifyUtilities: true,
      fonts: false,
      typography: true,
    }),
    presetScalePx(),
    presetFluidSizing(),
    presetIcons({
      collections: {
        ...createExternalPackageIconLoader('@iconify-json/tabler'),
        ...createExternalPackageIconLoader('@iconify-json/nimiq'),
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
