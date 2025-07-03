# Nimiq VitePress Theme

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

A modern, beautiful VitePress theme with Nimiq branding and design patterns.

## Features

- 🎨 Modern, clean design with Nimiq branding
- 🌙 Dark mode support
- 📱 Fully responsive layout
- 🔍 Advanced search functionality
- 🧭 Smart navigation with breadcrumbs
- 📝 Rich typography and code highlighting
- 🎯 Custom components (NqCard, NqGrid, NqHeadline, etc.)
- **🚨 Beautiful custom 404 error page**

## Components

### Built-in Components

- `NqCard` - Flexible card component with optional icons and links
- `NqGrid` - Responsive grid layout
- `NqHeadline` - Structured headline component
- `NqLargeCard` - Large featured card component
- `NqModulesGrid` - Grid for displaying modules

### Error Page

The theme includes a custom 404 error page with:

- Friendly error message with random emojis
- Quick navigation options (Go Back, Go Home)
- Integrated search functionality
- Quick links to common pages
- Display of available modules
- Responsive design for mobile and desktop

## Installation

```bash
npm install nimiq-vitepress-theme
```

## Usage

```ts
// .vitepress/config.ts
import { defineNimiqVitepressConfig } from 'nimiq-vitepress-theme'

export default defineNimiqVitepressConfig({
  title: 'Your Documentation',
  description: 'Your description',
  themeConfig: {
    modules: [
      {
        text: 'Getting Started',
        defaultPageLink: '/getting-started',
        description: 'Learn the basics'
      }
    ]
  }
})
```

## Theme Configuration

The theme supports various configuration options:

```ts
interface NimiqVitepressThemeConfig {
  modules: NimiqVitepressThemeNav[]
  links?: {
    icon: string
    link: string
  }[]
  showLastUpdated?: boolean
  showEditContent?: boolean
  search?: { provider: 'local' }
}
```

## Testing the 404 Page

To test the custom 404 error page:

1. Start your development server
2. Navigate to any non-existent page (e.g., `/non-existent-page`)
3. The custom error page will display with:
   - Random emoji
   - Friendly error message
   - Navigation options
   - Search functionality
   - Quick links and module exploration

## Development

```bash
# Install dependencies
pnpm install

# Build the theme
pnpm build

# Development
pnpm dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/pkg-placeholder?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/pkg-placeholder
[npm-downloads-src]: https://img.shields.io/npm/dm/pkg-placeholder?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/pkg-placeholder
[bundle-src]: https://img.shields.io/bundlephobia/minzip/pkg-placeholder?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=pkg-placeholder
[license-src]: https://img.shields.io/github/license/onmax/nimiq-ui.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/onmax/nimiq-ui/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/pkg-placeholder

## Git Data Performance

The git data feature fetches information about files from git history, which can be slow for large repositories.
To improve performance, the script implements:

1. **Caching**: File information is cached in `.vitepress/cache/git-data-cache.json`
2. **Change detection**: Only files that have been modified since the last run are processed

### Debugging

To enable debug logs for the git data script, run VitePress with:

```bash
DEBUG=true npm run dev
```

### Configuration

You can adjust the concurrency level by modifying the `CONCURRENCY` constant in `git.data.ts`.
