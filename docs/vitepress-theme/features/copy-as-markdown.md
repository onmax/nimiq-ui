# Copy Page as Markdown

The theme automatically generates markdown versions of all HTML pages during build using [@mdream/vite](https://github.com/harlan-zw/mdream). This enables users to easily copy page content as markdown for use with LLMs, note-taking apps, or other tools.

## How it Works

1. **Automatic Generation**: The `NimiqVitepressVitePlugin` uses `@mdream/vite`, which converts each documentation page into a dedicated `.md` file during build
2. **Copy Button**: Each page includes a "Copy page" button that fetches the generated markdown and copies it to the clipboard

The markdown files are saved in a `markdown/` directory in the build output.

## Copy Options

The copy button includes a dropdown menu with several options:

### Native Options

- **Copy markdown link** - Copies a markdown-formatted link to the current page
- **View as markdown** - Opens the raw markdown source in a new tab

### External Options

- **Open in ChatGPT** - Opens the page content in ChatGPT's interface
- **Open in Claude** - Opens the page content in Claude's interface

All options are enabled by default but can be controlled per-page using frontmatter.

## Generating llms.txt Files

To generate `llms.txt` and `llms-full.txt` files in your repository root, use the mdream CLI after building your docs:

```bash
# Build the documentation
pnpm docs:build

# Generate llms.txt files in the root
pnpm dlx mdream llms "docs/.vitepress/dist/**/*.html" \
  --site-name "My Docs" \
  --description "My awesome documentation" \
  --origin "https://docs.example.com" \
  -o .
```

This will create:

- `llms.txt` - A sitemap of all documentation pages
- `llms-full.txt` - Complete markdown content of all pages
- `markdown/` directory - Individual markdown files for each page

## Configuration

The markdown generation is automatically configured when you use the `NimiqVitepressVitePlugin`:

```ts [vite.config.ts]
import { NimiqVitepressVitePlugin } from 'nimiq-vitepress-theme/vite'

export default defineConfig({
  plugins: [
    NimiqVitepressVitePlugin({
      repoURL: 'https://github.com/your-org/your-repo',

      // LLM-friendly markdown generation
      llms: {
        domain: 'https://docs.example.com',
        injectLLMHint: false
      }

      // Or disable it entirely
      // llms: false
    })
  ]
})
```

### Plugin Options

| Option | Type                | Default | Description                                                    |
| ------ | ------------------- | ------- | -------------------------------------------------------------- |
| `llms` | `object \| boolean` | `true`  | LLM-friendly markdown generation options or `false` to disable |

## Per-Page Control

Control copy options using frontmatter:

```md
---
# Hide specific options
copyMarkdownLink: false
copyViewMarkdown: true
copyChatGPT: true
copyClaude: true

# Or hide all copy functionality
copyOptions: hidden

# Or show only source view
copyOptions: source-only
---
```

See the [Outline Actions](/vitepress-theme/features/outline-actions) guide for more details on customizing the copy button behavior.
