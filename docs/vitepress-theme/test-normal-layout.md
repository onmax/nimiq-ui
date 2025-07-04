---
title: Normal Layout Test
description: Testing the default layout behavior (no wide setting)
wide: false
---

# Normal Layout Test

This page demonstrates the default layout behavior without the `wide` setting. The prose content should be constrained to approximately 78 characters per line for optimal readability.

## Normal Content

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

## Constrained Tables

In the default layout, tables might overflow or wrap differently:

| Property           | Type      | Default                                      | Description                                  | Example Usage             | Notes                                      |
| ------------------ | --------- | -------------------------------------------- | -------------------------------------------- | ------------------------- | ------------------------------------------ |
| `wide`             | `boolean` | `false`, `true` if `secondarySidebar` is set | Remove max-width constraint on prose content | `wide: true`              | Useful for technical documentation         |
| `secondarySidebar` | `boolean` | `true` for docs layout                       | Whether to show the secondary sidebar        | `secondarySidebar: false` | Automatically enables wide layout when set |
| `outline`          | `boolean` | `true` if headings exist                     | Whether to show the outline                  | `outline: false`          | Controls table of contents                 |

## Code Examples

Code blocks in normal layout:

```javascript
// This code block has the standard max-width constraint
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

## Comparison

Compare this page with the "Wide Layout Test" page to see the difference in content width. The normal layout provides better readability for text-heavy content, while the wide layout is better for technical documentation with tables and code examples.
