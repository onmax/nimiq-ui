import { type Preset, type PresetFactory, definePreset, presetWebFonts } from 'unocss'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname, relative } from 'node:path'
import { toJSON, toCSS } from 'ts-cssjson'
import { getNimiqColors } from './colors';
import presetRemToPx, { type RemToPxOptions } from '@unocss/preset-rem-to-px'
import { ofetch } from 'ofetch'
import { fileURLToPath } from 'node:url';

export type NimiqPresetOptions = {
  /**
   * Whether to include the default Nimiq font via bunny
   * 
   * @default true
   */
  fonts?: boolean;

  /**
   * Whether to include the preflight styles of Nimiq.
   * It sets the default styles for the entire page.
   * 
   * @default true
   */
  preflight?: boolean

  /**
   * Add support for `prose` class which adds Nimiq styles for articles
   * 
   * @default false
   */
  typography?: boolean

  /**
   * Add support for components
   * @default false
   */
  components?: boolean

  /**
   * Whether to include the rem to px preset
   * 
   * @example remToPx: true -> m-4 == margin: 1rem (16px)
   * @example remToPx: false -> m-4 == margin: 0.25rem (4px)
   * 
   * @default true
   */
  remToPx?: boolean

  /**
   * Whether to add a reset for the styles
   *
   * @default true
   */
  reset?: boolean
}

function createPreset() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const _cssDir = resolve(__dirname, '../css')
  const nodeModules = resolve(__dirname, '../../node_modules')
  const unminifiedFolder = resolve(_cssDir, 'unminified')
  const unminifiedExists = existsSync(unminifiedFolder)
  const cssDir = unminifiedExists ? unminifiedFolder : _cssDir
  const p = (name: string) => `${cssDir}/${name}.css`
  const readContent = (path: string) => readFileSync(path, 'utf-8')
  const wrapContentToLayer = (name: string) => `@layer nq-${name} { ${readContent(p(name))} }`

  function cssToRules(name: string) {
    const rules: Preset["rules"] = []
    const content = readContent(p(name)).replaceAll("data:image/svg+xml;", 'SEMICOLON_BUG_HACK')
    const json = toJSON(content, { stripComments: true, comments: false, ordered: false, split: false })
    for (const key of Object.keys(json.children)) {
      const rulesNames = key.split(',').map(s => s.trim())
      const css = toCSS(json.children[key]).replaceAll('SEMICOLON_BUG_HACK', "data:image/svg+xml;")
      for (const rule of rulesNames) {
        const ruleName = rule.replace(/^\./, '')
        rules.push([new RegExp(`^${ruleName}$`), () => `@layer nq-${name} { ${rule}, [${ruleName}] { ${css} }}`, { layer: `nq-${name}` }])
      }
    }
    return rules
  }

  return (options: NimiqPresetOptions = {}): Preset => {
    const { backgroundImage, colors } = getNimiqColors()

    const { preflight = true, reset = true } = options
    const preflights: Preset["preflights"] = [{ layer: 'nq-colors', getCSS: () => wrapContentToLayer('colors') }]

    if (preflight)
      preflights.push({ layer: 'nq-preflight', getCSS: () => wrapContentToLayer('preflight') })
    if (reset)
      preflights.push({
        layer: 'tw-reset',
        getCSS: async () => `@layer tw-reset { ${readContent(resolve(nodeModules, '@unocss/reset/tailwind.css'))} }`
      })


  const { components = false, typography = false } = options
  const rules: Preset["rules"] = []

  if (components)
    rules.push(...cssToRules('components'))

  if (typography)
    rules.push(...cssToRules('typography'))

  const { fonts = true, remToPx = true } = options
  const presets: Preset["presets"] = []
  if (fonts) {
    presets.push(presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: 'Mulish:400,600,700',
        mono: 'Fira Code:400',
      }
    }))
  }
  if (remToPx) {
    presets.push(presetRemToPx({ base: 4 } as RemToPxOptions))
  }

  const variants: Preset["variants"] = [
    (matcher) => {
      if (!matcher.startsWith('inverted:'))
        return matcher
      return {
        matcher: matcher.slice(9),
        selector: s => `:is([data-inverted],.inverted) ${s}`,
      }
    },
  ]

  const preset: Preset = {
    name: 'nimiq-preset',
    preflights,
    variants,
    theme: { colors, backgroundImage },
    presets,
    rules,
    layers: {
      'tw-reset': -1,
      'nq-colors': -1,
      'components': 0,
      'utilities': 10,
      'nq-preflight': 20,
      'nq-typography': 30,
      'nq-components': 40
    },
    layer: 'nq'
  }
  return preset
}
}

export const presetNimiq: PresetFactory<object, NimiqPresetOptions> = definePreset(createPreset())

