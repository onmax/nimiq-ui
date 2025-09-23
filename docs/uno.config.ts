import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
import { defineConfig, presetIcons } from 'unocss'
import { presetOnmax } from 'unocss-preset-onmax'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { presetNimiq } from '../packages/nimiq-css/src/index'

export default defineConfig({
  content: {
    filesystem: ['./.vitepress/config.ts', '../**/**.{vue,md}', './theme/components/**/*.vue', './config.ts'],
  },
  presets: [
    presetOnmax({
      presets: { wind4: { preflights: { theme: { mode: true } } } },
    }),
    presetNimiq({
      utilities: true,
      attributifyUtilities: true,
      typography: true,
      outputCSSLayer: false,
    }),
    presetIcons({
      collections: {
        ...createExternalPackageIconLoader('@iconify-json/tabler'),
        ...createExternalPackageIconLoader('@iconify-json/simple-icons'),
        local: FileSystemIconLoader('public/assets/icons'),
      },
    }),
  ],
  outputToCssLayers: true,
})
