# Links

A component for displaying external links with consistent styling. Perfect for showcasing related resources, external documentation, or social media links.

## Props

| Name    | Type            | Default     | Description                             |
| ------- | --------------- | ----------- | --------------------------------------- |
| `item`  | `NqLinksItem`   | `undefined` | Single link item to display             |
| `items` | `NqLinksItem[]` | `undefined` | Array of multiple link items to display |

### NqLinksItem Interface

| Name    | Type     | Default     | Description                                    |
| ------- | -------- | ----------- | ---------------------------------------------- |
| `label` | `string` | required    | The text displayed for the link                |
| `href`  | `string` | required    | The URL the link points to                     |
| `icon`  | `string` | `undefined` | Optional icon class (e.g., `i-nimiq:external`) |
| `title` | `string` | `undefined` | Optional tooltip text for accessibility        |

All links automatically open in a new tab with `target="_blank"` and include `rel="noopener noreferrer"` for security.

> [!TIP]
> Remember to [register `NqLinks`](/vitepress-theme/#register-the-components) in your app.

## Examples

### Single Link

Display a single external link with an icon.

<ComponentPreview lang="vue">

<NqPlayground>
<NqLinks :item="{
  label: 'GitHub Repository',
  href: 'https://github.com/nimiq/ui',
  icon: 'i-nimiq:external',
  title: 'View source code on GitHub'
}" />
</NqPlayground>

</ComponentPreview>

### Multiple Links

Display multiple related links in a horizontal layout.

<ComponentPreview lang="vue">

<NqPlayground>
<NqLinks :items="[
  {
    label: 'Documentation',
    href: 'https://docs.nimiq.com',
    icon: 'i-nimiq:book',
    title: 'Read the documentation'
  },
  {
    label: 'Discord',
    href: 'https://discord.gg/nimiq',
    icon: 'i-nimiq:chat',
    title: 'Join our Discord community'
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/nimiq',
    icon: 'i-nimiq:twitter',
    title: 'Follow us on Twitter'
  }
]" />
</NqPlayground>

</ComponentPreview>

### Links Without Icons

Simple text links without icons for minimal designs.

<ComponentPreview lang="vue">

<NqPlayground>
<NqLinks :items="[
  {
    label: 'Terms of Service',
    href: '/terms'
  },
  {
    label: 'Privacy Policy',
    href: '/privacy'
  },
  {
    label: 'Contact',
    href: '/contact'
  }
]" />
</NqPlayground>

</ComponentPreview>

## Usage Notes

- Use either `item` for a single link or `items` for multiple links, not both
- If both props are provided, `items` takes precedence
- Links are displayed with consistent spacing using `flex="~ gap-8"`
- The component uses Nimiq's pill styling (`nq-pill-secondary`) and arrow indicator (`nq-arrow`)
- All links automatically include security attributes for external navigation
