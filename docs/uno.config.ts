import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
import { defineConfig, presetAttributify, presetIcons, presetWind3, transformerDirectives } from 'unocss'
import { presetFluidSizing } from 'unocss-preset-fluid-sizing'
import { presetScalePx } from 'unocss-preset-scale-px'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { presetNimiq } from '../packages/nimiq-css/src/index'

export default defineConfig({
  content: {
    filesystem: ['./.vitepress/config.ts', '../**/*.{vue,md}', './theme/components/**/*.vue', './config.ts'],
  },
  presets: [
    presetWind3(),
    presetAttributify(),
    presetNimiq({
      utilities: true,
      attributifyUtilities: true,
      fonts: {
        fontAssetsDir: './public/assets/fonts',
        fontServeBaseUrl: 'assets/fonts',
      },
      typography: true,
    }),
    presetScalePx(),
    presetFluidSizing(),
    presetIcons({
      collections: {
        ...createExternalPackageIconLoader('@iconify-json/nimiq'),
        ...createExternalPackageIconLoader('@iconify-json/tabler'),
        custom: FileSystemIconLoader('./public/assets/icons'),
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
