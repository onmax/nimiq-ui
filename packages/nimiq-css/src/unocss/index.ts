import type { LocalFontProcessorOptions } from '@unocss/preset-web-fonts/local'
import type { Theme } from '@unocss/preset-wind4'
import type { CSSObject, DynamicRule, Preflight, Preset, Rule } from 'unocss'
import type { NimiqIconsOptions } from './icons'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import { toCSS, toJSON } from 'ts-cssjson'
import { definePreset, presetWebFonts } from 'unocss'
import { presetLightDark } from 'unocss-preset-light-dark'
import colors from '../colors'
import { getNimiqIcons } from './icons'

const DEFAULT_PREFIX = 'nq-'

export interface NimiqPresetOptions {
  /**
   * Prefix to use for the Nimiq classes and CSS layers. You must include the dash.
   * @default "nq-"
   */
  prefix?: string

  /**
   * Whether to include the default Nimiq font locally and its paths
   * @default true
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
   * Whether to include the Nimiq icons
   *
   * @default true
   */
  icons?: boolean | NimiqIconsOptions

  /**
   * Whether to output CSS @layer declarations
   *
   * @default false
   */
  outputCSSLayer?: boolean
}

function getLayers(prefix: string = DEFAULT_PREFIX) {
  return {
    [`${prefix}layer-definition`]: -330,
    preflights: -320,
    properties: -310,
    icons: -309,
    theme: -305,
    base: -300,
    [`${prefix}colors`]: -50,
    [`${prefix}preflight`]: -40,
    components: -1,
    [`${prefix}static-content`]: 200,
    [`${prefix}typography`]: 250,
    [`${prefix}utilities`]: 300,
    default: 400,
    utilities: 500,
    [`${prefix}variants`]: 600,
  }
}

export const getLayersNames = (prefix: string) => Object.keys(getLayers(prefix))
export const getLayersCSS = (prefix: string) => `@layer ${getLayersNames(prefix).join(', ')};`

export const presetNimiq = definePreset((options: NimiqPresetOptions = {}) => {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const _cssDir = resolve(__dirname, '../css')
  let cssDir = resolve(_cssDir, 'unminified')
  if (!existsSync(cssDir)) {
    cssDir = _cssDir // fallback to source
  }
  if (!existsSync(cssDir))
    throw new Error(`[Nimiq-CSS]: Unminified CSS folder not found. ${cssDir}`)
  const p = (name: string) => `${cssDir}/${name}.css`
  const wrapToLayer = (prefix: string, name: string, content: string) =>
    options.outputCSSLayer ? `@layer ${prefix}${name} { \n${content}\n}` : content
  const readContent = (name: string) => readFileSync(p(name), 'utf-8')

  interface CssToRulesOptions { convertToAttributes?: boolean, prefix?: string }

  function cssToRules(
    name: string,
    { convertToAttributes = false, prefix }: CssToRulesOptions = {},
  ) {
    prefix ??= DEFAULT_PREFIX

    interface Setup { css: string, ruleName: string, json: object }
    const rulesSetup: Record<string, Setup> = {}

    let preflightCss = ''
    const preflightCssKeys = [':root', 'body', '*']

    const layer = `${prefix}${name}`

    const content = readContent(name).replaceAll('data:image/svg+xml;', 'SEMICOLON_BUG_HACK')
    const json = toJSON(content, { stripComments: true, comments: false, ordered: false, split: false })

    const rulesNamesStr: string[] = []
    for (const key of Object.keys(json.children)) {
      const rulesNames = key.split(',').map(s => s.trim())
      const css = toCSS(json.children[key]).replaceAll('SEMICOLON_BUG_HACK', 'data:image/svg+xml;')
      for (const _rule of rulesNames) {
        if (preflightCssKeys.includes(_rule)) {
          const _css = `${_rule} { ${css} }`
          preflightCss += _rule === ':root' ? _css : options.outputCSSLayer ? `@layer ${layer} { ${_css} }` : _css
          continue
        }

        if (!_rule.startsWith('.'))
          continue
        if (_rule === '.nq-shadow') // we define the shadow in the theme
          continue
        const rule = _rule.replace(new RegExp(`^\.${DEFAULT_PREFIX}`), `.${prefix}`)
        const ruleNameMatch = rule.match(/^\.([\w-]+)/)
        const ruleName = ruleNameMatch?.[1]
        if (!ruleName)
          throw new Error(`Rule name not found for ${rule}`)
        rulesNamesStr.push(ruleName)
        const selector = convertToAttributes
          ? `${rule}, [${ruleName}=""], [${ruleName}="true"]`
          : rule
        const setup: Setup = { css, ruleName, json: json.children[key].attributes }
        if (rulesSetup[selector]) {
          rulesSetup[selector].css += css
          rulesSetup[selector].json = { ...rulesSetup[selector].json, ...json.children[key].attributes }
        }
        else {
          rulesSetup[selector] = setup
        }
      }
    }

    const rules: Preset<Theme>['rules'] = Object.entries(rulesSetup).map(
      ([_selector, { css, ruleName, json }]) => {
        if (!css.includes('{')) {
          const re = new RegExp(`^${ruleName}$`)
          return [re, () => json as CSSObject, { layer }]
        }

        return [
          new RegExp(`^${ruleName}$`),
          async (_match, { generator, rawSelector, variantHandlers }) => {
            // @ts-expect-error todo fix this
            const { selector: s } = await generator.applyVariants([0, rawSelector, css, undefined, variantHandlers])
            const selectorWithCss = `${s?.split(' $$ ').join(' ')}{${css}}`
            return options.outputCSSLayer ? `@layer ${layer} { ${selectorWithCss} }` : selectorWithCss
          },
          { layer },
        ] satisfies DynamicRule<Theme>
      },
    )

    const preflight: Preflight = { layer, getCSS: () => preflightCss }
    return { rules, rulesNames: rulesNamesStr, preflight }
  }

  function extractAtRule(name: string) {
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

    let extractedStr = ''

    for (const key of Object.keys(json.children)) {
      // Extract @keyframes
      const keyframes = key
        .split(',')
        .map(s => s.trim())
        .filter(s => s.startsWith('@keyframes'))
      const keyframesCSS = toCSS(json.children[key]).replaceAll(
        'SEMICOLON_BUG_HACK',
        'data:image/svg+xml;',
      )
      if (keyframes.length > 0) {
        extractedStr += `${keyframes.join(', ')} { ${keyframesCSS} }\n`
      }

      // Extract @property
      const properties = key
        .split(',')
        .map(s => s.trim())
        .filter(s => s.startsWith('@property'))
      const propertiesCSS = toCSS(json.children[key]).replaceAll(
        'SEMICOLON_BUG_HACK',
        'data:image/svg+xml;',
      )
      if (properties.length > 0) {
        extractedStr += `${properties.join(', ')} { ${propertiesCSS} }\n`
      }
    }

    return extractedStr
  }

  const { prefix = DEFAULT_PREFIX } = options

  const rulesNames: string[] = []
  const shortcuts: Preset['shortcuts'] = []
  const presets: Preset['presets'] = []

  const { preflight = true, staticContent = false } = options
  const preflights: Preset['preflights'] = [
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

  const { utilities = false, typography = false } = options

  const rules: Rule<Theme>[] = []

  preflights.push({
    getCSS: () => ':root { color-scheme: light dark; }',
    layer: `${prefix}preflight`,
  })

  presets.push(presetLightDark({ colors, prefix, layer: `${prefix}colors` }) as Preset)

  const colorsWithGradientsRe = 'neutral|blue|green|orange|red|gold'
  shortcuts.push(
    [
      new RegExp(`^bg-gradient-(${colorsWithGradientsRe})$`),
      // This requires `mode:true` in wind 4 preset: https://github.com/unocss/unocss/issues/4694
      ([, c]) => `bg-[image:$colors-${c}-gradient]`,
      { layer: `${prefix}colors`, autocomplete: [`bg-gradient-(${colorsWithGradientsRe})`] },
    ],
  )

  if (utilities) {
    const { rules: _rules, rulesNames: _rulesNames } = cssToRules('utilities', { convertToAttributes: options.attributifyUtilities, prefix })
    rulesNames.push(..._rulesNames)
    rules.push(..._rules)
    // keyframes
    const getCSS = () => extractAtRule('utilities')
    preflights.push({ layer: `${prefix}utilities`, getCSS })
  }

  if (typography) {
    const typographyContent = readContent('typography')
    preflights.push({
      getCSS: () => wrapToLayer(prefix, 'typography', typographyContent),
    })
  }

  const { fonts = true } = options

  if (fonts !== false) {
    const processors = fonts === true ? createLocalFontProcessor() : createLocalFontProcessor(fonts)
    presets.push(
      presetWebFonts({
        themeKey: 'font',
        provider: 'google',
        fonts: {
          sans: 'Mulish:400,600,700',
          mono: 'Fira Code:400',
        },
        processors,
      }),
    )
  }

  const { icons = true } = options
  if (icons) {
    const iconsOptions = typeof icons === 'object' ? icons : {}
    const { rules: iconsRules, iconsNames } = getNimiqIcons(iconsOptions)
    rules.push(...iconsRules)
    rulesNames.push(...iconsNames)
  }

  const variants: Preset['variants'] = []

  // Define the order of the CSS layers
  // const layerDefinition: Preflight = {
  //   layer: `${prefix}layer-definition`,
  //   getCSS: () => getLayersCSS(prefix),
  // }
  // const layers = [
  //   'preflights',
  //   `${prefix}colors`,
  //   preflight && `${prefix}preflight`,
  //   staticContent && `${prefix}static-content`,
  //   typography && `${prefix}typography`,
  //   utilities && `${prefix}utilities`,
  //   `${prefix}variants`, // To ensure that the rules that have variants are applied after the rules that don't have variants
  // ].filter(Boolean) as string[]

  // return
  // },
  // preflights.unshift(layerDefinition)

  const autocompleteStaticContent: string[] = staticContent ? ['no-max-width', 'no-color', 'overlaps', 'heading-lg', 'section-gap'].map(u => `${prefix}${u}`) : []
  const autocompletePreflight = ['nq-no-color']

  const preset: Preset = {
    name: 'nimiq-preset',
    preflights,
    variants,
    shortcuts,
    extendTheme: (theme: Theme) => {
      theme.colors = colors as Record<string, string | Record<string, string>>
      theme.shadow = {
        DEFAULT: 'var(--nq-shadow)',
        lg: 'var(--nq-shadow-lg)',
      }
      theme.ease = {
        DEFAULT: 'var(--nq-ease)',
      }
    },
    autocomplete: {
      templates: [...rulesNames, ...autocompletePreflight, ...autocompleteStaticContent],
    },
    presets,
    rules,
    outputToCssLayers: options.outputCSSLayer,
    layers: getLayers(prefix),
  }
  return preset
})

export default presetNimiq
