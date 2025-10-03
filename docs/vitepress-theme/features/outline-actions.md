# Outline Actions

The theme provides a powerful actions menu in the right outline sidebar that appears below the table of contents. This menu includes built-in actions and supports custom actions you can add through configuration.

## Built-in Actions

By default, the theme includes a **"Copy page"** button that copies the current page content as markdown to your clipboard. This button has an expandable dropdown (accessed via a chevron icon) with additional options:

### Native Options

- **Copy markdown link** - Copies a markdown-formatted link to the current page
- **View as markdown** - Opens the raw markdown source in a new tab

### External Options

- **Open in ChatGPT** - Opens the page content in ChatGPT's interface
- **Open in Claude** - Opens the page content in Claude's interface

All these options are enabled by default, but you can control which ones appear using frontmatter (see [Controlling Copy Options](#controlling-copy-options) below).

## Adding Custom Actions

You can add your own custom actions (like a feedback button) through the theme configuration:

```ts [themeConfig.ts]
export const themeConfig = {
  modules: [
    // ... your modules
  ],
  outlineActions: [
    {
      icon: 'i-tabler:message',
      label: 'Share feedback',
      onClick: () => {
        // Open your custom feedback modal
        document.dispatchEvent(new CustomEvent('open-feedback-modal'))
      }
    }
  ],
  // ... rest of your config
}
```

Custom actions appear alongside the built-in "Copy page" button in the actions menu.

## OutlineAction Interface

Each outline action supports the following properties:

| Property  | Type                          | Description                                |
| --------- | ----------------------------- | ------------------------------------------ |
| `icon`    | `string`                      | Icon class (e.g., `i-tabler:message`)      |
| `label`   | `string`                      | Text displayed next to the icon            |
| `onClick` | `() => void \| Promise<void>` | Function called when the action is clicked |

The actions appear below the outline (table of contents) with a horizontal separator, maintaining the same visual style as the outline items.

## Controlling Copy Options

You can control which copy options appear in the dropdown menu using frontmatter:

```md
---
copyMarkdownLink: false  # Hide "Copy markdown link" option
copyViewMarkdown: true   # Show "View as markdown" option (default: true)
copyChatGPT: true        # Show "Open in ChatGPT" option (default: true)
copyClaude: true         # Show "Open in Claude" option (default: true)
---
```

You can also hide the entire copy feature on specific pages:

```md
---
copyOptions: hidden       # Hide all copy functionality
copyOptions: source-only  # Show only "View Source" button
---
```

See the [Frontmatter](/vitepress-theme/guide/frontmatter) guide for more details on page-level configuration.
