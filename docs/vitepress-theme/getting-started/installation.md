# Installation

## Package Installation

Install the Nimiq VitePress theme in your project:

::: code-group

```bash [pnpm]
pnpm add nimiq-vitepress-theme
```

```bash [npm]
npm install nimiq-vitepress-theme
```

```bash [yarn]
yarn add nimiq-vitepress-theme
```

```bash [bun]
bun add nimiq-vitepress-theme
```

:::

::: tip Prerequisites
Make sure you have [VitePress](https://vitepress.dev/guide/getting-started) already set up in your project.
:::

## Configuration

### 1. Update VitePress Config

Use the Nimiq wrapper function around VitePress's standard `defineConfig`:

::: code-group

```ts [.vitepress/config.ts]
import type { NimiqVitepressThemeConfig } from 'nimiq-vitepress-theme'
import { defineNimiqVitepressConfig } from 'nimiq-vitepress-theme' // [!code hl]
import { themeConfig } from './themeConfig'

export default defineNimiqVitepressConfig<NimiqVitepressThemeConfig>({ // [!code hl]
  themeConfig,
  title: 'My Docs',
  description: 'My awesome documentation',
  // ... rest of your VitePress config
})
```

:::

### 2. Import the Theme

Create a theme configuration file:

::: code-group

```ts [.vitepress/theme/index.ts]
import { defineNimiqThemeConfig } from 'nimiq-vitepress-theme/theme'

export default defineNimiqThemeConfig({
  enhanceApp({ app }) {
    // Optional: register additional components
  },
})
```

:::

This will install the layout and register the Nimiq Components globally.

### 3. Configure the Vite Plugin

The theme provides a Vite plugin that adds Git changelog, source code features, and automatic markdown generation:

::: code-group

```ts [vite.config.ts]
import { NimiqVitepressVitePlugin } from 'nimiq-vitepress-theme/vite'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    plugins: [
      NimiqVitepressVitePlugin({
        // GitHub repository URL (required for source code features)
        repoURL: 'https://github.com/your-org/your-repo',

        // Content directory path relative to repository root
        contentPath: 'docs', // Optional, defaults to ''

        // Git changelog configuration (optional)
        gitChangelog: {
          repoURL: 'https://github.com/your-org/your-repo'
        },

        // LLM-friendly markdown generation (optional)
        llms: {
          domain: 'https://docs.example.com',
          injectLLMHint: false
        }
      })
    ]
  }
})
```

:::

#### Plugin Options

| Option         | Type                | Default        | Description                                                                      |
| -------------- | ------------------- | -------------- | -------------------------------------------------------------------------------- |
| `repoURL`      | `string`            | -              | GitHub repository URL used for source code links and as default for GitChangelog |
| `contentPath`  | `string`            | `''`           | Directory path where documentation files are located relative to repository root |
| `gitChangelog` | `object \| false`   | Uses `repoURL` | Git changelog configuration or `false` to disable                                |
| `llms`         | `object \| boolean` | `true`         | LLM-friendly markdown generation options or `false` to disable                   |

The plugin automatically:

- Configures Git changelog functionality
- Enables source code viewing and copying features
- Constructs proper URLs for "View Source" and "Edit Page" links
- Generates LLM-optimized markdown files using `vitepress-plugin-llms`

### 4. Register as Internal Dependency (Optional)

Only needed if you want to use Vue components from `nimiq-vitepress-theme` in your markdown files:

::: code-group

```ts [vite.config.ts]
import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    ssr: { // [!code hl]
      noExternal: [ // [!code hl]
        'nimiq-vitepress-theme', // [!code hl]
      ], // [!code hl]
    }, // [!code hl]
  }
})
```

:::

::: details Why is this needed?
In VitePress, dependencies are "externalized" from Vite's SSR transform module system. Learn more in the [Vite SSR documentation](https://vite.dev/guide/ssr.html#ssr-externals).
:::

## Next Steps

- [Configure your theme](/vitepress-theme/getting-started/configuration) - Set up modules, sidebar, and navigation
- [Explore components](/vitepress-theme/components/card) - See available UI components
- [View examples](https://github.com/onmax/nimiq-ui/tree/main/docs/.vitepress/config.ts) - Check the config used for this documentation
