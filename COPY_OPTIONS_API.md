# Copy Options API Documentation

The Nimiq VitePress theme supports flexible frontmatter configuration for copy options using simple key-value pairs.

## Quick Start

### Main Control

```yaml
---
# Hide all copy options
copyOptions: hidden

# Show only GitHub source link
copyOptions: source-only

# Show copy button group (default)
# copyOptions: copy  # or omit entirely
---
```

## Individual Option Control

```yaml
---
# Individual dropdown options
copyMarkdownLink: false      # Hide "Copy Markdown Link"
copyViewMarkdown: false      # Hide "View as Markdown"
copyChatGPT: false          # Hide "Open in ChatGPT"
copyClaude: false           # Hide "Open in Claude"
---
```

### Examples

#### Documentation Page (Default)
```yaml
---
title: "API Reference"
# Copy button shown, View Source hidden by default
---
```

#### Show GitHub Source Link
```yaml
---
title: "API Reference"
copyOptions: source-only
---
```

#### Tutorial with Limited Options
```yaml
---
title: "Getting Started Tutorial"
copyChatGPT: true
copyClaude: false
copyViewMarkdown: false
---
```

#### Reference Page (Source Only)
```yaml
---
title: "Technical Specification"
copyOptions: source-only
---
```

#### Private Page (No Copy Options)
```yaml
---
title: "Internal Notes"
copyOptions: hidden
---
```

## API Reference

### Main Control Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `copyOptions` | string | `undefined` | `hidden`, `source-only`, or `copy` |

### Individual Dropdown Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `copyMarkdownLink` | boolean | `true` | Copy Markdown Link option |
| `copyViewMarkdown` | boolean | `true` | View as Markdown option |
| `copyChatGPT` | boolean | `true` | Open in ChatGPT option |
| `copyClaude` | boolean | `true` | Open in Claude option |

## Copy Options Explained

### Available Copy Options

1. **Copy MD** (Primary button) - Copies the raw markdown content to clipboard
2. **Copy Markdown Link** - Copies `[Page Title](Current URL)` format to clipboard
3. **View as Markdown** - Opens the GitHub source view in a new tab
4. **Open in ChatGPT** - Opens ChatGPT with: `Read {raw_markdown_url} so I can ask questions about it.`
5. **Open in Claude** - Opens Claude with: `Read {raw_markdown_url} so I can ask questions about it.`

### AI Platform Integration

The ChatGPT and Claude options generate URLs like:
- **ChatGPT**: `https://chatgpt.com/?hints=search&q=Read%20{encoded_raw_url}%20so%20I%20can%20ask%20questions%20about%20it.`
- **Claude**: `https://claude.ai/new?q=Read%20{encoded_raw_url}%20so%20I%20can%20ask%20questions%20about%20it.`

This allows the AI platforms to read the documentation directly from the source.

## Implementation Notes

- Copy button group is shown by default, but individual options can be controlled
- **View Source link is HIDDEN by default** - enable with `copyOptions: source-only`
- The `source-only` mode shows only the GitHub source link
- The `hidden` mode is useful for landing pages or private content
- Individual dropdown options can be disabled while keeping others enabled
- AI platforms receive the raw markdown URL instead of content for efficiency