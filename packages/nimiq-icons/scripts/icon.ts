import type { IconSet } from '@iconify/tools'
import type { ColorAttributes } from '@iconify/tools/lib/colors/attribs'
import type { Color } from '@iconify/utils/lib/colors/types'
import { cleanupSVG, isEmptyColor, parseColors, removeFigmaClipPathFromSVG, runSVGO, SVG } from '@iconify/tools'
import { compareColors, iconToHTML, replaceIDs, stringToColor } from '@iconify/utils'
import { JSDOM } from 'jsdom'
import { IconVariant } from './consts'

export function optimizeIconSet(iconSet: IconSet, variant: IconVariant) {
  console.log(`Processing icon ${variant}`)
  for (const icon of iconSet.list()) {
    processIcon(iconSet, variant, icon)
  }
  return iconSet
}

const isIcon = (variant: IconVariant) => variant === IconVariant.Icons
const isLarge = (variant: IconVariant) => variant === IconVariant.LargeIcons
const isLogo = (variant: IconVariant) => variant === IconVariant.Logos
// const isFlag = (variant: IconVariant) => variant === IconVariant.Flags

function processIcon(iconSet: IconSet, variant: IconVariant, name: string) {
  // Rename name if it is not an icon
  const newName = variant === IconVariant.Icons ? name : `${variant}-${name}`
  if (newName !== name)
    iconSet.rename(name, newName)

  let svg = iconSet.toSVG(newName)

  if (!svg)
    throw new Error(`Icon ${newName} is not an SVG in the ${iconSet.prefix} icon set.`)

  if (newName === 'spinner')
    svg = addSpinnerAnimation(svg)

  cleanupSVG(svg)
  removeFigmaClipPathFromSVG(svg)
  runSVGO(svg)

  if (isIcon(variant) || isLarge(variant)) {
    parseColors(svg, { defaultColor: 'currentColor', callback: handleColors, fixErrors: true })
  }

  const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  const newSvg = replaceIDs(svg.toMinifiedString(), () => `${iconSet.prefix}-${newName}-${randomId}`)
  const processed = new SVG(newSvg)
  iconSet.setIcon(newName, processed.getIcon())

  // We also include a monochrome version of the logos
  if (isLogo(variant) && !newName.includes('-white-')) {
    const monoSvg = new SVG(svg.toMinifiedString())
    parseColors(monoSvg, {
      defaultColor: 'currentColor',
      callback: (_attr, colorStr, color) => {
        if (!color) // color === null, so color cannot be parsed. Return colorStr to keep old value
          return colorStr

        if (isEmptyColor(color))// Color is empty: 'none' or 'transparent'. Return color object to keep old value
          return color

        return 'currentColor'
      },
      fixErrors: true,
    })
    const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const newMonoName = `${newName}-mono`
    const newSvg = replaceIDs(monoSvg.toMinifiedString(), () => `${iconSet.prefix}-${newMonoName}-${randomId}`)
    const processed = new SVG(newSvg)
    iconSet.setIcon(newMonoName, processed.getIcon())
  }
}

function handleColors(_: ColorAttributes, colorStr: string, color: Color | null): Color | string | 'remove' | 'unset' {
  // Color cannot be parsed, return colorStr to keep old value
  if (!color)
    return colorStr

  // Color is empty: 'none' or 'transparent', return color object to keep old value
  if (isEmptyColor(color))
    return color

  if (compareColors(color, stringToColor('#1F2348')!)) {
    return 'currentColor'
  }

  return color
}

function addSpinnerAnimation(_svg: SVG) {
  console.log(`Adding spinner animation to spinner`)
  const html = iconToHTML(_svg.getBody(), { height: `${_svg.viewBox.height}`, width: `${_svg.viewBox.width}`, viewBox: `0 0 ${_svg.viewBox.width} ${_svg.viewBox.height}` })

  const svg = new JSDOM(html).window.document.querySelector('svg')!

  const doc = new JSDOM(html).window.document
  const animateTransform = doc.createElementNS('http://www.w3.org/2000/svg', 'animateTransform')
  animateTransform.setAttribute('attributeName', 'transform')
  animateTransform.setAttribute('dur', '1s')
  animateTransform.setAttribute('type', 'rotate')
  animateTransform.setAttribute('from', '0 0 0')
  animateTransform.setAttribute('to', '360 0 0')
  animateTransform.setAttribute('repeatCount', 'indefinite')
  svg.appendChild(animateTransform)

  return new SVG(svg.outerHTML)
}
