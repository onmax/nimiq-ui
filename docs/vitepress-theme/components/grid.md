# Grids

Think of grids as the Marie Kondo of UI components - they help keep your cards organized and spark joy in your layouts!

## Props

| Name    | Type     | Default     | Description                           |
| ------- | -------- | ----------- | ------------------------------------- |
| `cards` | `Card[]` | `undefined` | Array of card objects to render       |

The component also supports using slots for custom content instead of props.

## Basic grid with frontmatter

You can define your grid cards directly in the frontmatter of your markdown file:

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
  - title: Documentation
    description: Comprehensive guides and API references at your fingertips
  - title: Get Started
    description: Take your first steps into blockchain development with Nimiq
---

<NqGrid :cards="frontmatter.cards" />
```

<ComponentPreview>

<NqGrid>

<NqCard
  title="The First Card"
  description="I'm just the first in a series of amazing cards."
/>

<NqCard
  title="The Second Card"
  description="Right in the middle, keeping things balanced."
/>

<NqCard
  title="The Third Card"
  description="Last but not least, completing the trilogy."
/>

</NqGrid>

</ComponentPreview>

## Complex Grid

<ComponentPreview>

<NqGrid>

<NqCard
  bg-color="blue"
  href="#"
  icon="i-nimiq:icons-lg-browsermesh"
  label="Build Something Cool"
  title="Your Journey Starts Here"
  description="Like building with LEGO, but for grown-ups who code!"
/>

<NqCard
  bg-color="green"
  href="#"
  icon="i-nimiq:icons-lg-cubes"
  label="Learn The Ropes"
  title="Beyond Hello World"
  description="Because understanding Nimiq is easier than explaining why you need another mechanical keyboard."
/>

<NqCard
  title="The Support Squad"
  description="We're like your coding best friends, minus the coffee borrowing."
/>

<NqCard
  title="The Innovation Corner"
  description="Where ideas come to party and bugs come to retire."
/>

<NqCard
  title="The Fun Zone"
  description="Because who said documentation had to be boring?"
/>

</NqGrid>

</ComponentPreview>

## Grid with Large Cards

<ComponentPreview>

<NqGrid>

<NqLargeCard
  icon="i-nimiq:tools"
  title="The Wise Elder"
  description="I'm the big card that's seen it all. Think of me as the senior developer of cards."
/>

<NqLargeCard
  icon="i-nimiq:tools"
  title="The Middle Manager"
  description="I keep things balanced, like a good project manager (but more reliable)."
/>

<NqLargeCard
  icon="i-nimiq:tools"
  title="The Team Player"
  description="I complete the trio with style. Three's company, four's a grid overflow!"
/>

</NqGrid>

</ComponentPreview>
