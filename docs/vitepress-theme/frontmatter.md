# Frontmatter

Frontmatter is a powerful feature in Vitepress that allows you to define metadata and configure page-specific options. In the Nimiq Vitepress theme, frontmatter is used to control various aspects of page rendering.

## Basic Syntax

Frontmatter is defined at the top of your markdown files, enclosed in triple dashes:

```yaml
---
title: My Page Title
description: A brief description of the page
---
```

## Available Options

The Nimiq Vitepress theme supports the following frontmatter options:

### General Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | `string` | - | Page title, shown in browser tabs and search results |
| `description` | `string` | - | Page description for SEO |

### Layout Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `outline` | `boolean` | `true` if headings exist | Whether to show the outline (table of contents) |
| `sidebar` | `boolean` | `true` if outline or widget is shown | Whether to show the secondary sidebar |
| `widget` | `boolean` | `true` | Whether to show the widget area in the secondary sidebar |

## Controlling the Sidebar

The secondary sidebar contains both the outline (table of contents) and optional widget area. You can control them independently:

```yaml
---
# Hide the outline but keep the widget
outline: false
widget: true

# Or hide both by disabling the entire sidebar
sidebar: false
---
```

## Using Frontmatter with Components

Some components in the Nimiq Vitepress theme can consume data directly from frontmatter, making it easy to populate components without writing additional code.

### Grid Component Example

You can define card data in frontmatter and pass it to the [`NqGrid` component](./components/grid.md):

```yaml
---
cards:
  - bgColor: blue
    icon: i-nimiq:fire
    title: Build with Nimiq
    description: Create powerful blockchain applications with our easy-to-use tools
    label: Development
  - bgColor: green
    icon: i-nimiq:tools
    title: Developer Tools
    description: Everything you need to build and deploy Nimiq applications
    label: Resources
  - title: Community Support
    description: Join our vibrant community of developers and enthusiasts
---

<NqGrid :cards="frontmatter.cards" />
```

> [!TIP]
> When using the frontmatter with components, make sure to reference the data using `frontmatter.propertyName` in your component props.

## Component-specific Frontmatter

If you need to create reusable data structures for specific components, consider grouping related data in the frontmatter:

```yaml
---
heroSection:
  title: Welcome to Nimiq
  description: The browser-first blockchain
  cta: 
    label: Get Started
    url: /getting-started
---

<HeroComponent v-bind="frontmatter.heroSection" />
```

> [!NOTE]
> If you're using the `NqGrid` component, you can define cards directly in the frontmatter as shown in the [NqGrid component documentation](./components/grid#basic-grid-with-frontmatter).
