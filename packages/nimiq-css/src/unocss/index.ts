import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { createLocalFontProcessor, type LocalFontProcessorOptions } from '@unocss/preset-web-fonts/local'
import { toCSS, toJSON } from 'ts-cssjson'
import {
  definePreset,
  type Preflight,
  type Preset,
  type PresetFactory,
  presetWebFonts,
} from 'unocss'
import { getNimiqColors, NimiqColor } from './colors'
import { shortcuts } from 'unocss/preset-wind'

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
   * @deprecated - Use `presetIcons` instead and add the Nimiq icons collection as "@iconify-json/nimiq": "https://pkg.pr.new/onmax/nimiq-ui/nimiq-icons@24e0317"
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

  /**
   * Wethere to include the reset for the scrollbar
   * @default false
   */
  scrollbar?: boolean
}

function createPreset() {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const _cssDir = resolve(__dirname, '../css')
  const cssDir = resolve(_cssDir, 'unminified')
  if (!existsSync(cssDir))
    throw new Error('[Nimiq-CSS]: Unminified CSS folder not found.')
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
      const css = toCSS(json.children[key]).replaceAll('SEMICOLON_BUG_HACK', 'data:image/svg+xml;')
      for (const _rule of rulesNames) {
        if (!_rule.startsWith('.'))
          continue
        if (_rule === '.nq-shadow') // we define the shadow in the theme
          continue
        const rule = _rule.replace(new RegExp(`^${DEFAULT_PREFIX}`), '')
        const ruleName = rule.replace(/^\./, '').trim().split(/[:*]/).at(0)?.split(/\s/).at(0);
        if (!ruleName) throw new Error(`Rule name not found for ${rule}`)
        rulesNamesStr.push(ruleName)
        const re = new RegExp(`^${ruleName}$`)
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
        if (reset === false)
          return ''

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
          }
          else {
            // Default reset options
            const resetFilePath = resolve(`node_modules/@unocss/reset/${fileName}.css`)
            if (!existsSync(resetFilePath)) {
              throw new Error(`Reset CSS file not found: ${resetFilePath}`)
            }
            content = readFileSync(resetFilePath, 'utf-8')
          }
        }
        catch (error) {
          console.warn(`Error reading reset CSS file: ${fileName}. ${JSON.stringify({ error })}`)
          return ''
        }

        return wrapToLayer(prefix, 'reset', content)
      },
      layer: `${prefix}reset`,
    }

    const { preflight = true, staticContent = false, scrollbar } = options
    const preflights: Preset['preflights'] = [
      resetLayer,
      {
        layer: `${prefix}colors`,
        getCSS: () => wrapToLayer(prefix, 'colors', readContent('colors')),
      },
    ]

    if (staticContent) {
      preflights.push({
        layer: `${prefix}static-content`,
        getCSS: () => wrapToLayer(prefix, 'static-content', readContent('static-content').replaceAll(/\.nq-/g, `.${prefix}`)),
      })
    }

    if (preflight) {
      preflights.push({
        layer: `${prefix}preflight`,
        getCSS: () => wrapToLayer(prefix, 'preflight', readContent('preflight').replaceAll(/\.nq-/g, `.${prefix}`)),
      })
    }

    if (scrollbar) {
      preflights.push({
        layer: `${prefix}preflight`,
        getCSS: () => wrapToLayer(prefix, 'preflight', readContent('scrollbar').replaceAll(/\.nq-/g, `.${prefix}`)),
      })
    }


    const { utilities = false, typography = false } = options
    const shortcuts: Preset['shortcuts'] = []
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

    if (staticContent) {
      shortcuts.push(
        [/^nq-(mt|mb|pt|pb|py|my)-12$/, ([, t]) => `${t}-8 xl:${t}-12`],
        [/^nq-(mt|mb|pt|pb|py|my)-16$/, ([, t]) => `${t}-12 xl:${t}-16`],
        [/^nq-(mt|mb|pt|pb|py|my)-24$/, ([, t]) => `${t}-16 md:${t}-24`],
        [/^nq-(mt|mb|pt|pb|py|my)-32$/, ([, t]) => `${t}-24 md:${t}-32`],
        [/^nq-(mt|mb|pt|pb|py|my)-40$/, ([, t]) => `${t}-32 xl:${t}-40`],
        [/^nq-(mt|mb|pt|pb|py|my)-48$/, ([, t]) => `${t}-32 xl:${t}-40 2xl:${t}-48`],
        [/^nq-(mt|mb|pt|pb|py|my)-96$/, ([, t]) => `${t}-80 xl:${t}-96`],
        ['text-xs', 'text-min-12 text-max-14 lh-[1.3]'],
        ['text-sm', 'text-min-14 text-max-16 lh-[1.3]'],
        ['text-xl', 'text-18|21 lh-[1.3]'],
      )
      rules.push(
        [/^text-min-(.*)$/, ([, t]) => ({ '--nq-font-size-min': t })],
        [/^text-max-(.*)$/, ([, t]) => ({ '--nq-font-size-max': t })],
        [/^text-(\d+(?:\.\d+)?[a-z]*)\|(\d+(?:\.\d+)?[a-z]*)$/, ([, min, max]) => ({ '--nq-font-size-min': min, '--nq-font-size-max': max })],
      )
    }

    // The only way to add gradients is via rules
    for (const [key, gradient, color] of gradients) {
      const backgroundImage = { 'background-image': gradient }
      const background = { 'background-color': colors[color as NimiqColor]?.DEFAULT || color } // This is the fallback color
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

    if (Boolean(options.icons)) {
      console.warn('The `icons` option is deprecated. Use `presetIcons` instead and add the Nimiq icons collection as "@iconify-json/nimiq": "https://pkg.pr.new/onmax/nimiq-ui/nimiq-icons@24e0317"')
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
        if (!matcher.startsWith('global-dark:'))
          return matcher
        return {
          matcher: matcher.slice('global-dark:'.length),
          selector: s => `html.dark ${s}`,
        }
      },

      // For Radix. Maybe they should be in a separate preset
      (matcher) => {
        const motionVariants = ['from-start', 'to-start', 'from-end', 'to-end']
        for (const variant of motionVariants) {
          if (matcher.startsWith(`motion-${variant}:`)) {
            return {
              matcher: matcher.slice(`motion-${variant}:`.length),
              selector: s => `[data-motion=${variant}]${s}`,
            }
          }
        }
        return matcher
      },
      (matcher) => {
        const dataStates = ['open', 'visible', 'hidden', 'closed', 'active']
        for (const state of dataStates) {
          const prefix = `data-${state}:`
          if (matcher.startsWith(prefix)) {
            return {
              matcher: matcher.slice(prefix.length),
              selector: s => `[data-state=${state}]${s}, [data-state=${state}] ${s}`,
            }
          }
        }
      },
    ]

    // Define the order of the CSS layers
    const layerDefinition: Preflight = {
      layer: `${prefix}layer-definition`,
      getCSS: () => {
        const layers = [
          reset && 'reset',
          'colors',
          preflight && 'preflight',
          staticContent && 'static-content',
          typography && 'typography',
          utilities && 'utilities',
        ].filter(Boolean) as string[]

        return `@layer ${layers.map(layer => `${prefix}${layer}`).join(', ')};`
      },
    }
    preflights.unshift(layerDefinition)

    const autocompleteStaticContent: string[] = staticContent ? ['no-max-width', 'no-px', 'no-color', 'no-py', 'no-mx', 'heading-lg', 'section-gap', 'wide'].map(u => `${prefix}${u}`) : []
    const autocompleteScrollbar: string[] = scrollbar ? ['scroll-sm'].map(u => `${prefix}${u}`) : []
    const autocompletePreflight = ['nq-no-color']

    const preset: Preset = {
      name: 'nimiq-preset',
      preflights,
      variants,
      shortcuts,
      theme: {
        colors,
        boxShadow: {
          DEFAULT: 'var(--nq-shadow)',
          lg: 'var(--nq-shadow-lg)',
        },
        easing: {
          'nq': 'var(--nq-ease)',
        }
      },
      autocomplete: {
        templates: [...rulesNames, ...autocompletePreflight, ...autocompleteStaticContent, ...autocompleteScrollbar],
      },
      presets,
      rules,
      layers: {
        [`${prefix}layer-definition`]: -101,
        [`${prefix}reset`]: -100,
        [`${prefix}colors`]: -50,
        [`${prefix}preflight`]: -40,
        components: -1,
        default: 1,
        [`${prefix}static-content`]: 200,
        [`${prefix}typography`]: 250,
        [`${prefix}utilities`]: 300,
        utilities: 400,
      },
    }
    return preset
  }
}

export const presetNimiq: PresetFactory<object, NimiqPresetOptions> = definePreset(createPreset())
