import type { CSSValue, PresetWind3Theme, Rule } from 'unocss'
import { encodeSvgForCss } from '@iconify/utils'
import nimiqIcons from 'nimiq-icons/icons.json'
import type { Theme } from 'unocss/preset-mini'

export interface NimiqColorOptions {
  /**
   * Whether to ignore the color flags in the SVGs.
   * 
   * @default true
   */
  ignoreFlags?: boolean
}

export function getNimiqIcons(options: NimiqColorOptions = {}): Rule<PresetWind3Theme>[] {
  const { ignoreFlags = true } = options
  const rules: Rule<PresetWind3Theme>[] = Object.entries(nimiqIcons.icons)
    .map(([name, parsed]) => {
      if (name.startsWith('flags') && ignoreFlags)
        return

      const url = `url("data:image/svg+xml;utf8,${encodeSvgForCss(parsed.body)}")`

      const mode = parsed.body.includes('currentColor') ? 'mask' : 'bg'
      let cssObject: CSSValue
      if (mode === 'mask') {
        // Thanks to https://codepen.io/noahblon/post/coloring-svgs-in-css-background-images
        cssObject = {
          '--un-icon': url,
          '-webkit-mask': 'var(--nq-icon) no-repeat',
          'mask': 'var(--nq-icon) no-repeat',
          '-webkit-mask-size': '100% 100%',
          'mask-size': '100% 100%',
          'background-color': 'currentColor',
          // for Safari https://github.com/elk-zone/elk/pull/264
          'color': 'inherit',
        }
      }
      else {
        cssObject = {
          'background': `${url} no-repeat`,
          'background-size': '100% 100%',
          'background-color': 'transparent',
        }
      }
      return [`i-nimiq:${name}`, cssObject] satisfies Rule<Theme>
    })
    .filter(Boolean) as Rule<PresetWind3Theme>[]

  return rules
}
