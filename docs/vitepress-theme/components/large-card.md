# Large Card

A variant of the card component that is larger and more prominent.

## Props

| Name          | Type     | Default     | Description                            |
| ------------- | -------- | ----------- | -------------------------------------- |
| `href`        | `string` | `undefined` | The destination of your card's journey |
| `icon`        | `string` | `undefined` | The fancy hat your card wears          |
| `title`       | `string` | `undefined` | The card's title                       |
| `description` | `string` | `undefined` | The card's description                 |

The component also supports using slots for custom content instead of props.

## Examples

<ComponentPreview lang="vue">

<NqPlayground>
<NqLargeCard
  icon="i-nimiq:tools"
  title="The Gentle Giant"
  description="I may be big, but I'm friendly! Perfect for showcasing important content that needs some breathing room."
/>
</NqPlayground>

</ComponentPreview>

<ComponentPreview lang="vue">

<NqPlayground>
<NqLargeCard
  icon="i-nimiq:tools"
  href="#"
  title="The Social Butterfly"
  description="I'm big AND I can take you places! Click me, I don't bite."
/>
</NqPlayground>

</ComponentPreview>
