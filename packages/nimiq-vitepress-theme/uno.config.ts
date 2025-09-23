import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { defineConfig, presetIcons, transformerDirectives } from 'unocss'
import { presetOnmax } from 'unocss-preset-onmax'
import { presetNimiq } from '../nimiq-css/src'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
console.log('Generating unocss styles...', resolve(__dirname, './src/assets/icons'))

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
        ...createExternalPackageIconLoader('nimiq-icons'),
        local: FileSystemIconLoader(resolve(__dirname, './src/assets/icons')),
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
