# VitePress Integration

The Nimiq VitePress theme supports all standard VitePress features. You can configure them in your `themeConfig` object.

## Local Search

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

## Other VitePress Features

All other VitePress configuration options work as expected:

### Social Links

Add links to your GitHub, Twitter, etc:

```ts
export const themeConfig = {
  socialLinks: [
    { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    { icon: 'twitter', link: 'https://twitter.com/vuejs' }
  ]
}
```

### Edit Link

Configure "Edit this page" functionality:

```ts
export const themeConfig = {
  editLink: {
    pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
    text: 'Edit this page on GitHub'
  }
}
```

Or use the Nimiq theme's built-in `showEditContent` option:

```ts
export const themeConfig = {
  showEditContent: true // default: true
}
```

### Last Updated

Show when pages were last modified:

```ts
export const themeConfig = {
  lastUpdated: {
    text: 'Updated at',
    formatOptions: {
      dateStyle: 'full',
      timeStyle: 'medium'
    }
  }
}
```

Or use the Nimiq theme's built-in `showLastUpdated` option:

```ts
export const themeConfig = {
  showLastUpdated: true // default: true
}
```

### Prev/Next Links

Configure page navigation:

```ts
export const themeConfig = {
  docFooter: {
    prev: 'Previous page',
    next: 'Next page'
  }
}
```

### Footer

Add a footer to all pages:

```ts
export const themeConfig = {
  footer: {
    message: 'Released under the MIT License.',
    copyright: 'Copyright © 2024-present Your Name'
  }
}
```

## Logo Context Menu

The theme includes a context menu (right-click) on the logo that displays your project version and custom menu items.

### Version Display

By default, the context menu automatically shows your project version from `package.json`. This feature is opt-out:

```ts [themeConfig.ts]
export const themeConfig = {
  logoContextMenu: {
    showVersion: false // Disable version display
  }
}
```

The version is automatically extracted from your project's `package.json` by the Nimiq VitePress Vite plugin.

### Custom Menu Items

Add custom menu items to the logo context menu:

```ts [themeConfig.ts]
export const themeConfig = {
  logoContextMenu: {
    items: [
      {
        label: 'View on GitHub',
        icon: 'i-tabler:brand-github',
        href: 'https://github.com/your-org/your-repo'
      },
      {
        label: 'Report Issue',
        icon: 'i-tabler:bug',
        onClick: () => {
          window.open('https://github.com/your-org/your-repo/issues/new', '_blank')
        }
      },
      {
        label: 'Documentation',
        icon: 'i-tabler:book',
        href: 'https://docs.example.com'
      }
    ]
  }
}
```

### Configuration Options

**`logoContextMenu.showVersion`** (boolean, default: `true`)

- Show the project version from `package.json` in the context menu
- Set to `false` to hide the version

**`logoContextMenu.items`** (array of objects)

- Custom menu items to display
- Each item can have:
  - `label` (required): Text to display
  - `icon` (optional): Icon class (e.g., `i-tabler:brand-github`, `i-nimiq:star`)
  - `href` (optional): URL to open in a new tab
  - `onClick` (optional): Function to execute when clicked

**Usage:**

Right-click on the logo in the header to see the context menu with your version and custom items.

## Additional Configuration

For a complete list of available VitePress options, refer to the [VitePress Default Theme Config](https://vitepress.dev/reference/default-theme-config) documentation.

## Customization Note

This theme has **not been developed with extensive customization in mind**. It intentionally has minimal configuration options to keep things simple and maintain the Nimiq brand consistency.

If you need additional customization options, please [open an issue](https://github.com/onmax/nimiq-ui/issues/new) to discuss it!
