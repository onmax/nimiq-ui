# Nimiq Vitepress Theme

Use this theme to style your VitePress documentation pages with the Nimiq brand.

[Vitepress](https://vitepress.dev) is a static page generator powered by Vite. It is a great solution for creating documentation pages with minimal configuration. We have created a theme that you can use to style your documentation pages with the Nimiq brand. This entire documentation page uses the Nimiq Vitepress theme 💅.

## Installation

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

## Usage

[Start a vitepress project](https://vitepress.dev/guide/getting-started) if you haven't already:

### Update your config

Use the Nimiq wrapper function around VitePress's standard `defineConfig`. This approach is compatible with VitePress v2 and avoids the deprecated `defineConfigWithTheme` function:

::: code-group

```ts [.vitepress/config.ts]
import type { NimiqVitepressThemeConfig } from 'nimiq-vitepress-theme'
import { defineNimiqVitepressConfig } from 'nimiq-vitepress-theme' // [!code hl]
import { themeConfig } from './themeConfig'

export default defineNimiqVitepressConfig<NimiqVitepressThemeConfig>({ // [!code hl]
  themeConfig, // The config structure is different from Vitepress

  // The rest of your config like title, description, etc.
})
```

```ts [themeConfig.ts]
export const themeConfig = {
  modules: [
    {
      subpath: '/vitepress-theme',

      // This will be set as a class on a div element. This works great for UnoCSS Icons preset. Let me know if you need help with other icon libraries.
      icon: 'i-local:nimiq-css',

      // This will be the default page link when the user clicks on the selector
      defaultPageLink: '/your-submodule/getting-started',

      // Text displayed in the selector
      text: 'Vitepress Theme',
      description: 'Your Viteprss with Nimiq',

      // Each module have their own sidebar
      sidebar: [
        {
          label: 'Guide',
          items: [
            { text: 'Getting started', link: '/your-submodule/getting-started', icon: 'i-tabler:arrow-guide ', },
            {
              text: 'My awesome accordion',
              icon: 'i-tabler:binary-tree ',
              items: [
                { text: 'Look I am Item 1', link: '/your-submodule/getting-started', },
                { text: 'Now I am Item 2', link: '/your-submodule/layers/preflights', },
              ]
            },
          ]
        }
      ]
    },
    // You can create as many submodules as you want.
  ],
  links: [
    // Any icon with link you want
    { icon: 'i-nimiq:logos-github-mono', link: 'https://github.com/onmax/nimiq-ui' }
  ],

  // Options for the bottom of the page
  showLastUpdated: true, // Default is true
  showEditContent: true, // Default is true
}
```

:::

You can use the [config](https://github.com/onmax/nimiq-ui/tree/main/docs/.vitepress/config.ts) used for this documentation for reference.

### Import the layout and CSS

Create a theme configuration file that extends the Nimiq theme:

::: code-group

```ts [.vitepress/theme/index.ts]
import { defineNimiqThemeConfig } from 'nimiq-vitepress-theme/theme'

export default defineNimiqThemeConfig({
  enhanceApp({ app }) {
    // The rest of your config
  },
})
```

:::

This will install the layout and will register the Nimiq Components globally.

### Configure the Vite plugin

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
        // Use this if your docs are not in the repository root
        contentPath: 'docs', // Optional, defaults to ''

        // Git changelog configuration (optional)
        // If not provided, will use repoURL as default
        // Set to false to disable changelog
        gitChangelog: {
          repoURL: 'https://github.com/your-org/your-repo' // Can be different from main repoURL
        },

        // Markdown generation (optional)
        // Set to false to disable automatic markdown generation
        // Or customize with options
        markdown: {
          cacheTTL: 3600000, // Cache duration in milliseconds (default: 1 hour)
          verbose: false // Enable verbose logging (default: false)
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
| `markdown`     | `object \| boolean` | `true`         | Markdown generation options or `false` to disable                                |

The plugin automatically:

- Configures Git changelog functionality using the provided repository URL
- Enables source code viewing and copying features
- Constructs proper URLs for "View Source" and "Edit Page" links
- Generates markdown files for all HTML pages during build

### Register the theme as internal dependency

This step is optional and only needed if you want to use the Vue components from `nimiq-vitepress-theme` in your project.

In Vitepress, dependencies are "externalized" from Vite's SSR transform module system. This means that you need to tell Vite that you are using a component from an external module:

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

For more information about why configure this, please refer to the [Server-Side Rendering | Vite documentation](https://vite.dev/guide/ssr.html#ssr-externals).

## Copy Page as Markdown

The theme automatically generates markdown versions of all HTML pages during build using the [@mdream/vite](https://github.com/harlan-zw/mdream) plugin. This enables users to easily copy page content as markdown for use with LLMs, note-taking apps, or other tools.

### How it works

1. **Automatic Generation**: The `NimiqVitepressVitePlugin` includes the mdream Vite plugin which automatically converts HTML pages to markdown during build
2. **Development Support**: In dev mode, markdown is generated on-demand when accessing any page with `.md` extension (e.g., `/guide.html` → `/guide.md`)
3. **Copy Button**: Each page includes a "Copy page" button that fetches the generated markdown and copies it to the clipboard
4. **Configurable**: You can customize caching, verbose logging, or disable the feature entirely through the plugin options

The markdown files are saved alongside their corresponding HTML files in the build output (e.g., `getting-started.html` → `getting-started.md`).

### Customization

You can configure the markdown generation or disable it entirely:

```ts
NimiqVitepressVitePlugin({
  // Disable markdown generation
  markdown: false,

  // Or customize options
  markdown: {
    cacheTTL: 7200000, // 2 hours cache
    verbose: true // Enable logging
  }
})
```

## VitePress Built-in Features

The Nimiq VitePress theme supports all standard VitePress features. You can configure them in your `themeConfig` object.

### Local Search

To enable VitePress's built-in local search, add the search configuration to your theme config:

```ts [themeConfig.ts]
export const themeConfig = {
  search: {
    provider: 'local'
  },
  // ... rest of your config
}
```

This enables VitePress's default local search functionality. For more advanced search options, refer to the [VitePress Search documentation](https://vitepress.dev/reference/default-theme-search).

### Other VitePress Features

All other VitePress configuration options work as expected:

- **Social Links**: Add links to your GitHub, Twitter, etc.
- **Edit Link**: Configure "Edit this page" functionality
- **Last Updated**: Show when pages were last modified
- **Prev/Next Links**: Configure page navigation
- **Sidebar**: Additional sidebar configuration options

Refer to the [VitePress Default Theme Config](https://vitepress.dev/reference/default-theme-config) for all available options.

## Custom Outline Actions

The theme allows you to add custom actions to the right outline sidebar. By default, it includes a "Copy page" button with expandable options for copying markdown links, viewing as markdown, and opening in ChatGPT or Claude.

You can add your own custom actions (like a feedback button) through the theme configuration:

```ts [themeConfig.ts]
export const themeConfig = {
  modules: [
    // ... your modules
  ],
  outlineActions: [
    {
      icon: 'i-tabler:message',
      label: 'Share feedback',
      onClick: () => {
        // Open your custom feedback modal
        // This function has access to the DOM and can trigger any action
        document.dispatchEvent(new CustomEvent('open-feedback-modal'))
      }
    }
  ],
  // ... rest of your config
}
```

### OutlineAction Interface

Each outline action supports the following properties:

| Property  | Type                          | Description                                |
| --------- | ----------------------------- | ------------------------------------------ |
| `icon`    | `string`                      | Icon class (e.g., `i-tabler:message`)      |
| `label`   | `string`                      | Text displayed next to the icon            |
| `onClick` | `() => void \| Promise<void>` | Function called when the action is clicked |

The actions appear below the outline (table of contents) with a horizontal separator, maintaining the same visual style as the outline items.

### Controlling Copy Options per Page

You can control which copy options appear in the dropdown menu using frontmatter:

```md
---
copyMarkdownLink: false  # Hide "Copy markdown link" option
copyViewMarkdown: true   # Show "View as markdown" option (default: true)
copyChatGPT: true        # Show "Open in ChatGPT" option (default: true)
copyClaude: true         # Show "Open in Claude" option (default: true)
---
```

You can also hide the entire copy feature on specific pages:

```md
---
copyOptions: hidden       # Hide all copy functionality
copyOptions: source-only  # Show only "View Source" button
---
```

## Customization

This theme **has not been developed with customatization in mind**. In fact, it has the least possible amount of options on purpose as we want to keep it simple.

We can always discuss about adding more options if you need them. Open an [issue](https://github.com/onmax/nimiq-ui/issues/new) and let's talk about it.

## Credits

- The layout has been heavily inspired by the [Fumadocs](https://fumadocs.vercel.app/docs/ui) theme.
- Inspired by the work of the [Nimiq Hub documentation](https://www.nimiqhub.com/docs/learn).
- Using [Tabler Icons](https://tablericons.com/) and [Nimiq Icons](../nimiq-icons/explorer.md).
