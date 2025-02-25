# Nimiq Vitepress Theme

Use this theme to style your VitePress documentation pages with the Nimiq brand.

[Vitepress](https://vitepress.dev) is a static page generator powered by Vite. It is a great solution for creating documentation pages with minimal configuration. We have created a theme that you can use to style your documentation pages with the Nimiq brand. This entire documentation page uses the Nimiq Vitepress theme 💅.

## Installation

::: code-group

```bash [npm]
npm install nimiq-vitepress-theme
```

```bash [yarn]
yarn add nimiq-vitepress-theme
```

```bash [pnpm]
pnpm add nimiq-vitepress-theme
```

```bash [@antfu/ni]
ni nimiq-vitepress-theme
```

```bash [bun]
bun add nimiq-vitepress-theme
```

:::

## Usage

[Start a vitepress project](https://vitepress.dev/guide/getting-started) if you haven't already:

### Update your `.vitepress/config.ts`

Instead of using `defineConfig`, you will need to use `defineConfigWithTheme`:

```ts
import type { NimiqVitepressThemeConfig } from 'nimiq-vitepress-theme'
import { defineConfigWithTheme } from 'nimiq-vitepress-theme'

export default defineConfigWithTheme<NimiqVitepressThemeConfig>({
  // The rest of you config is the same as Vitepress

  // New themeConfig property
  themeConfig: {
    themeConfig: {
      modules: [
        {
          subpath: '/nimiq-css',

          // This will be set as a class on a div element. This works great for UnoCSS Icons preset. Let me know if you need help with other icon libraries.
          icon: 'i-custom:nimiq-css',

          // This will be the default page link when the user clicks on the selector
          defaultPageLink: '/your-submodule/getting-started',

          // Text displayed in the selector
          text: 'Nimiq CSS',
          description: 'The CSS framework',

          // Each module have their own sidebar
          sidebar: [
            {
              label: 'Guide',
              items: [
                { text: 'Getting started', link: '/your-submodule/getting-started', icon: 'i-tabler:arrow-guide scale-120', },
                {
                  text: 'My awesome accordion',
                  icon: 'i-tabler:binary-tree scale-120',
                  items: [
                    { text: 'Look I am Item 1', link: '/', },
                    { text: 'Now I am Item 2', link: '/your-submodule/layers/preflights', },
                  ]
                },
              ]
            }
          ]
        },
        // You can create as many submodules as you want.
      ],
      socialLinks: [
        // Any icon with link you want
        { icon: 'i-nimiq:logos-github-mono', link: 'https://github.com/onmax/nimiq-ui' }
      ],

      // Options for the bottom of the page
      showLastUpdated: true // Default is true
  showEditContent: true // Default is true
    },
  }
})
```

You can use the [config](https://github.com/onmax/nimiq-ui/tree/main/docs/.vitepress/config.ts) used for this documentation for reference.

## Customization

This theme has not been developed with customatization in mind. In fact, it has the least possible amount of options on purpose as we want to keep it simple.

We can always discuss about adding more options if you need them. Open an [issue](https://github.com/onmax/nimiq-ui/issues/new) and let's talk about it.

## Credits

- The layout has been heavily inspired by the [Fumadocs](https://fumadocs.vercel.app/docs/ui) theme.
-cInspired by the work of the [Nimiq Hub documentation](https://www.nimiqhub.com/docs/learn).
