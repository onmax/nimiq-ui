import type { NimiqColor } from './colors'
import { presetScalePx } from 'unocss-preset-scale-px'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { createLocalFontProcessor, type LocalFontProcessorOptions } from '@unocss/preset-web-fonts/local'
import { toCSS, toJSON } from 'ts-cssjson'
import {
  type CSSObject,
  definePreset,
  type Preflight,
  type Preset,
  type PresetFactory,
  presetWebFonts,
  type PresetUnoTheme,
  type DynamicRule
} from 'unocss'
import { getNimiqColors } from './colors'
import type { Theme } from 'unocss/preset-mini'

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
   * Add support for the Nimiq Spacing fluid utilities
   * @default true
   */
  spacing?: boolean

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
   * Use [unocss-preset-scale-px](https://github.com/onmax/unocss-preset-scale-px) to modify numeric values.
   * px-4 becomes 0.25rem and not 1rem.
   * 
   * @default true
   */
  scalePx?: boolean
}

function createPreset() {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const _cssDir = resolve(__dirname, '../css')
  let cssDir = resolve(_cssDir, 'unminified')
  if (!existsSync(cssDir)) {
    cssDir = _cssDir // fallback to source
  }
  if (!existsSync(cssDir))
    throw new Error(`[Nimiq-CSS]: Unminified CSS folder not found. ${cssDir}`)
  const p = (name: string) => `${cssDir}/${name}.css`
  const wrapToLayer = (prefix: string, name: string, content: string) => `@layer ${prefix}${name} { \n${content}\n}`
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
        if (preflightCssKeys.includes(_rule)) {
          const _css = `${_rule} { ${css} }`
          preflightCss += _rule === ':root' ? _css : `@layer ${layer} { ${_css} }`
          continue
        }

        if (!_rule.startsWith('.'))
          continue
        if (_rule === '.nq-shadow') // we define the shadow in the theme
          continue
        const rule = _rule.replace(new RegExp(`^\.${DEFAULT_PREFIX}`), `.${prefix}`)
        const ruleName = rule.replace(/^\./, '').trim().split(/[:*]/).at(0)?.split(/\s/).at(0)
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
          return [re, () => json as CSSObject, { layer }];
        }

        return [
          new RegExp(`^${ruleName}$`),
          async (_match, { generator, rawSelector, variantHandlers }) => {
            // @ts-ignore
            const { selector: s } = await generator.applyVariants([0, rawSelector, css, undefined, variantHandlers])
            return `@layer ${layer} { ${s?.split(' $$ ').join(' ')}{${css}} }`
          },
          { layer },
        ] satisfies DynamicRule<Theme>
      }
    );

    const preflight: Preflight = { layer, getCSS: () => preflightCss }
    return { rules, rulesNames: rulesNamesStr, preflight }
  }

  function extractAtRule(name: string) {
    const content = readContent(name).replaceAll(
      'data:image/svg+xml;',
      'SEMICOLON_BUG_HACK',
    );
    const json = toJSON(content, {
      stripComments: true,
      comments: false,
      ordered: false,
      split: false,
    });

    let extractedStr = '';

    for (const key of Object.keys(json.children)) {
      // Extract @keyframes
      const keyframes = key
        .split(',')
        .map(s => s.trim())
        .filter(s => s.startsWith('@keyframes'));
      const keyframesCSS = toCSS(json.children[key]).replaceAll(
        'SEMICOLON_BUG_HACK',
        'data:image/svg+xml;',
      );
      if (keyframes.length > 0) {
        extractedStr += `${keyframes.join(', ')} { ${keyframesCSS} }\n`;
      }

      // Extract @property
      const properties = key
        .split(',')
        .map(s => s.trim())
        .filter(s => s.startsWith('@property'));
      const propertiesCSS = toCSS(json.children[key]).replaceAll(
        'SEMICOLON_BUG_HACK',
        'data:image/svg+xml;',
      );
      if (properties.length > 0) {
        extractedStr += `${properties.join(', ')} { ${propertiesCSS} }\n`;
      }
    }

    return extractedStr;
  }

  return (options: NimiqPresetOptions = {}): Preset => {
    const { prefix = DEFAULT_PREFIX, scalePx = true } = options

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

    const { preflight = true, staticContent = false, spacing = true } = options
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

    const { utilities = false, typography = false } = options

    const rules: Preset<Theme>['rules'] = [
      [/^text-min-(.*)$/, ([, t]) => ({ '--nq-font-size-min': t })],
      [/^text-max-(.*)$/, ([, t]) => ({ '--nq-font-size-max': t })],
      [/^text-(\d+(?:\.\d+)?[a-z]*)\|(\d+(?:\.\d+)?[a-z]*)$/, ([, min, max]) => ({ '--nq-font-size-min': min, '--nq-font-size-max': max })],
    ]
    {
      const { rules: _rules, rulesNames: _rulesNames, preflight } = cssToRules('fluid-font-sizes', { convertToAttributes: options.attributifyUtilities, prefix: '' /* we don't respect the prefix here */ })
      rulesNames.push(..._rulesNames)
      rules.push(..._rules)
      preflights.push(preflight)
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

    if (spacing) {
      const { rules: _rules, rulesNames: _rulesNames, preflight } = cssToRules('spacing', { convertToAttributes: options.attributifyUtilities, prefix })
      rulesNames.push(..._rulesNames)
      rules.push(..._rules)
      preflights.push(preflight)

      // This could be done with preset-mini/utils but no energy to do it now

      // rules.push([
      //   /^nq-(p|m)-(\d+)-(\d+)$/,
      //   ([, p, min, max]) => {
      //     const css: Record<string, string> = {}

      //     // Define shorthand `--nq-{p|m}-{min,max}` variables
      //     css[`--nq-${p}-min`] = min;
      //     css[`--nq-${p}-max`] = max;

      //     // Define side-specific `--nq-{pt|pb|pl|pr}-{min,max}` variables
      //     const sidePrefixes = p === "p" ? ["pt", "pb", "pl", "pr"] : ["mt", "mb", "ml", "mr"];
      //     for (const side of sidePrefixes) {
      //       css[`--nq-${side}-min`] = min;
      //       css[`--nq-${side}-max`] = max;
      //     }

      //     // Define final shorthand property
      //     const cssProperty = p === "m" ? "margin" : "padding";
      //     if (p.at(1) === 't' || p.at(1) === '-' || p.at(1) === 'y')
      //       css[`${cssProperty}-top`] = `var(--nq-${p}t)`;

      //     if (p.at(1) === 'b' || p.at(1) === '-' || p.at(1) === 'y')
      //       css[`${cssProperty}-bottom`] = `var(--nq-${p}b)`;

      //     if (p.at(1) === 'l' || p.at(1) === '-' || p.at(1) === 'x')
      //       css[`${cssProperty}-left`] = `var(--nq-${p}l)`;

      //     if (p.at(1) === 'r' || p.at(1) === '-' || p.at(1) === 'x')
      //       css[`${cssProperty}-right`] = `var(--nq-${p}r)`;

      //     return css;
      //   }
      // ]);

    }

    if (utilities) {
      const { rules: _rules, rulesNames: _rulesNames } = cssToRules('utilities', { convertToAttributes: options.attributifyUtilities, prefix })
      rulesNames.push(..._rulesNames)
      rules.push(..._rules)
      // keyframes
      const getCSS = () => extractAtRule('utilities')
      preflights.push({ layer: `${prefix}utilities`, getCSS })
    }

    if (typography) {
      const { rules: _rules, rulesNames: _rulesNames, preflight } = cssToRules('typography', { convertToAttributes: false, prefix })
      rulesNames.push(..._rulesNames)
      rules.push(..._rules)
      preflights.push(preflight)
    }

    const { fonts = true } = options
    const presets: Preset['presets'] = []
    if (fonts !== false) {
      const processors = fonts === true ? createLocalFontProcessor() : createLocalFontProcessor(fonts)
      presets.push(
        presetWebFonts({
          provider: 'google',
          fonts: {
            sans: 'Mulish:400,600,700',
            mono: 'Fira Code:400',
          },
          // This will download the fonts and serve them locally
          processors,
        }),
      )
    }
    if (scalePx !== false) {
      // @ts-expect-error Something weird is happening here
      // Wait until someone fixes it also in https://unocss.dev/presets/rem-to-px
      presets.push(presetScalePx())
    }

    const variantLayer = `${prefix}variants`
    const variants: Preset['variants'] = [
      (matcher) => {
        if (!matcher.startsWith('inverted:'))
          return matcher
        return {
          matcher: matcher.slice(9),
          selector: s =>
            `:where(.inverted,[data-inverted])${s}, :where(.inverted,[data-inverted]) ${s}`,
          layer: variantLayer,
        }
      },
      (matcher) => {
        if (!matcher.startsWith('hocus:'))
          return matcher
        return {
          matcher: matcher.replace(/^hocus:/, ''),
          selector: s => `${s}:hover, ${s}:focus-visible`,
          layer: variantLayer,
        }
      },
      (matcher) => {
        if (!matcher.startsWith('group-hocus:'))
          return matcher
        return {
          matcher: matcher.slice(12),
          selector: s => `:where(.group,[group]):hover ${s}, :where(.group,[group]):focus ${s}`,
          layer: variantLayer,
        }
      },
      (matcher) => {
        if (!matcher.startsWith('leader-hocus:'))
          return matcher
        return {
          matcher: matcher.slice(13),
          selector: (s) =>
            `*:has(> :where(.leader,[leader]):where(:hover,:focus-visible)) ${s}`,
        }
      },
      (matcher) => {
        if (!matcher.startsWith('selected:'))
          return matcher
        return {
          matcher: matcher.slice(9),
          selector: s => `[data-selected]${s}, [data-selected] ${s}`,
          layer: variantLayer,
        }
      },
      (matcher) => {
        if (!matcher.startsWith('not-selected:'))
          return matcher
        return {
          matcher: matcher.slice(13),
          selector: s => `:not([data-selected]), :not([data-selected]) ${s}`,
          layer: variantLayer,
        }
      },
      (matcher) => {
        if (!matcher.startsWith('global-dark:'))
          return matcher
        return {
          matcher: matcher.slice('global-dark:'.length),
          selector: s => `html.dark ${s}`,
          layer: variantLayer,
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
              layer: variantLayer,
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
              // Ensures styles apply only to elements with data-state=${state} that don't contain nested data-state elements.  
              selector: (s) => `[data-state=${state}]:not(:has([data-state])) ${s}, [data-state=${state}]:not(:has([data-state]))${s}`,
              layer: variantLayer,
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
          'fluid-font-sizes',
          preflight && 'preflight',
          staticContent && 'static-content',
          spacing && 'spacing',
          typography && 'typography',
          utilities && 'utilities',
          'variants', // To ensure that the rules that have variants are applied after the rules that don't have variants
        ].filter(Boolean) as string[]

        return `@layer ${layers.map(layer => `${prefix}${layer}`).join(', ')};`
      },
    }
    preflights.unshift(layerDefinition)

    const autocompleteStaticContent: string[] = staticContent ? ['no-max-width', 'no-color', 'overlaps', 'heading-lg', 'section-gap'].map(u => `${prefix}${u}`) : []
    const autocompletePreflight = ['nq-no-color']

    const preset: Preset = {
      name: 'nimiq-preset',
      preflights,
      variants,
      theme: {
        colors,
        fontSize: {}, // We define the font sizes in the fluid-font-sizes
        fontFamily: {
          sans: 'Mulish',
          mono: 'Fira Code',
        },
        boxShadow: {
          DEFAULT: 'var(--nq-shadow)',
          lg: 'var(--nq-shadow-lg)',
        },
        easing: {
          nq: 'var(--nq-ease)',
        },
      },
      autocomplete: {
        templates: [...rulesNames, ...autocompletePreflight, ...autocompleteStaticContent],
      },
      presets,
      rules,
      layers: {
        [`${prefix}layer-definition`]: -101,
        [`${prefix}reset`]: -100,
        [`${prefix}colors`]: -50,
        [`${prefix}fluid-font-sizes`]: -50,
        [`${prefix}preflight`]: -40,
        components: -1,
        [`${prefix}static-content`]: 200,
        [`${prefix}spacing`]: 230,
        [`${prefix}typography`]: 250,
        [`${prefix}utilities`]: 300,
        default: 400,
        utilities: 500,
        [`${prefix}variants`]: 600,
      },
    }
    return preset
  }
}

export const presetNimiq: PresetFactory<PresetUnoTheme, NimiqPresetOptions> = definePreset(createPreset())
