# Frontmatter

Frontmatter is a powerful feature in Vitepress that allows you to define metadata and configure page-specific options. In the Nimiq Vitepress theme, frontmatter is used to control various aspects of page rendering.

## Basic Syntax

Frontmatter is defined at the top of your markdown files, enclosed in triple dashes:

```yaml
---
layout: docs
sidebar: true
---
```

## Available Options

The Nimiq Vitepress theme supports the following frontmatter options:

### Layout Options

| Option                 | Type                             | Default                                         | Description                                                            |
| ---------------------- | -------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------- |
| `layout`               | `'home' \| 'docs' \| 'overview'` | `'docs'`                                        | Layout type to use for the page ([see layouts guide](./layouts.md))    |
| `sidebar`              | `boolean`                        | `true` for docs layout                          | Whether to show the sidebar                                            |
| `breadcrumbs`          | `boolean`                        | `true` for docs layout, `false` for home layout | Whether to show the breadcrumbs navigation                             |
| `outline`              | `boolean`                        | `true` if headings exist                        | Whether to show the outline (table of contents)                        |
| `secondarySidebar`     | `boolean`                        | `true` for docs layout, `false` for home layout | Whether to show the secondary sidebar                                  |
| `widget`               | `boolean`                        | `true` for docs layout, `false` for home layout | Whether to show the widget area in the secondary sidebar               |
| `changelog`            | `boolean`                        | `true` for docs layout, `false` for home layout | Whether to show the changelog in the secondary sidebar                 |
| `sourceCode`           | `boolean \| string`              | `true` for docs layout, `false` for home layout | Show source code controls. Can be a custom URL or boolean              |
| `sourceCodeLabel`      | `string`                         | `'View Source'`                                 | Label for the source code button                                       |
| `sourceCodePathPrefix` | `string \| undefined`            | Auto-detected                                   | Path prefix for source code URLs (e.g., `'docs'` or `''`)              |
| `copyMarkdown`         | `boolean`                        | Same as `sourceCode`                            | Show the copy markdown button independently                            |
| `inlineActions`        | `boolean`                        | `true`                                          | Show inline outline actions for overview pages or docs without outline |
| `pageFooterLeftText`   | `boolean \| string`              | Theme config default                            | Custom footer text (supports markdown). Set to `false` to hide         |

### Navigation Options

| Option | Type      | Description                          |
| ------ | --------- | ------------------------------------ |
| `prev` | `boolean` | Set to `false` to hide previous link |
| `next` | `boolean` | Set to `false` to hide next link     |

## Page Layouts

The theme supports three types of layouts: `home`, `docs`, and `overview`.

```yaml
---
# Set the layout type
layout: home # or 'docs' (default) or 'overview'
---
```

- **`docs`** (default) - Shows the sidebar, outline, and widget by default, suitable for documentation pages
- **`home`** - Hides both the sidebar and secondary sidebar, creating a clean, full-width page ideal for landing pages
- **`overview`** - Similar to docs but with inline actions enabled by default when outline is disabled

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

## Page Footer Text

The theme allows you to customize the footer text that appears at the bottom of each page. This can be configured globally in the theme config and overridden per-page using frontmatter.

**Use custom footer text (supports markdown):**

```yaml
---
pageFooterLeftText: Made with ❤️ by the Nimiq team
---
```

**Hide the footer text on a specific page:**

```yaml
---
pageFooterLeftText: false
---
```

**Use markdown formatting:**

```yaml
---
pageFooterLeftText: 'Edit this page on [GitHub](https://github.com/your-repo)'
---
```

> [!NOTE]
> The footer text supports inline markdown, allowing you to include links, emphasis, and other inline formatting.

## Inline Actions

For pages with the `overview` layout or `docs` layout with outline disabled, the theme can display inline outline actions within the content. This is useful for providing quick access to outline actions when the secondary sidebar is hidden.

**Enable inline actions (default):**

```yaml
---
layout: overview
# inlineActions: true is the default
---
```

**Disable inline actions:**

```yaml
---
layout: overview
inlineActions: false
---
```

**Typical use cases:**

- Overview pages where the outline would be redundant
- Documentation pages with `outline: false` that still need outline actions
- Landing pages that don't use the secondary sidebar

> [!TIP]
> Inline actions automatically appear on `overview` layouts and `docs` layouts with `outline: false`. Set `inlineActions: false` to disable this behavior.

## Using Frontmatter with Components

Some components in the Nimiq Vitepress theme can consume data directly from frontmatter, making it easy to populate components without writing additional code.

### Grid Component Example

You can define card data in frontmatter and pass it to the [`NqGrid` component](../components/grid):

```yaml
---
cards:
  - bgColor: blue
    icon: i-nimiq:bolt
    title: Build with Nimiq
    description: Create powerful blockchain applications with our easy-to-use tools
    label: Development
  - bgColor: green
    icon: i-nimiq:tools-wench-hammer
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
> If you're using the `NqGrid` component, you can define cards directly in the frontmatter as shown in the [NqGrid component documentation](../components/grid#basic-grid-with-frontmatter).
