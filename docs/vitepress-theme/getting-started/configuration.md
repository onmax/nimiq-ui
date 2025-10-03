# Configuration

The Nimiq VitePress theme uses a custom configuration structure centered around **modules**. Each module represents a section of your documentation with its own icon, sidebar, and pages.

## Theme Configuration Structure

::: code-group

```ts [themeConfig.ts]
export const themeConfig = {
  modules: [
    {
      subpath: '/vitepress-theme',
      icon: 'i-local:nimiq-css',
      defaultPageLink: '/your-module/getting-started',
      text: 'Module Name',
      description: 'Your module description',
      sidebar: [
        {
          label: 'Guide',
          items: [
            {
              text: 'Getting started',
              link: '/your-module/getting-started',
              icon: 'i-tabler:rocket',
            },
            {
              text: 'Advanced',
              icon: 'i-tabler:settings',
              items: [
                { text: 'Configuration', link: '/your-module/config' },
                { text: 'Deployment', link: '/your-module/deploy' },
              ]
            },
          ]
        }
      ]
    },
  ],
  links: [
    { icon: 'i-nimiq:logos-github-mono', link: 'https://github.com/your-org/repo' }
  ],
  showLastUpdated: true,
  showEditContent: true,
}
```

:::

## Module Configuration

### Module Properties

| Property          | Type     | Required | Description                                  |
| ----------------- | -------- | -------- | -------------------------------------------- |
| `subpath`         | `string` | Yes      | URL path for the module (e.g., `/my-module`) |
| `icon`            | `string` | Yes      | Icon class (works with UnoCSS Icons preset)  |
| `defaultPageLink` | `string` | Yes      | Default page when module is selected         |
| `text`            | `string` | Yes      | Display name in module selector              |
| `description`     | `string` | Yes      | Short description shown in selector          |
| `sidebar`         | `array`  | Yes      | Sidebar navigation structure (see below)     |

### Sidebar Structure

The sidebar uses a nested structure with labels and items:

```ts
sidebar: [
  {
    label: 'Section Name',
    items: [
      // Simple link
      {
        text: 'Page Title',
        link: '/path/to/page',
        icon: 'i-tabler:icon-name' // Optional
      },

      // Collapsible group
      {
        text: 'Group Name',
        icon: 'i-tabler:folder',
        items: [
          { text: 'Sub Page 1', link: '/path/page1' },
          { text: 'Sub Page 2', link: '/path/page2' },
        ]
      }
    ]
  }
]
```

## Icons

The theme works seamlessly with UnoCSS Icons preset. You can use:

- **Nimiq Icons**: `i-nimiq:icon-name` or `i-local:icon-name`
- **Tabler Icons**: `i-tabler:icon-name`
- **Any Iconify set**: `i-{collection}:{icon-name}`

::: tip Icon Libraries
This documentation uses [Tabler Icons](https://tablericons.com/) and [Nimiq Icons](/nimiq-icons/explorer). Configure other icon sets in your UnoCSS config.
:::

## Global Options

### Links

Add external links to your navigation:

```ts
links: [
  {
    icon: 'i-nimiq:logos-github-mono',
    link: 'https://github.com/your-org/repo',
    label: 'GitHub' // Optional tooltip
  },
]
```

### Page Footer Options

```ts [themeConfig.ts]
export const themeConfig = {
  showLastUpdated: true, // Show "Last Updated" timestamp
  showEditContent: true, // Show "Edit this page" link
  // ... rest of config
}
```

## VitePress Features

The theme supports all standard VitePress configuration options:

### Local Search

```ts [themeConfig.ts]
export const themeConfig = {
  search: {
    provider: 'local'
  },
  // ... rest of config
}
```

### Other VitePress Options

All VitePress features work as expected:

- **Social Links** - Add GitHub, Twitter, etc.
- **Edit Link** - Configure "Edit this page" functionality
- **Last Updated** - Show modification timestamps
- **Prev/Next Links** - Page navigation

See [VitePress Default Theme Config](https://vitepress.dev/reference/default-theme-config) for all available options.

## Example Configuration

View the [complete configuration](https://github.com/onmax/nimiq-ui/tree/main/docs/.vitepress/config.ts) used for this documentation site as a reference.

## Multiple Modules

You can create as many modules as needed:

```ts
modules: [
  {
    subpath: 'module-one',
    text: 'Module One',
    // ... config
  },
  {
    subpath: 'module-two',
    text: 'Module Two',
    // ... config
  },
]
```

Each module has independent navigation and sidebar configuration.
