# Cards

A simple card that can turn any boring content into something that looks intentional and professional. At least that's what we tell ourselves.

## Props

| Name       | Type     | Default     | Description                                                             |
| ---------- | -------- | ----------- | ----------------------------------------------------------------------- |
| `href`     | `string` | `undefined` | Where your card wants to teleport users to                              |
| `bg-color` | `string` | `undefined` | The mood lighting for your card                                         |
| `icon`     | `string` | `undefined` | The tiny picture that makes your card feel important                    |
| slot       | `string` | `undefined` | The magic portal where your content lives                               |

> [!TIP]
> Remember to [register `NqCard`](/vitepress-theme/#register-the-components) in your app. It's like introducing your components to a party - they need to be on the guest list!

## Examples

<ComponentPreview lang="Vue">

<NqCard>

#### The Lonely Card

I'm just sitting here, carrying some content. No fancy links, no colors - I'm the minimalist of cards.

</NqCard>

</ComponentPreview>

<ComponentPreview lang="Vue">

<NqCard href="https://nimiq.com">

#### The Adventurous Card

Click me! I'll take you on a journey to the Nimiq website. I promise it's better than your average cat video.

</NqCard>

</ComponentPreview>

<ComponentPreview lang="Vue">

<NqCard bg-color="blue" href="#" icon="i-nimiq:icons-lg-browsermesh">

#### Build Something Amazing {.nq-label}

##### The 5-Minute Challenge

Create a Nimiq app faster than making instant noodles (and it'll be more satisfying too!)

</NqCard>

</ComponentPreview>

<ComponentPreview lang="Vue">

<NqCard bg-color="green" href="#" icon="i-nimiq:icons-lg-cubes">

#### Learn The Magic {.nq-label}

##### Nimiq Under The Hood

Discover how Nimiq works - it's like LEGO for grownups, but with blockchain!

</NqCard>

</ComponentPreview>

<ComponentPreview lang="Vue">

<NqCard bg-color="orange">

Remember to backup your wallet! Because losing crypto is like dropping your ice cream cone - sad and completely avoidable.

</NqCard>

</ComponentPreview>
