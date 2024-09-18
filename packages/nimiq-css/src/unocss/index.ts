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
  reset?: boolean | 'tailwind-compat' | 'tailwind' | 'eric-meyer' | 'normalize' | string

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
  const wrapToLayer = (prefix: string, name: string, content: string) => `@layer ${prefix}${name} { \n${content}\n}`
  const readContent = (name: string) => readFileSync(p(name), 'utf-8')

  interface CssToRulesOptions { convertToAttributes?: boolean, prefix?: string }

  function cssToRules(
    name: string,
    { convertToAttributes = false, prefix = DEFAULT_PREFIX }: CssToRulesOptions = {},
  ) {
    interface Setup { css: string, re: RegExp }
    const rulesSetup: Record<string, Setup> = {}

    const layer = `${prefix}${name}`

    const content = readContent(name).replaceAll(
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
        // nq-shadow
        if (_rule === '.nq-shadow')
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
        () => `@layer ${layer} { ${selector} { ${css} } }`,
        { layer },
      ],
    )
    return { rules, rulesNames: rulesNamesStr }
  }

  function extractKeyframes(name: string) {
    const content = readContent(name).replaceAll(
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
          if (typeof reset === 'string' && !['tailwind-compat', 'tailwind', 'eric-meyer', 'normalize'].includes(reset)) {
            // Custom file path provided
            const customFilePath = resolve(process.cwd(), fileName)
            if (!existsSync(customFilePath)) {
              throw new Error(`Custom reset CSS file not found: ${customFilePath}`)
            }
            content = readFileSync(customFilePath, 'utf-8')
          } else {
            // Default reset options
            const resetFilePath = resolve(`node_modules/@unocss/reset/${fileName}.css`)
            if (!existsSync(resetFilePath)) {
              throw new Error(`Reset CSS file not found: ${resetFilePath}`)
            }
            content = readFileSync(resetFilePath, 'utf-8')
          }
        } catch (error) {
          console.warn(`Error reading reset CSS file: ${fileName}. ${JSON.stringify({ error })}`)
          return ''
        }

        return wrapToLayer(prefix, 'reset', content)
      },
      layer: `${prefix}reset`,
    }

    const { preflight = true, staticContent = false } = options
    const preflights: Preset['preflights'] = [
      resetLayer,
      {
        layer: `${prefix}colors`,
        getCSS: () => wrapToLayer(prefix, 'colors', readContent('colors')),
      },
    ]

    if (preflight) {
      preflights.push({
        layer: `${prefix}preflight`,
        getCSS: () => wrapToLayer(prefix, 'preflight', readContent('preflight').replaceAll(/\.nq-/g, `.${prefix}`)),
      })
    }

    if (staticContent) {
      preflights.push({
        layer: `${prefix}static-content`,
        getCSS: () => wrapToLayer(prefix, 'static-content', readContent('static-content').replaceAll(/\.nq-/g, `.${prefix}`)),
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
      const { rules: _rules, rulesNames: _rulesNames } = cssToRules('utilities', { convertToAttributes: options.attributifyUtilities, prefix })
      rulesNames.push(..._rulesNames)
      rules.push(..._rules)
      // keyframes
      const getCSS = () => extractKeyframes('utilities')
      preflights.push({ layer: `${prefix}utilities`, getCSS })
    }

    if (typography) {
      const { rules: _rules, rulesNames: _rulesNames } = cssToRules('typography', { convertToAttributes: false, prefix })
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
      (matcher) => {
        if (!matcher.startsWith('group-hocus:'))
          return matcher
        return {
          matcher: matcher.slice(12),
          selector: s => `:is(.group,[group]):hover ${s}, :is(.group,[group]):focus ${s}`,
        }
      },
      (matcher) => {
        if (!matcher.startsWith('selected:'))
          return matcher
        return {
          matcher: matcher.slice(9),
          selector: s => `[data-selected]${s}, [data-selected] ${s}`,
        }
      },
      (matcher) => {
        if (!matcher.startsWith('not-selected:'))
          return matcher
        return {
          matcher: matcher.slice(13),
          selector: s => `:not([data-selected]), :not([data-selected]) ${s}`,
        }
      },
      (matcher) => {
        // open-
        if (!matcher.startsWith('data-open:'))
          return matcher
        return {
          matcher: matcher.slice(10),
          selector: s => `[data-state=open]${s}, [data-state=open] ${s}`,
        }
      }
    ]

    // Define the order of the CSS layers
    const layerDefinition: Preflight = {
      getCSS: () => {
        const layers = [
          reset && 'reset',
          'colors',
          preflight && 'preflight',
          staticContent && 'static-content',
          typography && 'typography',
          utilities && 'utilities',
        ].filter(Boolean) as string[];

        return `@layer ${layers.map(layer => `${prefix}${layer}`).join(', ')};`;
      }
    }
    preflights.unshift(layerDefinition)

    const autocompleteStaticContent: string[] = staticContent ? ['no-max-width', 'no-px', 'no-py', 'no-mx', 'heading-lg'].map(u => `${prefix}${u}`) : []
    const autocompletePreflight = ['nq-no-color']

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
      autocomplete: {
        templates: [...rulesNames, ...autocompletePreflight, ...autocompleteStaticContent],
      },
      presets,
      rules,
      layers: {
        [`${prefix}reset`]: -100,
        [`${prefix}colors`]: -50,
        [`${prefix}preflight`]: -40,
        'components': -1,
        'default': 1,
        [`${prefix}static-content`]: 200,
        [`${prefix}typography`]: 250,
        [`${prefix}utilities`]: 300,
        'utilities': 400,
      },
    }
    return preset
  }
}

export const presetNimiq: PresetFactory<object, NimiqPresetOptions> = definePreset(createPreset())

