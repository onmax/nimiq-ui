import type { PresetWind3Theme } from 'unocss'
import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
import { defineConfig, presetIcons, presetWind3, transformerDirectives } from 'unocss'
import { presetOnmax } from 'unocss-preset-onmax'
import { presetScalePx } from 'unocss-preset-scale-px'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { presetNimiq } from './packages/nimiq-css/src/index'

export default defineConfig<PresetWind3Theme>({
  content: {
    filesystem: ['./.vitepress/config.ts', '../**/**.{vue,md}', './theme/components/**/*.vue', './config.ts'],
  },
  shortcuts: [
    ['stack', 'w-full grid grid-cols-1 grid-rows-1 children:row-span-full children:col-span-full children:self-center children:justify-self-center'],
  ],
  presets: [
    presetWind3(),
    presetScalePx({ spacing: { DEFAULT: '0.0625rem' } }),
    presetOnmax({
      presets: { wind4: false },
    }),
    presetNimiq({
      utilities: true,
      attributifyUtilities: true,
      fonts: {
        fontAssetsDir: './public/assets/fonts',
        fontServeBaseUrl: 'assets/fonts',
      },
      typography: true,
    }),
    presetIcons({
      collections: {
        // ...createExternalPackageIconLoader('nimiq-icons'),
        ...createExternalPackageIconLoader('@iconify-json/tabler'),
        ...createExternalPackageIconLoader('@iconify-json/simple-icons'),
        custom: FileSystemIconLoader('.docs/public/assets/icons'),
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
