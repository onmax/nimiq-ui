---
title: Wide Layout Test
description: Testing the new wide layout feature
wide: true
---

# Wide Layout Test

This page demonstrates the new `wide` layout feature. When `wide: true` is set in the frontmatter, the prose content should expand to use the full available width instead of being constrained to ~78 characters per line.

## Normal Content

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

## Wide Tables

The wide layout is particularly useful for tables and code blocks that need more horizontal space:

| Property           | Type      | Default                                      | Description                                  | Example Usage             | Notes                                      |
| ------------------ | --------- | -------------------------------------------- | -------------------------------------------- | ------------------------- | ------------------------------------------ |
| `wide`             | `boolean` | `false`, `true` if `secondarySidebar` is set | Remove max-width constraint on prose content | `wide: true`              | Useful for technical documentation         |
| `secondarySidebar` | `boolean` | `true` for docs layout                       | Whether to show the secondary sidebar        | `secondarySidebar: false` | Automatically enables wide layout when set |
| `outline`          | `boolean` | `true` if headings exist                     | Whether to show the outline                  | `outline: false`          | Controls table of contents                 |

## Code Examples

Wide layout also works well with longer code examples:

```javascript
// This code block should have more horizontal space in wide layout
function processComplexConfiguration(config) {
  return {
    apiEndpoint: config.apiEndpoint || 'https://api.example.com/v1',
    timeout: config.timeout || 5000,
    retries: config.retries || 3,
    headers: {
      'User-Agent': config.userAgent || 'MyApp/1.0.0',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...config.customHeaders
    },
    authentication: {
      type: config.auth?.type || 'bearer',
      token: config.auth?.token || process.env.API_TOKEN,
      refreshUrl: config.auth?.refreshUrl || 'https://api.example.com/v1/auth/refresh'
    }
  }
}
```

## Testing Default Behavior

To test the default behavior, you can create another page without the `wide: true` setting and compare the content width.
