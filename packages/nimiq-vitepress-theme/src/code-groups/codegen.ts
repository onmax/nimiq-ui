import { icons } from '@iconify-json/vscode-icons'
import { encodeSvgForCss, getIconData, iconToHTML, iconToSVG } from '@iconify/utils'
import { builtinIcons } from './builtin-icons'

export async function generateCSS(labels: Set<string>) {
  const mergedIcons = { ...builtinIcons }
  const matched = getMatchedLabels(labels, mergedIcons)
  const css = await generateIconCSS(matched)
  return { css }
}

function getMatchedLabels(labels: Set<string>, icons: Record<string, string>) {
  const matched: Record<string, string[]> = {}
  const sortedKeys = Object.keys(icons).sort((a, b) => b.length - a.length)
  for (const label of labels) {
    const key = sortedKeys.find(k => label?.toLowerCase().includes(k))
    if (key) {
      matched[icons[key]] = (matched[icons[key]] || []).concat(label)
    }
  }
  return matched
}

async function generateIconCSS(matched: Record<string, string[]>) {
  const iconCSS = await Promise.all(Object.entries(matched).map(async ([icon, labels]) => {
    const [, iconName] = icon.split(':')
    const iconData = getIconData(icons, iconName)
    if (!iconData)
      throw new Error(`Icon not found: ${iconName}`)
    const { attributes, body } = iconToSVG(iconData)
    const svg = encodeSvgForCss(iconToHTML(body, attributes))
    const selector = labels.map(l => l.replace('.','')).map(
      label => `:where([data-title$='${label}' i], [class$='language-${label}' i] .lang)::before`,
    ).join(', ')
    return `${selector} {--logo: url("data:image/svg+xml,${svg}");}`
  }))

  return iconCSS.sort().join('')
}
