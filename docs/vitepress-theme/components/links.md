# Links

A component for displaying external links with consistent styling. Perfect for showcasing related resources, external documentation, or social media links.

## Props

| Name    | Type            | Default     | Description                             |
| ------- | --------------- | ----------- | --------------------------------------- |
| `item`  | `NqLinksItem`   | `undefined` | Single link item to display             |
| `items` | `NqLinksItem[]` | `undefined` | Array of multiple link items to display |

### NqLinksItem Interface

| Name      | Type              | Default                                          | Description                                                                                              |
| --------- | ----------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `label`   | `string`          | required                                         | The text displayed for the link                                                                          |
| `href`    | `string`          | required                                         | The URL the link points to                                                                               |
| `icon`    | `string \| false` | auto-detected                                    | Icon class or `false` to disable. Auto-detects icons for common domains (GitHub, Discord, Twitter, etc.) |
| `variant` | `string`          | first: `nq-pill-blue`, rest: `nq-pill-secondary` | Pill variant: `blue`, `gold`, `green`, `secondary`, `tertiary`, `orange`                                 |
| `title`   | `string`          | `undefined`                                      | Optional tooltip text for accessibility                                                                  |

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

### Links with Different Variants

Use different pill variants to color-code your links.

<ComponentPreview lang="vue">

<NqPlayground>
<NqLinks :items="[
  {
    label: 'Documentation',
    href: '/docs',
    variant: 'nq-pill-blue',
    icon: 'i-nimiq:book'
  },
  {
    label: 'API Reference',
    href: '/api',
    variant: 'nq-pill-green',
    icon: 'i-nimiq:code'
  },
  {
    label: 'Support',
    href: '/support',
    variant: 'nq-pill-orange',
    icon: 'i-nimiq:help'
  }
]" />
</NqPlayground>

</ComponentPreview>

### Auto-Detected Domain Icons

Links automatically get appropriate icons based on their domain. Set `icon: false` to disable.

<ComponentPreview lang="vue">

<NqPlayground>
<NqLinks :items="[
  {
    label: 'GitHub Repository',
    href: 'https://github.com/nimiq/ui'
  },
  {
    label: 'Discord Community',
    href: 'https://discord.gg/nimiq'
  },
  {
    label: 'Follow on Twitter',
    href: 'https://twitter.com/nimiq'
  },
  {
    label: 'No Icon Link',
    href: 'https://example.com',
    icon: false
  }
]" />
</NqPlayground>

</ComponentPreview>

#### Supported Domains

The following domains are automatically detected and assigned icons:

- **Nimiq**: `nimiq.com` → `i-nimiq:logos-nimiq-mono`
- **GitHub**: `github.com` → `i-nimiq:logos-github-mono`
- **Discord**: `discord.gg`, `discord.com` → `i-nimiq:logos-discord-mono`
- **Twitter/X**: `twitter.com`, `x.com` → `i-nimiq:logos-twitter-mono`
- **Telegram**: `telegram.org`, `t.me` → `i-nimiq:logos-telegram-mono`

## Usage Notes

- Use either `item` for a single link or `items` for multiple links, not both
- If both props are provided, `items` takes precedence
- Links are displayed with consistent spacing using `flex="~ gap-8"`
- The component uses Nimiq's pill styling (`nq-pill-secondary`) and arrow indicator (`nq-arrow`)
- All links automatically include security attributes for external navigation
