import type { CSSValue, PresetWind3Theme, Rule } from 'unocss'
import { encodeSvgForCss, getIconData, iconToHTML, iconToSVG, replaceIDs } from '@iconify/utils'
import nimiqIconsJson from 'nimiq-icons/icons.json'

export interface NimiqIconsOptions {

}

export function getNimiqIcons(_options: NimiqIconsOptions): { rules: Rule<PresetWind3Theme>[], iconsNames: string[] } {
  const rules: Rule<PresetWind3Theme>[] = [
    [
      /^i-nimiq:(.*)$/,
      async function* ([, name], { symbols }) {
        const iconData = getIconData(nimiqIconsJson, name)
        if (!iconData) {
          console.warn(`Icon "${name}" not found in Nimiq icons`)
          return
        }
        const renderData = iconToSVG(iconData, { width: 'auto' })
        const html = iconToHTML(replaceIDs(renderData.body), renderData.attributes)
        const url = `url("data:image/svg+xml;utf8,${encodeSvgForCss(html)}")`
        const mode = html.includes('currentColor') ? 'mask' : 'bg'
        let cssObject: CSSValue
        if (mode === 'mask') {
          // Thanks to https://codepen.io/noahblon/post/coloring-svgs-in-css-background-images
          cssObject = {
            '--nq-icon': url,
            '-webkit-mask': 'var(--nq-icon) no-repeat',
            'mask': 'var(--nq-icon) no-repeat',
            '-webkit-mask-size': '100% 100%',
            'mask-size': '100% 100%',
            'background-color': 'currentColor',
            'width': '1em',
            'height': '1em',
            // for Safari https://github.com/elk-zone/elk/pull/264
            'color': 'inherit',
          }
        }
        else {
          const width = '1em'
          const viewBoxAttr = renderData.attributes.viewBox || '0 0 1 1'
          const parts = viewBoxAttr.split(' ')
          const viewBoxWidth = Number(parts[2] || 1)
          const viewBoxHeight = Number(parts[3] || 1)
          const absoluteWidth = iconData.width || viewBoxWidth
          const absoluteHeight = iconData.height || viewBoxHeight
          const ratio = absoluteHeight / absoluteWidth
          const height = `${ratio}em`
          cssObject = {
            'background': `${url} no-repeat`,
            'background-size': '100% 100%',
            'background-color': 'transparent',
            'width': width,
            'height': height,
          }
        }
        yield {
          [symbols.layer]: 'icons',
          ...cssObject,
        }
      },
      {
        layer: 'icons',
      },
    ],
  ]

  const iconsNames = Object.keys(nimiqIconsJson.icons).map(name => `i-nimiq:${name}`)

  return { rules, iconsNames }
}
