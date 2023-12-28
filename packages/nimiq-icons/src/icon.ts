import { IconSet, cleanupSVG, parseColors, runSVGO, isEmptyColor } from "@iconify/tools";
import { ColorAttributes } from "@iconify/tools/lib/colors/attribs";
import { compareColors, stringToColor } from '@iconify/utils/lib/colors'
import type { Color } from '@iconify/utils/lib/colors/types'

type OptimiseIconSetOptions = {
  resetColors?: boolean,
}

export function optimizeIconSet(iconSet: IconSet, options?: OptimiseIconSetOptions) {
  iconSet.list().forEach(iconName => handleIcon(iconSet, iconName, options))
}

function handleIcon(iconSet: IconSet, name: string, { resetColors = false }: OptimiseIconSetOptions = {}) {
  const svg = iconSet.toSVG(name)

  if (!svg)
    throw new Error(`Icon ${name} is not an SVG in the ${iconSet.prefix} icon set.`);

  cleanupSVG(svg)
  runSVGO(svg)

  if (resetColors)
    parseColors(svg, { defaultColor: 'currentColor', callback: handleColors })

  iconSet.setIcon(name, svg.getIcon())
}

function handleColors(_: ColorAttributes, colorStr: string, color: Color | null): Color | string | 'remove' | 'unset' {
  // Color cannot be parsed, return colorStr to keep old value
  if (!color)
    return colorStr

  // Color is empty: 'none' or 'transparent', return color object to keep old value
  if (isEmptyColor(color))
    return color

  if (compareColors(color, stringToColor('#1F2348')!))
    return 'currentColor'

  return color
}
