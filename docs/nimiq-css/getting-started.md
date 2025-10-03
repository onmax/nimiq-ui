# Getting Started

Nimiq CSS is a modular CSS framework built for the Nimiq design system. It provides design tokens, utilities, typography, and components that work seamlessly across all Nimiq projects.

## What is Nimiq CSS?

Nimiq CSS offers:

- **Design Tokens**: Consistent colors, spacing, and typography
- **CSS Utilities**: Ready-to-use classes for common patterns
- **Light/Dark Mode**: Built-in theme support
- **Modular Architecture**: Use only what you need via CSS layers
- **Multiple Integrations**: Works with Native CSS, UnoCSS, and TailwindCSS

## Quick Start

### Installation

::: code-group

```bash [pnpm]
pnpm add nimiq-css
```

```bash [npm]
npm install nimiq-css
```

```bash [yarn]
yarn add nimiq-css
```

:::

### Basic Usage

Choose your preferred integration method:

#### Native CSS

Import the complete framework in your CSS file:

```css
@import 'nimiq-css/css/index.css';
```

Or import specific layers:

```css
@import 'nimiq-css/css/preflights.css' @layer nq-preflights;
@import 'nimiq-css/css/colors.css' @layer nq-colors;
@import 'nimiq-css/css/fonts.css' @layer nq-fonts;
@import 'nimiq-css/css/utilities.css' @layer nq-utilities;
```

[Learn more about Native CSS integration →](/nimiq-css/integrations/native-css)

#### UnoCSS

Add the Nimiq preset to your UnoCSS configuration:

```ts
// uno.config.ts
import { presetNimiq } from 'nimiq-css'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetNimiq({
      utilities: true,
      fonts: true,
    }),
  ],
})
```

[Learn more about UnoCSS integration →](/nimiq-css/integrations/unocss)

#### TailwindCSS

Add the Nimiq plugin to your Tailwind configuration:

```js
// tailwind.config.js
module.exports = {
  plugins: [
    require('nimiq-css/tailwind'),
  ],
}
```

[Learn more about TailwindCSS integration →](/nimiq-css/integrations/tailwindcss)

## Your First Component

Once installed, you can start using Nimiq CSS utilities:

```html
<div class="nq-card">
  <h3 class="nq-text-h3">Welcome to Nimiq</h3>
  <p class="nq-text">Build amazing blockchain applications</p>
  <button class="nq-pill-blue">Get Started</button>
</div>
```

## Next Steps

- **[Philosophy](/nimiq-css/philosophy)** - Understand the design principles
- **[Color Palette](/nimiq-css/palette)** - Explore available colors
- **[Utilities](/nimiq-css/utilities)** - Browse utility classes
- **[Typography](./typography/)** - Learn about text styles
- **[CSS Layers](/nimiq-css/layers/)** - Deep dive into the architecture
