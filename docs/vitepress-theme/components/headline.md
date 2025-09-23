# Headlines

A versatile headline component that makes your content stand out with style. Perfect for page headers, section titles, and anywhere you need to grab attention.

## Props

| Name          | Type                 | Default     | Description                                             |
| ------------- | -------------------- | ----------- | ------------------------------------------------------- |
| `title`       | `string`             | -           | The main headline text (required)                       |
| `description` | `string`             | -           | Supporting text that appears below the title (required) |
| `label`       | `string`             | `undefined` | Optional label displayed above the title                |
| `h1`          | `boolean`            | `true`      | Whether to render as h1 (larger) or h2 (smaller)        |
| `align`       | `'center' \| 'left'` | `'center'`  | Alignment of the headline content                       |

> [!NOTE]
> The component can automatically use frontmatter values as fallbacks. If `title` or `description` are not provided as props, it will use the page's frontmatter `title` and `description` values.

> [!TIP]
> Remember to [register `NqHeadline`](/vitepress-theme/#register-the-components) in your app.

## Examples

### Basic Headline

<ComponentPreview lang="vue">

<NqHeadline
  title="Welcome to Nimiq"
  description="The browser-based blockchain designed for simplicity and accessibility."
/>

</ComponentPreview>

### With Label

<ComponentPreview lang="vue">

<NqHeadline
  label="Getting Started"
  title="Build Your First App"
  description="Learn how to create amazing applications with Nimiq in just a few minutes."
/>

</ComponentPreview>

### Left Aligned

<ComponentPreview lang="vue">

<NqHeadline
  align="left"
  title="Documentation"
  description="Comprehensive guides and API references to help you build with Nimiq."
/>

</ComponentPreview>

### As H2 (Smaller)

<ComponentPreview lang="vue">

<NqHeadline
  :h1="false"
  title="Nimiq Ecosystem"
  description="Explore the complete suite of tools and applications built on Nimiq."
/>

</ComponentPreview>

### Complete Example

<ComponentPreview lang="vue">

<NqHeadline
  label="Feature Spotlight"
  title="Browser-Based Mining"
  description="Experience the world's first browser-based blockchain that requires no downloads or installations."
  align="left"
/>

</ComponentPreview>

### Binding Frontmatter

You can also use the component without explicit props and it will automatically use the page's frontmatter values:

```
---
myHeadline:
  title: Getting Started with Nimiq
  description: Learn how to build amazing blockchain applications
---

<NqHeadline v-bind="$frontmatter.myHeadline"  />

Normal paragraph text follows here.
```
