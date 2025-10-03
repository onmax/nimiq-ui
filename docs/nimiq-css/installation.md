# Installation

Complete guide to installing and configuring Nimiq CSS in your project.

## Prerequisites

- Node.js 18 or higher
- A package manager (pnpm, npm, or yarn)

## Install the Package

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

## Integration Methods

Nimiq CSS supports three integration methods. Choose the one that best fits your project:

### Native CSS

Best for projects using vanilla CSS or any framework that supports standard CSS imports.

#### Full Import

Import everything at once:

```css
/* styles/main.css */
@import 'nimiq-css/css/index.css';
```

#### Selective Import

Import only the layers you need:

```css
/* styles/main.css */
@import 'nimiq-css/css/preflights.css' @layer nq-preflights;
@import 'nimiq-css/css/colors.css' @layer nq-colors;
@import 'nimiq-css/css/fonts.css' @layer nq-fonts;
@import 'nimiq-css/css/utilities.css' @layer nq-utilities;
@import 'nimiq-css/css/typography.css' @layer nq-typography;
@import 'nimiq-css/css/static-content.css' @layer nq-static-content;
```

::: tip Font Files Location
When using Vite, place font files in `/public/assets/fonts/`. For other build tools, adjust the font paths accordingly.
:::

[Learn more about Native CSS integration →](/nimiq-css/integrations/native-css)

### UnoCSS (Recommended)

Best for projects that want utility-first CSS with optimal performance.

#### Basic Setup

```ts
// uno.config.ts
import { presetNimiq } from 'nimiq-css'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetNimiq(),
  ],
})
```

#### Advanced Configuration

```ts
// uno.config.ts
import { presetNimiq } from 'nimiq-css'
import { defineConfig, presetAttributify } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(), // Optional: enables attributify mode
    presetNimiq({
      // Enable/disable features
      utilities: true,
      fonts: true,
      attributifyUtilities: true, // Requires presetAttributify

      // Customize font paths
      fonts: {
        fontAssetsDir: './public/fonts',
        fontServeBaseUrl: '/fonts',
      },
    }),
  ],
})
```

#### Vite Plugin

Add the UnoCSS Vite plugin to your project:

```ts
// vite.config.ts
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
  ],
})
```

Then import UnoCSS in your entry file:

```ts
// main.ts
import 'virtual:uno.css'
```

[Learn more about UnoCSS integration →](/nimiq-css/integrations/unocss)

### TailwindCSS

Best for projects already using TailwindCSS that want to add Nimiq design tokens.

```js
// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
  ],
  plugins: [
    require('nimiq-css/tailwind'),
  ],
}
```

[Learn more about TailwindCSS integration →](/nimiq-css/integrations/tailwindcss)

## Framework-Specific Setup

### Vue 3

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// For Native CSS
import 'nimiq-css/css/index.css'
// OR for UnoCSS
import 'virtual:uno.css'

createApp(App).mount('#app')
```

### React

```tsx
// main.tsx or index.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// For Native CSS
import 'nimiq-css/css/index.css'
// OR for UnoCSS
import 'virtual:uno.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

### Svelte

```ts
// main.ts
import App from './App.svelte'

// For Native CSS
import 'nimiq-css/css/index.css'
// OR for UnoCSS
import 'virtual:uno.css'

const app = new App({
  target: document.getElementById('app')!
})

export default app
```

### Next.js

For App Router:

```tsx
// app/layout.tsx
import 'nimiq-css/css/index.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

For Pages Router:

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app'
import 'nimiq-css/css/index.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

### Nuxt 3

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ['nimiq-css/css/index.css'],

  // OR with UnoCSS
  modules: ['@unocss/nuxt'],
})
```

## Adding Icons

Nimiq CSS works seamlessly with Nimiq Icons. Install the icon set:

::: code-group

```bash [pnpm]
pnpm add @nimiq/icons
```

```bash [npm]
npm install @nimiq/icons
```

```bash [yarn]
yarn add @nimiq/icons
```

:::

Then import the icon CSS:

```css
@import '@nimiq/icons/icons.css' @layer nq-icons;
```

Or with UnoCSS, add the Iconify preset:

```ts
// uno.config.ts
import { presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        nimiq: () => import('@nimiq/icons/json').then(i => i.default),
      },
    }),
  ],
})
```

[Browse all available icons →](/nimiq-icons/explorer)

## Verification

Create a test file to verify your installation:

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nimiq CSS Test</title>
  </head>
  <body>
    <div class="nq-card" style="max-width: 400px; margin: 40px auto">
      <h3 class="nq-text-h3">Installation Successful! 🎉</h3>
      <p class="nq-text">Nimiq CSS is now ready to use in your project.</p>
      <button class="nq-pill-blue">Get Started</button>
    </div>
  </body>
</html>
```

If you see a styled card with proper fonts and colors, your installation is complete!

## Troubleshooting

### Fonts not loading

**Problem**: Fonts appear as system defaults instead of Mulish.

**Solution**:

- Ensure font files are in the correct directory (`/public/assets/fonts/` for Vite)
- Check that font paths in your CSS match your project structure
- Verify your build tool is configured to copy font files

### Styles not applying

**Problem**: CSS classes don't have any effect.

**Solution**:

- Verify CSS is imported in your entry file
- Check that CSS layer order is correct
- Ensure there are no conflicting global styles
- For UnoCSS, verify the Vite plugin is configured

### Dark mode not working

**Problem**: Dark mode colors don't change.

**Solution**:

- Add `class="dark"` or `data-theme="dark"` to your `<html>` element
- Ensure color variables are being used (`var(--nq-blue)`)
- Check that the colors layer is imported

### Build errors

**Problem**: Build fails with import errors.

**Solution**:

- Clear your node_modules and reinstall dependencies
- Ensure all peer dependencies are installed
- Check that your bundler supports CSS imports

## Next Steps

Now that Nimiq CSS is installed:

- [Explore the color palette](/nimiq-css/palette)
- [Learn about utility classes](/nimiq-css/utilities)
- [Understand the philosophy](/nimiq-css/philosophy)
- [Set up typography](./typography/)
