import { type Preset, type PresetFactory, definePreset, presetWebFonts, presetIcons, type Preflight } from 'unocss'
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { toJSON, toCSS } from 'ts-cssjson'
import { getNimiqColors } from './colors';
import { fileURLToPath } from 'node:url';

export type NimiqPresetOptions = {
  /**
   * Whether to reset the styles of the page 
   * 
   * @default tailwind-compat
   */
  reset?: boolean | 'tailwind-compat' | 'tailwind' | 'eric-meyer' | 'normalize'

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
   * Add Nimiq Icons
   * @default true
   */
  icons?: boolean
}

function createPreset() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const _cssDir = resolve(__dirname, '../css')
  const unminifiedFolder = resolve(_cssDir, 'unminified')
  const unminifiedExists = existsSync(unminifiedFolder)
  const cssDir = unminifiedExists ? unminifiedFolder : _cssDir
  const p = (name: string) => `${cssDir}/${name}.css`
  const readContent = (path: string) => readFileSync(path, 'utf-8')
  const wrapContentToLayer = (name: string) => `@layer nq-${name} { ${readContent(p(name))} }`

  function cssToRules(name: string) {
    type Setup = { css: string, re: RegExp }
    const rulesSetup: Record<string, Setup> = {}

    const layer = `nq-${name}`

    const content = readContent(p(name)).replaceAll("data:image/svg+xml;", 'SEMICOLON_BUG_HACK')
    const json = toJSON(content, { stripComments: true, comments: false, ordered: false, split: false })
    for (const key of Object.keys(json.children)) {
      const rulesNames = key.split(',').map(s => s.trim())
      const css = toCSS(json.children[key]).replaceAll('SEMICOLON_BUG_HACK', "data:image/svg+xml;")
      for (const rule of rulesNames) {
        if (!rule.startsWith('.'))
          continue
        const ruleName = rule.replace(/^\./, '').trim()
        const re = new RegExp(`^${ruleName}$`)
        const selector = `${rule}, [${ruleName}=""]`
        const setup: Setup = { css, re }
        if (rulesSetup[selector])
          rulesSetup[selector].css += css
        else
          rulesSetup[selector] = setup
      }
    }
    const rules: Preset["rules"] = Object.entries(rulesSetup).map(([selector, { css, re }]) => ([re, () => `@layer nq-${name} { ${selector} { ${css} } }`, { layer }]))
    return rules

  }

  return (options: NimiqPresetOptions = {}): Preset => {
    const { gradients, colors } = getNimiqColors()

    // This is the css to define the order of the CSS layers
    const layerDefinition: Preflight = {
      getCSS: () => '@layer nq-reset, nq-colors, nq-preflight, nq-typography, nq-utilities;'
    }

    const { reset = 'tailwind-compat' } = options
    const resetLayer: Preflight = {
      getCSS() {
        if (reset === false) return ''
        const fileName = reset === true ? 'tailwind-compat' : reset
        const url = resolve(`node_modules/@unocss/reset/${fileName}.css`)
        const content = readFileSync(url, 'utf-8')
        return `@layer nq-reset { /* CSS Reset ${fileName}*/ ${content} }`
      },
      layer: 'nq-reset'
    }

    const { preflight = true } = options
    const preflights: Preset["preflights"] = [
      layerDefinition,
      resetLayer,
      {
        layer: 'nq-colors',
        getCSS: () => wrapContentToLayer('colors')
      }
    ]

    if (preflight)
      preflights.push({ layer: 'nq-preflight', getCSS: () => wrapContentToLayer('preflight') })


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

    const { icons = true } = options
    if (icons) {
      presets.push(presetIcons({
        collections: {
          nimiq: async () => {
            return await fetch('https://raw.githubusercontent.com/onmax/nimiq-ui/main/packages/nimiq-icons/dist/icons.json').then(res => res.json() as any)
          },
        },
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
      (matcher) => {
        if (!matcher.startsWith('hocus:'))
          return matcher
        return {
          matcher: matcher.replace(/^hocus:/, ''),
          selector: s => `${s}:hover, ${s}:focus-visible`,
        }
      },
    ]

    const preset: Preset = {
      name: 'nimiq-preset',
      preflights,
      variants,
      theme: {
        colors,
        boxShadow: {
          DEFAULT: 'var(--nq-shadow)',
          lg: 'var(--nq-shadow-lg)',
        }
      },
      presets,
      rules,
      layers: {
        'nq-reset': -1,
      }
    }
    return preset
  }
}

export const presetNimiq: PresetFactory<object, NimiqPresetOptions> = definePreset(createPreset())

