import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { toCSS, toJSON } from 'ts-cssjson'
import {
  type Preflight,
  type Preset,
  type PresetFactory,
  definePreset,
  presetIcons,
  presetWebFonts,
} from 'unocss'
import { type LocalFontProcessorOptions, createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import { getNimiqColors } from './colors'

const DEFAULT_PREFIX = 'nq-'

export interface NimiqPresetOptions {
  /**
   * Prefix to use for the Nimiq classes and CSS layers. You must include the dash.
   * @default "nq-"
   */
  prefix?: string

  /**
   * Whether to reset the styles of the page
   * @default 'tailwind-compat'
   */
  reset?: boolean | 'tailwind-compat' | 'tailwind' | 'eric-meyer' | 'normalize'

  /**
   * Whether to include the default Nimiq font locally and its paths
   */
  fonts?: LocalFontProcessorOptions | boolean

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

  /**
   * If you want to use the attributify mode
   * @default false
   */
  attributifyUtilities?: boolean

  /**
   * Includes the CSS designed for static content like blog posts or information pages.
   * 
   * @default false
   */
  staticContent?: boolean
}

function createPreset() {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const _cssDir = resolve(__dirname, '../css')
  const unminifiedFolder = resolve(_cssDir, 'unminified')
  const unminifiedExists = existsSync(unminifiedFolder)
  const cssDir = unminifiedExists ? unminifiedFolder : _cssDir
  const p = (name: string) => `${cssDir}/${name}.css`
  const readContent = (path: string) => readFileSync(path, 'utf-8')
  const wrapContentToLayer = (name: string, prefix: string) => readContent(p(name))

  interface CssToRulesOptions { convertToAttributes?: boolean, prefix?: string }

  function cssToRules(
    name: string,
    { convertToAttributes = false, prefix = DEFAULT_PREFIX }: CssToRulesOptions = {},
  ) {
    interface Setup { css: string, re: RegExp }
    const rulesSetup: Record<string, Setup> = {}

    const layer = `${prefix}${name}`

    const content = readContent(p(name)).replaceAll(
      'data:image/svg+xml;',
      'SEMICOLON_BUG_HACK',
    )
    const json = toJSON(content, {
      stripComments: true,
      comments: false,
      ordered: false,
      split: false,
    })
    const rulesNamesStr: string[] = []
    for (const key of Object.keys(json.children)) {
      const rulesNames = key.split(',').map(s => s.trim())
      const css = toCSS(json.children[key]).replaceAll(
        'SEMICOLON_BUG_HACK',
        'data:image/svg+xml;',
      )
      for (const _rule of rulesNames) {
        if (!_rule.startsWith('.'))
          continue
        const rule = _rule.replace(new RegExp(`^${DEFAULT_PREFIX}`), "")
        const ruleName = rule.replace(/^\./, "").trim();
        rulesNamesStr.push(ruleName)
        const re = new RegExp(`^${ruleName}$`);
        const selector = convertToAttributes
          ? `${rule}, [${ruleName}=""], [${ruleName}="true"]`
          : rule
        const setup: Setup = { css, re }
        if (rulesSetup[selector])
          rulesSetup[selector].css += css
        else rulesSetup[selector] = setup
      }
    }

    const rules: Preset['rules'] = Object.entries(rulesSetup).map(
      ([selector, { css, re }]) => [
        re,
        () => `${selector} { ${css} }`,
        { layer },
      ],
    )
    return { rules, rulesNames: rulesNamesStr }
  }

  function extractKeyframes(name: string) {
    const content = readContent(p(name)).replaceAll(
      'data:image/svg+xml;',
      'SEMICOLON_BUG_HACK',
    )
    const json = toJSON(content, {
      stripComments: true,
      comments: false,
      ordered: false,
      split: false,
    })
    let keyframesStr = ''
    for (const key of Object.keys(json.children)) {
      const keyframes = key
        .split(',')
        .map(s => s.trim())
        .filter(s => s.startsWith('@keyframes'))
      const css = toCSS(json.children[key]).replaceAll(
        'SEMICOLON_BUG_HACK',
        'data:image/svg+xml;',
      )
      keyframesStr += `${keyframes.join(', ')} { ${css} }\n`
    }
    return keyframesStr
  }

  return (options: NimiqPresetOptions = {}): Preset => {
    const { prefix = DEFAULT_PREFIX } = options
    const { gradients, colors } = getNimiqColors()

    const rulesNames: string[] = []

    const { reset = 'tailwind-compat' } = options
    const resetLayer: Preflight = {
      getCSS() {
        if (reset === false) return ''

        let content: string
        const fileName = reset === true ? 'tailwind-compat' : reset

        try {
          if (typeof reset !== 'boolean' && !['tailwind-compat', 'tailwind', 'eric-meyer', 'normalize'].includes(reset)) {
            throw new Error(`Invalid reset option: ${reset}`)
          }

          const resetFilePath = resolve(__dirname, '../css', `${fileName}.css`)
          if (!existsSync(resetFilePath)) {
            throw new Error(`Reset CSS file not found: ${resetFilePath}`)
          }
          content = readFileSync(resetFilePath, 'utf-8')
        } catch (error) {
          console.warn(`Error reading reset CSS file: ${error}. Leaving reset CSS empty.`)
          return ''
        }

        return `/* CSS Reset ${fileName} */\n${content}`
      },
      layer: `${prefix}reset`,
    }

    const { preflight = true, staticContent = false } = options
    const preflights: Preset['preflights'] = [
      resetLayer,
      {
        layer: `${prefix}colors`,
        getCSS: () => wrapContentToLayer('colors', prefix),
      },
    ]

    if (preflight) {
      preflights.push({
        layer: `${prefix}preflight`,
        getCSS: () => wrapContentToLayer('preflight', prefix).replaceAll(/nq-/g, prefix),
      })
    }

    if (staticContent) {
      preflights.push({
        layer: `${prefix}static-content`,
        getCSS: () => wrapContentToLayer('static-content', prefix).replaceAll(/nq-/g, prefix),
      })
    }

    const { utilities = false, typography = false } = options
    const rules: Preset['rules'] = [
      [
        new RegExp(`^${prefix}scrollbar-hide$`),
        (_, { constructCSS }) => {
          let res = constructCSS({ 'scrollbar-width': 'none' })
          res += `\n${res.replace('{scrollbar-width:none;}', '::-webkit-scrollbar{display: none;}')}`
          return res
        },
        { layer: `${prefix}utilities`, autocomplete: `${prefix}scrollbar-hide` },
      ],
    ]
    
    // The only way to add gradients is via rules
    for (const [key, gradient, color] of gradients) {
      const backgroundImage = { 'background-image': gradient }
      const background = { 'background-color': colors[color].DEFAULT } // This is the fallback color
      rules.push([
        key,
        { ...background, ...backgroundImage },
        { layer: `${prefix}colors` },
      ])
    }

    if (utilities) {
      const { rules:_rules, rulesNames: _rulesNames} = cssToRules('utilities', { convertToAttributes: options.attributifyUtilities, prefix })
      rulesNames.push(..._rulesNames)
      rules.push(..._rules)
      // keyframes
      const getCSS = () => extractKeyframes('utilities')
      preflights.push({ layer: `${prefix}utilities`, getCSS })
    }

    if (typography) {
      const {rules: _rules, rulesNames:_rulesNames} = cssToRules('typography', { convertToAttributes: false, prefix })
      rulesNames.push(..._rulesNames)
      rules.push(..._rules)
    }

    const defaultFontOptions = { path: 'public/assets/fonts', url: '/assets/fonts' }
    const { fonts = defaultFontOptions } = options
    const presets: Preset['presets'] = []
    if (fonts) {
      presets.push(
        presetWebFonts({
          provider: 'google', // We fetch the fonts the google but store them locally
          fonts: {
            sans: 'Mulish:400,600,700',
            mono: 'Fira Code:400',
          },
          // This will download the fonts and serve them locally
          processors: createLocalFontProcessor(options.fonts === true ? undefined : options.fonts as LocalFontProcessorOptions),
        }),
      )
    }

    const { icons = true } = options
    if (icons) {
      presets.push(
        presetIcons({
          collections: {
            nimiq: async () => {
              return await fetch(
                'https://raw.githubusercontent.com/onmax/nimiq-ui/main/packages/nimiq-icons/dist/icons.json',
              ).then(res => res.json() as any)
            },
          },
        }),
      )
    }

    const variants: Preset['variants'] = [
      (matcher) => {
        if (!matcher.startsWith('inverted:'))
          return matcher
        return {
          matcher: matcher.slice(9),
          selector: s =>
            `:is(.inverted,[data-inverted])${s}, :is(.inverted,[data-inverted]) ${s}`,
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
      },
      outputToCssLayers: true,
      autocomplete: {
        templates: rulesNames
      },
      presets,
      rules,
      layers: {
        [`${prefix}reset`]: -10,
        [`${prefix}colors`]: 0,
        [`${prefix}preflight`]: 10,
        [`${prefix}static-content`]: 20,
        [`${prefix}utilities`]: 30,
      },
    }
    return preset
  }
}

export const presetNimiq: PresetFactory<object, NimiqPresetOptions> = definePreset(createPreset())

