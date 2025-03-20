# Cards

A simple card that can turn any boring content into something that looks intentional and professional. At least that's what we tell ourselves.

## Props

| Name          | Type                            | Default     | Description                                          |
| ------------- | ------------------------------- | ----------- | ---------------------------------------------------- |
| `href`        | `string`                        | `undefined` | Where your card wants to teleport users to           |
| `bg-color`    | `string`                        | `undefined` | The mood lighting for your card                      |
| `icon`        | `string`                        | `undefined` | The tiny picture that makes your card feel important |
| `title`       | `string`                        | `undefined` | The card's title                                     |
| `description` | `string`                        | `undefined` | The card's description                               |
| `label`       | `string`                        | `undefined` | Optional label displayed above the title             |
| `span`        | `'full' \| 'half' \| 'default'` | `undefined` | Controls how many columns the card spans in a grid   |

The component also supports using slots for custom content instead of props.

> [!TIP]
> Remember to [register `NqCard`](/vitepress-theme/#register-the-components) in your app.

## Examples

<ComponentPreview lang="vue">

<NqCard
  title="The Lonely Card"
  description="I'm just sitting here, carrying some content. No fancy links, no colors - I'm the minimalist of cards."
/>

</ComponentPreview>

<ComponentPreview lang="vue">

<NqCard
  href="https://nimiq.com"
  title="The Adventurous Card"
  description="Click me! I'll take you on a journey to the Nimiq website. I promise it's better than your average cat video."
/>

</ComponentPreview>

<ComponentPreview lang="vue">

<NqCard
  bg-color="blue"
  href="#"
  icon="i-nimiq:browsermesh"
  label="Build Something Amazing"
  title="The 5-Minute Challenge"
  description="Create a Nimiq app faster than making instant noodles (and it'll be more satisfying too!)"
/>

</ComponentPreview>

<ComponentPreview lang="vue">

<NqCard
  bg-color="green"
  href="#"
  icon="i-nimiq:cubes"
  label="Learn The Magic"
  title="Nimiq Under The Hood"
  description="Discover how Nimiq works - it's like LEGO for grownups, but with blockchain!"
/>

</ComponentPreview>

<ComponentPreview lang="vue">

<NqCard
  bg-color="orange"
  description="Remember to backup your wallet! Because losing crypto is like dropping your ice cream cone - sad and completely avoidable."
/>

</ComponentPreview>
