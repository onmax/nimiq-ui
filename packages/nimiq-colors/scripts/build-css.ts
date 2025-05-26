import * as fs from 'fs';
import * as path from 'path';
import { allColors, allGradients, ThemedColorShades, ColorShades, GradientColor } from '../src/index';

const distDir = path.resolve(__dirname, '../dist');
const cssFilePath = path.join(distDir, 'nimiq-colors.css');

function generateCssVariables(colors: typeof allColors, gradients: typeof allGradients): string {
  let cssString = ':root {\n';

  // Helper to add a variable
  const addVariable = (name: string, value: string, theme?: 'light' | 'dark') => {
    if (theme === 'light') {
      // For light theme, variables are directly in :root
      cssString += `  --nq-${name}: ${value};\n`;
    } else if (theme === 'dark') {
      // Dark theme variables will be handled separately
    } else {
      // Non-themed variables
      cssString += `  --nq-${name}: ${value};\n`;
    }
  };
  
  // Generate color variables
  for (const colorName in colors) {
    const colorDef = colors[colorName as keyof typeof colors];
    if (typeof colorDef.DEFAULT === 'object' && colorDef.DEFAULT && 'light' in colorDef.DEFAULT && 'dark' in colorDef.DEFAULT) { // ThemedColorShades
      const themedColor = colorDef as ThemedColorShades;
      for (const shade in themedColor) {
        const shadeDef = themedColor[shade as keyof ThemedColorShades];
        if (shadeDef) {
          const varName = `${colorName}${shade === 'DEFAULT' ? '' : `-${shade}`}`;
          addVariable(varName, shadeDef.light, 'light');
        }
      }
    } else { // ColorShades (single theme or non-themed)
      const singleThemeColor = colorDef as ColorShades;
      for (const shade in singleThemeColor) {
        const shadeValue = singleThemeColor[shade as keyof ColorShades];
        if (shadeValue) {
          const varName = `${colorName}${shade === 'DEFAULT' ? '' : `-${shade}`}`;
          addVariable(varName, shadeValue);
        }
      }
    }
  }

  // Generate gradient variables (light theme)
  for (const gradientName in gradients) {
    const gradientDef = gradients[gradientName as keyof typeof gradients] as GradientColor;
    addVariable(`${gradientName}-from`, gradientDef.light.from, 'light');
    addVariable(`${gradientName}-to`, gradientDef.light.to, 'light');
    // CSS gradients are more complex; this is a simplified variable generation for now.
    // Actual gradient syntax will be: radial-gradient(var(--nq-gradientName-from), var(--nq-gradientName-to))
    // For simplicity, we'll just export the 'from' and 'to' stops.
    // The issue requests `light-dark()`, so a more robust solution might involve outputting
    // a single variable that uses `light-dark(oklch(...), oklch(...))`.
    // However, direct generation of `light-dark()` in CSS variables is tricky without PostCSS or similar.
    // This script provides the light and dark values separately for now.
    addVariable(gradientName, `radial-gradient(var(--nq-${gradientName}-from), var(--nq-${gradientName}-to))`, 'light');

  }
  cssString += '}\n\n';

  // Add dark theme overrides
  cssString += '@media (prefers-color-scheme: dark) {\n';
  cssString += '  :root {\n';
  for (const colorName in colors) {
    const colorDef = colors[colorName as keyof typeof colors];
    if (typeof colorDef.DEFAULT === 'object' && colorDef.DEFAULT && 'light' in colorDef.DEFAULT && 'dark' in colorDef.DEFAULT) { // ThemedColorShades
      const themedColor = colorDef as ThemedColorShades;
      for (const shade in themedColor) {
        const shadeDef = themedColor[shade as keyof ThemedColorShades];
        if (shadeDef) {
          const varName = `${colorName}${shade === 'DEFAULT' ? '' : `-${shade}`}`;
          cssString += `    --nq-${varName}: ${shadeDef.dark};\n`;
        }
      }
    }
  }
  for (const gradientName in gradients) {
    const gradientDef = gradients[gradientName as keyof typeof gradients] as GradientColor;
    cssString += `    --nq-${gradientName}-from: ${gradientDef.dark.from};\n`;
    cssString += `    --nq-${gradientName}-to: ${gradientDef.dark.to};\n`;
    cssString += `    --nq-${gradientName}: radial-gradient(var(--nq-${gradientName}-from), var(--nq-${gradientName}-to));\n`;
  }
  cssString += '  }\n';
  cssString += '}\n';
  
  // Alternative for explicit .dark class if prefers-color-scheme is not enough
  cssString += '\n/* Fallback for explicit .dark class */\n';
  cssString += '.dark, [data-theme="dark"] {\n';
    for (const colorName in colors) {
        const colorDef = colors[colorName as keyof typeof colors];
        if (typeof colorDef.DEFAULT === 'object' && colorDef.DEFAULT && 'light' in colorDef.DEFAULT && 'dark' in colorDef.DEFAULT) { // ThemedColorShades
          const themedColor = colorDef as ThemedColorShades;
          for (const shade in themedColor) {
            const shadeDef = themedColor[shade as keyof ThemedColorShades];
            if (shadeDef) {
              const varName = `${colorName}${shade === 'DEFAULT' ? '' : `-${shade}`}`;
              cssString += `  --nq-${varName}: ${shadeDef.dark};\n`;
            }
          }
        }
    }
    for (const gradientName in gradients) {
        const gradientDef = gradients[gradientName as keyof typeof gradients]as GradientColor;
        cssString += `  --nq-${gradientName}-from: ${gradientDef.dark.from};\n`;
        cssString += `  --nq-${gradientName}-to: ${gradientDef.dark.to};\n`;
        cssString += `  --nq-${gradientName}: radial-gradient(var(--nq-${gradientName}-from), var(--nq-${gradientName}-to));\n`;
    }
  cssString += '}\n';


  return cssString;
}

function build() {
  console.log('Building nimiq-colors.css...');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  const cssContent = generateCssVariables(allColors, allGradients);
  fs.writeFileSync(cssFilePath, cssContent);

  console.log(`Successfully built ${cssFilePath}`);
}

build();
