# Nimiq VitePress Theme

A custom VitePress theme that brings the Nimiq brand to your documentation pages.

[VitePress](https://vitepress.dev) is a static site generator powered by Vite. The Nimiq VitePress theme extends it with a modern, multi-module documentation layout perfect for component libraries and design systems.

## Features

- 🎨 **Multi-Module Navigation** - Organize docs into separate modules with independent sidebars
- 🌙 **Dark Mode** - Built-in light/dark theme support
- 📱 **Responsive Design** - Mobile-first layout that works everywhere
- 🔍 **Local Search** - Fast client-side search powered by VitePress
- 📋 **Copy as Markdown** - Export any page as markdown for LLMs and note-taking
- 🎯 **Outline Actions** - Customizable action buttons in the table of contents
- 🔗 **Git Integration** - Automatic changelog and source code links
- 🧩 **Vue Components** - Pre-built UI components for documentation

## Quick Start

Install the theme:

::: code-group

```bash [pnpm]
pnpm add nimiq-vitepress-theme
```

```bash [npm]
npm install nimiq-vitepress-theme
```

:::

Configure it in your VitePress project:

```ts [.vitepress/config.ts]
import { defineNimiqVitepressConfig } from 'nimiq-vitepress-theme'

export default defineNimiqVitepressConfig({
  title: 'My Docs',
  description: 'Documentation with Nimiq style',
  themeConfig: {
    modules: [],
    links: []
  }
})
```

See the [Installation](/vitepress-theme/getting-started/installation) guide for complete setup instructions.

## Example

This entire documentation site uses the Nimiq VitePress theme! Check the [source code](https://github.com/onmax/nimiq-ui/tree/main/docs/.vitepress/config.ts) to see a real-world configuration.

## Credits

- Layout inspired by [Fumadocs](https://fumadocs.vercel.app/docs/ui)
- Based on the [Nimiq Hub documentation](https://www.nimiqhub.com/docs/learn)
- Icons from [Tabler Icons](https://tablericons.com/) and [Nimiq Icons](/nimiq-icons/explorer)

## Next Steps

<NqGrid>
  <NqCard to="/vitepress-theme/getting-started/installation" icon="i-tabler:download">
    <template #title>Installation</template>
    Step-by-step setup guide
  </NqCard>

  <NqCard to="/vitepress-theme/getting-started/configuration" icon="i-tabler:settings">
    <template #title>Configuration</template>
    Configure modules and navigation
  </NqCard>

  <NqCard to="/vitepress-theme/components/card" icon="i-tabler:components">
    <template #title>Components</template>
    Explore available UI components
  </NqCard>
</NqGrid>
