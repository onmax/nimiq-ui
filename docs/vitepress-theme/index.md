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

Instead of using `defineConfig`, you will need to use `defineConfigWithTheme`:

::: code-group

```ts [.vitepress/config.ts]
import type { NimiqVitepressThemeConfig } from 'nimiq-vitepress-theme'
import { defineConfigWithTheme } from 'nimiq-vitepress-theme' // [!code highlight]
import { themeConfig } fom './themeConfig'

export default defineConfigWithTheme<NimiqVitepressThemeConfig>({  // [!code highlight]
  themeConfig // The config structure is different from Vitepress

  // The rest of your config like title, description, etc.
})
```

````ts [themeConfig.ts]
export const themeConfig = {
  modules: [
    {
      subpath: '/vitepress-theme',

      // This will be set as a class on a div element. This works great for UnoCSS Icons preset. Let me know if you need help with other icon libraries.
      icon: 'i-custom:nimiq-css',

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
            { text: 'Getting started', link: '/your-submodule/getting-started', icon: 'i-tabler:arrow-guide scale-120', },
            {
              text: 'My awesome accordion',
              icon: 'i-tabler:binary-tree scale-120',
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

:::

You can use the [config](https://github.com/onmax/nimiq-ui/tree/main/docs/.vitepress/config.ts) used for this documentation for reference.

### Import the layout

You need to import the layout from the theme

::: code-group

```ts [.vitepress/index.ts]
import { Theme } from 'vitepress'
import { Layout } from 'nimiq-vitepress-theme' // [!code highlight]

export default {
  Layout, // [!code highlight]
  enhanceApp() {
  },
} satisfies Theme
````

:::

### Register the components

This step is optional and only needed if you want to use the Vue components from `nimiq-vitepress-theme` in your project.

There are multiple ways you can import the components:

::: code-group

```md [your-markdown-file.md]
## Importing the components in the files themselves

This is my markdown file content and I want to use the `NqCard` component.

<script setup>
import NqCard from 'nimiq-vitepress-theme/components/NqCard.vue' // [!code highlight]
import NqLargeCard from 'nimiq-vitepress-theme/components/NqLargeCard.vue' // [!code highlight]
import NqGrid from 'nimiq-vitepress-theme/components/NqGrid.vue' // [!code highlight]
</script>

<NqCard> // [!code highlight]

# This is a card // [!code highlight]

</NqCard> // [!code highlight]
```

```ts [.vitepress/theme/index.ts]
/**
 * Auto importing a component globaly is not recommended!
 */

import type { EnhanceAppContext, Theme } from 'vitepress'
import { Layout } from 'nimiq-vitepress-theme'

import NqCard from 'nimiq-vitepress-theme/components/NqCard.vue' // [!code highlight]
import NqGrid from 'nimiq-vitepress-theme/components/NqGrid.vue' // [!code highlight]
import NqLargeCard from 'nimiq-vitepress-theme/components/NqLargeCard.vue' // [!code highlight]

export default {
  Layout,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('NqCard', NqCard) // [!code highlight]
    app.component('NqLargeCard', NqLargeCard) // [!code highlight]
    app.component('NqGrid', NqGrid) // [!code highlight]
  },
} satisfies Theme
```

:::

## Customization

This theme **has not been developed with customatization in mind**. In fact, it has the least possible amount of options on purpose as we want to keep it simple.

We can always discuss about adding more options if you need them. Open an [issue](https://github.com/onmax/nimiq-ui/issues/new) and let's talk about it.

## Credits

- The layout has been heavily inspired by the [Fumadocs](https://fumadocs.vercel.app/docs/ui) theme.
- Inspired by the work of the [Nimiq Hub documentation](https://www.nimiqhub.com/docs/learn).
- Using [Tabler Icons](https://tablericons.com/) and [Nimiq Icons](/nimiq-icons).
