import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
import { defineConfig, presetIcons, transformerDirectives } from 'unocss'
import { presetOnmax } from 'unocss-preset-onmax'
import { presetNimiq } from '../nimiq-css/src'

console.log('Generating unocss styles...')

export default defineConfig({
  presets: [
    presetOnmax({
      presets: { wind4: { preflights: { theme: { mode: true } } } },
    }),
    presetNimiq({
      utilities: true,
      attributifyUtilities: true,
      fonts: false,
      typography: true,
      staticContent: true,
    }),
    presetIcons({
      collections: {
        ...createExternalPackageIconLoader('@iconify-json/tabler'),
        ...createExternalPackageIconLoader('@iconify-json/simple-icons'),
        ...createExternalPackageIconLoader('nimiq-icons'),
      },
    }),
  ],
  transformers: [transformerDirectives()],
  variants: [
    (matcher) => {
      if (!matcher.startsWith('copied:'))
        return matcher
      return {
        matcher: matcher.slice(6),
        selector: s => `[data-state="copied"]${s}`,
      }
    },
  ],
})
