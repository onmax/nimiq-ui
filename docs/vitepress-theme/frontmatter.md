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

| Option        | Type     | Default | Description                                          |
| ------------- | -------- | ------- | ---------------------------------------------------- |
| `title`       | `string` | -       | Page title, shown in browser tabs and search results |
| `description` | `string` | -       | Page description for SEO                             |

### Layout Options

| Option             | Type               | Default                                         | Description                                              |
| ------------------ | ------------------ | ----------------------------------------------- | -------------------------------------------------------- |
| `layout`           | `'home' \| 'docs'` | `'docs'`                                        | Layout type to use for the page                          |
| `sidebar`          | `boolean`          | `true` for docs layout                          | Whether to show the sidebar                              |
| `breadcrumbs`      | `boolean`          | `true` for docs layout, `false` for home layout | Whether to show the breadcrumbs navigation               |
| `outline`          | `boolean`          | `true` if headings exist                        | Whether to show the outline (table of contents)          |
| `secondarySidebar` | `boolean`          | `true` for docs layout, `false` for home layout | Whether to show the secondary sidebar                    |
| `widget`           | `boolean`          | `true` for docs layout, `false` for home layout | Whether to show the widget area in the secondary sidebar |
| `changelog`        | `boolean`          | `true` for docs layout, `false` for home layout | Whether to show the changelog in the secondary sidebar   |

## Page Layouts

The theme supports two types of layouts: `home` and `docs`.

```yaml
---
# Set the layout type
layout: home # or 'docs' (default)
---
```

The `docs` layout (default) shows the sidebar, outline, and widget by default, making it suitable for documentation pages. The `home` layout hides both the sidebar and secondary sidebar, creating a clean, full-width page that's ideal for landing pages.

### Examples

#### Home Layout (Landing Page)

```yaml
---
layout: home
# No need to set sidebar or secondarySidebar to false as they're
# automatically hidden with home layout
---
```

#### Documentation Page Layout

```yaml
---
layout: docs
# All navigation elements show by default
---
```

#### Custom Layout Configuration

```yaml
---
layout: home
# Override the default home layout behavior to show the widget area
secondarySidebar: true
widget: true
changelog: true
---
```

## Controlling the Secondary Sidebar

The secondary sidebar contains both the outline (table of contents) and optional widget area. You can control them independently:

```yaml
---
# Hide the outline but keep the widget
outline: false
widget: true
changelog: true

# Or hide both by disabling the entire secondary sidebar
secondarySidebar: false
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
