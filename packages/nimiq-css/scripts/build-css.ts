import * as fs from 'node:fs'
import path from 'node:path'
import colors from '../src/colors'

function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

interface GradientColorSource {
  from: [string, string]
  to: [string, string]
  darkened?: {
    from: [string, string]
    to: [string, string]
  }
}

interface GradientColor {
  from: string
  to: string
  darkened?: {
    from: string
    to: string
  }
}

function extractGradients(colorData: typeof colors) {
  const gradients: Record<string, GradientColor> = {}

  for (const colorName in colorData) {
    const colorDef = colorData[colorName as keyof typeof colorData]
    if (colorDef && typeof colorDef === 'object' && 'gradient' in colorDef) {
      const gradientSource = colorDef.gradient as GradientColorSource

      // Convert array format to light-dark() format
      const from = gradientSource.from[0] === gradientSource.from[1]
        ? gradientSource.from[0]
        : `${gradientSource.from[0]},${gradientSource.from[1]}`

      const to = gradientSource.to[0] === gradientSource.to[1]
        ? gradientSource.to[0]
        : `${gradientSource.to[0]},${gradientSource.to[1]}`

      gradients[colorName] = {
        from,
        to,
      }

      // Handle darkened variants if they exist and are not empty
      if (gradientSource.darkened
        && gradientSource.darkened.from
        && gradientSource.darkened.to
        && gradientSource.darkened.from[0]
        && gradientSource.darkened.from[1]
        && gradientSource.darkened.to[0]
        && gradientSource.darkened.to[1]) {
        const darkenedFrom = gradientSource.darkened.from[0] === gradientSource.darkened.from[1]
          ? gradientSource.darkened.from[0]
          : `${gradientSource.darkened.from[0]},${gradientSource.darkened.from[1]}`

        const darkenedTo = gradientSource.darkened.to[0] === gradientSource.darkened.to[1]
          ? gradientSource.darkened.to[0]
          : `${gradientSource.darkened.to[0]},${gradientSource.darkened.to[1]}`

        gradients[colorName].darkened = {
          from: darkenedFrom,
          to: darkenedTo,
        }
      }
    }
  }

  return gradients
}

function generateCssVariables(colorData: typeof colors, gradients: Record<string, GradientColor>): string {
  let cssString = '/*Auto-generated*/\n:root {\n'

  // Generate color variables
  for (const colorName in colorData) {
    const colorDef = colorData[colorName as keyof typeof colorData]
    const kebabColorName = toKebabCase(colorName)

    if (Array.isArray(colorDef)) {
      // Handle top-level array colors (like white, darkblue, darkerblue)
      const [lightValue, darkValue] = colorDef
      if (lightValue === darkValue) {
        // If both values are the same, create a single variable
        cssString += `  --colors-${kebabColorName}: ${lightValue};\n`
      }
      else {
        // If values are different, create separate variables for light and dark
        cssString += `  --colors-${kebabColorName}: light-dark(${lightValue}, ${darkValue});\n`
      }
    }
    else if (colorDef && typeof colorDef === 'object') {
      for (const shade in colorDef) {
        if (shade === 'gradient')
          continue // Skip gradient property for now

        const shadeValue = colorDef[shade as keyof typeof colorDef]
        if (Array.isArray(shadeValue)) {
          const [lightValue, darkValue] = shadeValue
          const varName = `${kebabColorName}${shade === 'DEFAULT' ? '' : `-${shade}`}`
          if (lightValue === darkValue) {
            // If both values are the same, create a single variable
            cssString += `  --colors-${varName}: ${lightValue};\n`
          }
          else {
            // If values are different, use light-dark() function
            cssString += `  --colors-${varName}: light-dark(${lightValue}, ${darkValue});\n`
          }
        }
        else if (shadeValue && typeof shadeValue === 'string') {
          const varName = `${kebabColorName}${shade === 'DEFAULT' ? '' : `-${shade}`}`
          cssString += `  --colors-${varName}: ${shadeValue};\n`
        }
      }
    }
  }

  // Generate gradient variables
  for (const gradientName in gradients) {
    const gradientDef = gradients[gradientName as keyof typeof gradients]
    const kebabGradientName = toKebabCase(gradientName)

    // Generate -from and -to variables (they already contain light-dark() functions)
    cssString += `  --colors-${kebabGradientName}-gradient-from: ${gradientDef.from};\n`
    cssString += `  --colors-${kebabGradientName}-gradient-to: ${gradientDef.to};\n`

    // Generate the gradient variable
    cssString += `  --colors-${kebabGradientName}-gradient: radial-gradient(at 100% 100%, var(--colors-${kebabGradientName}-gradient-from), var(--colors-${kebabGradientName}-gradient-to));\n`

    // Generate darkened variants if they exist and are not empty
    if (gradientDef.darkened && gradientDef.darkened.from && gradientDef.darkened.to) {
      cssString += `  --colors-${kebabGradientName}-gradient-darkened-from: ${gradientDef.darkened.from};\n`
      cssString += `  --colors-${kebabGradientName}-gradient-darkened-to: ${gradientDef.darkened.to};\n`
      cssString += `  --colors-${kebabGradientName}-gradient-darkened: radial-gradient(at 100% 100%, var(--colors-${kebabGradientName}-gradient-darkened-from), var(--colors-${kebabGradientName}-gradient-darkened-to));\n`
    }
  }

  cssString += '}\n'

  return cssString
}

export function buildCSS() {
  console.log('Building nimiq-colors.css...')

  // Copy ./src/css folder to ./dist/css without minification
  const srcDir = path.resolve('./src/css')
  const srcColorsFile = path.resolve(srcDir, 'colors.css')
  const destDir = path.resolve('./dist/css')

  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true })
  }

  const gradients = extractGradients(colors)
  const cssContent = generateCssVariables(colors, gradients)
  fs.writeFileSync(srcColorsFile, cssContent)

  console.log(`Successfully built ${srcColorsFile}`)

  // Copy all files from src/css to dist/css
  copyDirectorySync(srcDir, destDir)
  console.log('CSS files copied from src/css to dist/css')
}

/**
 * Recursively copy a directory
 */
function copyDirectorySync(src: string, dest: string) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  // Read all files and directories in the source
  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      // Recursively copy subdirectories
      copyDirectorySync(srcPath, destPath)
    }
    else {
      // Copy files
      fs.copyFileSync(srcPath, destPath)
    }
  }
}
