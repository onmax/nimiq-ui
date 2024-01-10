import { IconSet, cleanupSVG, parseColors, runSVGO, isEmptyColor, SVG } from "@iconify/tools";
import { ColorAttributes } from "@iconify/tools/lib/colors/attribs";
import { compareColors, stringToColor, iconToHTML, replaceIDs } from '@iconify/utils'
import type { Color } from '@iconify/utils/lib/colors/types'
import { JSDOM } from "jsdom";

type OptimiseIconSetOptions = {
  resetColors?: boolean,
}

export function optimizeIconSet(iconSet: IconSet, variant: string, options?: OptimiseIconSetOptions) {
  console.log(`Processing icon ${variant} with ${JSON.stringify(options)}`)
  for (const icon of iconSet.list()) {
    const newName = renameIcon(iconSet, variant, icon)
    const processed = processIcon(iconSet, newName, options)
    iconSet.setIcon(newName, processed.getIcon())
  }

  return iconSet
}

function renameIcon(iconSet: IconSet, variant: string, name: string) {
  // No need to rename icons in the icons package
  if (variant === 'icons') return name

  const newName = `${variant}-${name}`
  iconSet.rename(name, newName)

  return newName
}

function processIcon(iconSet: IconSet, name: string, { resetColors = false }: OptimiseIconSetOptions = {}) {
  let svg = iconSet.toSVG(name)

  if (!svg)
    throw new Error(`Icon ${name} is not an SVG in the ${iconSet.prefix} icon set.`);

  if (name === 'spinner')
    svg = addSpinnerAnimation(svg)

  cleanupSVG(svg)
  runSVGO(svg)
  
  if (resetColors) {
    parseColors(svg, { defaultColor: 'currentColor', callback: handleColors, fixErrors: true })
  }
  
  const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  const newSvg = replaceIDs(svg.toMinifiedString(), () => `${iconSet.prefix}-${name}-${randomId}`)

  return new SVG(newSvg)
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
  let html = iconToHTML(_svg.getBody(), { height: `${_svg.viewBox.height}`, width: `${_svg.viewBox.width}`, viewBox: `0 0 ${_svg.viewBox.width} ${_svg.viewBox.height}` });

  const svg = new JSDOM(html).window.document.querySelector('svg')!;

  const doc = new JSDOM(html).window.document;
  let animateTransform = doc.createElementNS('http://www.w3.org/2000/svg', 'animateTransform');
  animateTransform.setAttribute('attributeName', 'transform');
  animateTransform.setAttribute('dur', '1s');
  animateTransform.setAttribute('type', 'rotate');
  animateTransform.setAttribute('from', `0 0 0`);
  animateTransform.setAttribute('to', `360 0 0`);
  animateTransform.setAttribute('repeatCount', 'indefinite');
  svg.appendChild(animateTransform);

  return new SVG(svg.outerHTML);
}
