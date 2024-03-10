import { type Preset, type PresetFactory, definePreset, presetWebFonts, presetIcons } from 'unocss'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { toJSON, toCSS } from 'ts-cssjson'
import { NimiqColor, getNimiqColors } from './colors';
import { fileURLToPath } from 'node:url';
import { rules } from 'unocss/preset-wind';

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
   * Add support for utilities
   * @default false
   */
  utilities?: boolean

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
  const unminifiedFolder = resolve(_cssDir, 'unminified')
  const unminifiedExists = existsSync(unminifiedFolder)
  const cssDir = unminifiedExists ? unminifiedFolder : _cssDir
  const p = (name: string) => `${cssDir}/${name}.css`
  const readContent = (path: string) => readFileSync(path, 'utf-8')
  const wrapContentToLayer = (name: string) => `${readContent(p(name))}`

  function cssToRules(name: string) {
    type Setup = { css: string, re: RegExp }
    const rulesSetup: Record<string, Setup> = {}

    const content = readContent(p(name)).replaceAll("data:image/svg+xml;", 'SEMICOLON_BUG_HACK')
    const json = toJSON(content, { stripComments: true, comments: false, ordered: false, split: false })
    for (const key of Object.keys(json.children)) {
      const rulesNames = key.split(',').map(s => s.trim())
      const css = toCSS(json.children[key]).replaceAll('SEMICOLON_BUG_HACK', "data:image/svg+xml;")
      for (const rule of rulesNames) {
        if (!rule.startsWith('.'))
          continue
        const ruleName = rule.replace(/^\./, '')
        const re = new RegExp(`^${ruleName}$`)
        const selector = `${rule}, [${ruleName}]`
        const setup: Setup = { css, re }
        if (rulesSetup[selector])
          rulesSetup[selector].css += css
        else
          rulesSetup[selector] = setup
      }
    }
    const rules: Preset["rules"] = Object.entries(rulesSetup).map(([selector, { css, re }]) => ([re, () => `${selector} { ${css} }`, { layer: `nq-${name}` }]))
    return rules

  }

  return (options: NimiqPresetOptions = {}): Preset => {
    const { gradients, colors } = getNimiqColors()

    const { preflight = true, reset = true } = options
    // regex to replace all rgb(r, b, g) with "r, b, g"
    const replaceRGB = (s: string) => s.replaceAll(/rgb\((\d+), (\d+), (\d+)\)/g, '$1 $2 $3')
    const preflights: Preset["preflights"] = [{ layer: 'nq-colors', getCSS: () => replaceRGB(wrapContentToLayer('colors')) }]

    if (preflight)
      preflights.push({ layer: 'nq-preflight', getCSS: () => wrapContentToLayer('preflight') })
    if (reset) {
      const twReset = fetch('https://raw.githubusercontent.com/unocss/unocss/main/packages/reset/tailwind-compat.css').then(r => r.text())
      preflights.push({
        layer: 'tw-reset',
        getCSS: async () => `@layer tw-reset { ${await twReset} }`
      })
    }


    const { utilities = false, typography = false } = options
    const rules: Preset["rules"] = [
      [/^scrollbar-hide$/, (_, { constructCSS }) => {
        let res = constructCSS({ 'scrollbar-width': 'none' })
        res += `\n${res.replace('{scrollbar-width:none;}', '::-webkit-scrollbar{display: none;}')}`
        return res
      }],
    ]

    // The only way to add gradients is via rules
    for (const [key, gradient] of gradients) {
      rules.push([key, { 'background-image': gradient }])
    }

    if (utilities) {
      rules.push(...cssToRules('utilities'))
    }

    if (typography)
      rules.push(...cssToRules('typography'))

    const { fonts = true } = options
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
      theme: { colors },
      presets,
      rules,
      layers: {
        'tw-reset': -1,
        'nq-colors': -1,
        'components': 0,
        'utilities': 10,
        'nq-preflight': 20,
        'nq-typography': 30,
        'nq-utilities': 40
      },
      layer: 'nq'
    }
    return preset
  }
}

export const presetNimiq: PresetFactory<object, NimiqPresetOptions> = definePreset(createPreset())

