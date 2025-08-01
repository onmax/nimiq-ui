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

| Option                 | Type                             | Default                                         | Description                                                         |
| ---------------------- | -------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------- |
| `layout`               | `'home' \| 'docs' \| 'overview'` | `'docs'`                                        | Layout type to use for the page ([see layouts guide](./layouts.md)) |
| `sidebar`              | `boolean`                        | `true` for docs layout                          | Whether to show the sidebar                                         |
| `breadcrumbs`          | `boolean`                        | `true` for docs layout, `false` for home layout | Whether to show the breadcrumbs navigation                          |
| `outline`              | `boolean`                        | `true` if headings exist                        | Whether to show the outline (table of contents)                     |
| `secondarySidebar`     | `boolean`                        | `true` for docs layout, `false` for home layout | Whether to show the secondary sidebar                               |
| `widget`               | `boolean`                        | `true` for docs layout, `false` for home layout | Whether to show the widget area in the secondary sidebar            |
| `changelog`            | `boolean`                        | `true` for docs layout, `false` for home layout | Whether to show the changelog in the secondary sidebar              |
| `sourceCode`           | `boolean \| string`              | `true` for docs layout, `false` for home layout | Show source code controls. Can be a custom URL or boolean           |
| `sourceCodeLabel`      | `string`                         | `'View Source'`                                 | Label for the source code button                                    |
| `sourceCodePathPrefix` | `string \| undefined`            | Auto-detected                                   | Path prefix for source code URLs (e.g., `'docs'` or `''`)           |
| `copyMarkdown`         | `boolean`                        | Same as `sourceCode`                            | Show the copy markdown button independently                         |
| `wide`                 | `boolean`                        | `false`, `true` if `secondarySidebar` is set    | Remove max-width constraint on prose content                        |

## Wide Layout

The `wide` option controls whether prose content should use the full available width or be constrained to a maximum width for better readability.

**Default behavior:**

- `wide: false` by default - content is constrained to approximately 78 characters per line for optimal reading
- `wide: true` automatically when `secondarySidebar` is explicitly set - provides more space for complex content

**Enable wide layout:**

```yaml
---
wide: true
---
```

**Disable wide layout (even when secondarySidebar is set):**

```yaml
---
secondarySidebar: true
wide: false
---
```

**Use cases for wide layout:**

- API documentation with long code examples
- Tables that need more horizontal space
- Technical content that benefits from wider presentation
- Pages with complex diagrams or wide visual content

### Navigation Options

| Option | Type                                                             | Description                                                                               |
| ------ | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `prev` | `string \| { text: string, link: string, description?: string }` | Link to the previous page. Can be a URL string or an object with text and link properties |
| `next` | `string \| { text: string, link: string, description?: string }` | Link to the next page. Can be a URL string or an object with text and link properties     |

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

#### Wide Layout for Technical Documentation

```yaml
---
# Automatically uses wide layout since secondarySidebar is set
secondarySidebar: true
outline: true
widget: false
---
```

#### Force Wide Layout Without Secondary Sidebar

```yaml
---
# Explicitly enable wide layout for full-width content
wide: true
secondarySidebar: false
---
```

## Source Code Controls

The theme includes source code controls next to the breadcrumbs, allowing users to view the source of the current page and copy the raw markdown content. These controls are enabled by default for documentation pages.

**Enable source code controls (default for docs layout):**

```yaml
---
sourceCode: true
---
```

**Disable source code controls:**

```yaml
---
sourceCode: false
---
```

**Use a custom source URL instead of the auto-generated GitHub link:**

```yaml
---
sourceCode: https://github.com/onmax/nimiq-ui/blob/main/docs/custom-path.md
sourceCodeLabel: Edit on GitHub
---
```

**Control buttons independently:**

```yaml
---
# Only show copy button, not the source link
copyMarkdown: true
sourceCode: false
---
```

**Or disable copy but keep source link:**

```yaml
---
copyMarkdown: false
sourceCode: true
---
```

### Features

The source code controls provide two separate buttons that can be controlled independently:

1. **Copy Markdown** - Copies the raw markdown content to the clipboard (controlled by `copyMarkdown`)
2. **View Source** - Opens the source file (GitHub by default, or custom URL) (controlled by `sourceCode`)

Both buttons are shown by default on documentation pages. The labels remain visible on desktop but become icon-only on mobile screens.

### Auto-Generated URLs

By default, when `sourceCode` is `true`, the theme automatically generates a GitHub URL based on:

- The repository URL from git history
- The current page's relative path
- The assumption that the source is in the `main` branch

For example, if your page is at `docs/guide/introduction.md`, the generated URL will be:
`https://github.com/your-repo/blob/main/docs/guide/introduction.md`

### Path Prefix Configuration

For most projects, the theme automatically detects the correct path structure. However, if you need to override this behavior, you can use the `sourceCodePathPrefix` option:

**For monorepo projects where VitePress runs from docs/ but files are in repo/docs/:**

```yaml
---
sourceCodePathPrefix: docs
---
```

**For standalone projects where VitePress runs from the root:**

```yaml
---
sourceCodePathPrefix: ''
---
```

**For custom directory structures:**

```yaml
---
sourceCodePathPrefix: documentation
---
```

If not specified, the theme will auto-detect the correct prefix based on the repository URL and common patterns. This ensures compatibility with both monorepo and standalone project structures.

## Controlling the Secondary Sidebar

The secondary sidebar contains both the outline (table of contents) and optional widget area. You can control them independently:

**Hide the outline but keep the widget:**

```yaml
---
outline: false
widget: true
changelog: true
---
```

**Or hide both by disabling the entire secondary sidebar:**

```yaml
---
secondarySidebar: false
---
```

## Page Navigation

The theme includes a previous/next page navigation feature that is generated automatically from your sidebar structure. You can disable either link per page using frontmatter:

**Hide only the previous link:**

```yaml
---
prev: false
---
```

**Hide only the next link:**

```yaml
---
next: false
---
```

**Hide both:**

```yaml
---
prev: false
next: false
---
```

If not set, both navigation links are shown by default, following the sidebar order. The navigation is always hidden on the home page.

> [!TIP]
> Use `prev: false` or `next: false` in your page frontmatter to hide the respective navigation link for that page.

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
