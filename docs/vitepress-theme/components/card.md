# Cards

A simple card that can turn any boring content into something that looks intentional and professional. At least that's what we tell ourselves.

## Props

| Name          | Type                            | Default     | Description                                                     |
| ------------- | ------------------------------- | ----------- | --------------------------------------------------------------- |
| `href`        | `string`                        | `undefined` | Where your card wants to teleport users to                      |
| `bg-color`    | `string`                        | `undefined` | The mood lighting for your card                                 |
| `icon`        | `string`                        | `undefined` | The tiny picture that makes your card feel important (optional) |
| `title`       | `string`                        | `undefined` | The card's title (optional)                                     |
| `description` | `string`                        | `undefined` | The card's description (optional)                               |
| `label`       | `string`                        | `undefined` | Optional label displayed above the title                        |
| `layout`      | `'column' \| 'row'`             | `'column'`  | Switch to `row` to place the icon on the left next to the copy  |
| `span`        | `'full' \| 'half' \| 'default'` | `undefined` | Controls how many columns the card spans in a grid              |

The component also supports using slots for custom content instead of props.

The default column layout stacks everything neatly; flip to `row` when you want the icon leading on the left and the label sitting just above the title.

> [!TIP]
> Remember to [register `NqCard`](/vitepress-theme/#register-the-components) in your app.

## Examples

### Basic Card

Simple card with just title and description - perfect for static content display.

<ComponentPreview lang="vue">

<NqCard
  title="Getting Started"
  description="Learn the basics of building with Nimiq's browser-first blockchain technology."
/>

</ComponentPreview>

### Clickable Card

Add an `href` to make the entire card clickable and navigatable.

<ComponentPreview lang="vue">

<NqCard
  href="/getting-started"
  title="Documentation"
  description="Explore our comprehensive guides and API references."
/>

</ComponentPreview>

### Card with Icon (Column Layout)

Default column layout with icon positioned absolutely on the right side.

<ComponentPreview lang="vue">

<NqCard
  icon="i-nimiq:cubes"
  title="Build Apps"
  description="Create decentralized applications with our developer tools."
/>

</ComponentPreview>

### Card with Background Color

Use predefined colors (blue, green, orange, gold, red) to add visual emphasis.

<ComponentPreview lang="vue">

<NqCard
  bg-color="blue"
  href="#"
  title="Join the Network"
  description="Become part of the Nimiq ecosystem and start earning rewards."
/>

</ComponentPreview>

### Card with Label

Add a label above the title for better content categorization.

<ComponentPreview lang="vue">

<NqCard
  bg-color="green"
  icon="i-nimiq:browsermesh"
  label="Tutorial"
  title="Your First Transaction"
  description="Step-by-step guide to sending your first Nimiq transaction."
/>

</ComponentPreview>

### Row Layout

Use `layout="row"` to place the icon on the left with content flowing to the right.

<ComponentPreview lang="vue">

<NqCard
  layout="row"
  icon="i-nimiq:cubes"
  label="Developer Tools"
  title="Nimiq RPC API"
  description="Connect to the Nimiq network using our JSON-RPC interface."
/>

</ComponentPreview>
