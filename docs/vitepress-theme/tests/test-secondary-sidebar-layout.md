---
title: Secondary Sidebar Layout Test
description: Testing automatic wide layout when secondarySidebar is set
secondarySidebar: true
outline: true
widget: false
---

# Secondary Sidebar Layout Test

This page demonstrates the automatic wide layout behavior when `secondarySidebar` is explicitly set (without needing `wide: true`). Since `secondarySidebar: true` is set in the frontmatter, the prose content should automatically use the wide layout.

## How It Works

According to the logic:

1. If `wide` is explicitly set, use that value
2. If `secondarySidebar` is present (true or false), default to wide layout (`true`)
3. Otherwise, default to false

Since this page has `secondarySidebar: true` but no explicit `wide` setting, it should automatically use the wide layout.

## Secondary Sidebar Content

You should see the secondary sidebar on the right with:

- Table of contents (outline)
- No widget area (since `widget: false`)

## Wide Content Example

This content should be wide even though we didn't explicitly set `wide: true`:

| Property              | Type                           | Default                              | Description                                       | Notes |
| --------------------- | ------------------------------ | ------------------------------------ | ------------------------------------------------- | ----- |
| Automatic wide layout | When `secondarySidebar` is set | Makes sense for technical docs       | Pages with sidebars often need more content space |
| Manual override       | `wide: false` can disable      | Even when `secondarySidebar` is true | Provides full control to authors                  |

## Code in Wide Layout

```typescript
// This code should have more horizontal space due to automatic wide layout
interface WideLayoutConfiguration {
  secondarySidebar: boolean | undefined
  wide: boolean | undefined
  automaticBehavior: 'wide when secondarySidebar is set' | 'narrow by default'
}

function determineLayout(config: WideLayoutConfiguration): boolean {
  // Explicit wide setting takes precedence
  if (config.wide !== undefined) {
    return config.wide
  }

  // If secondarySidebar is explicitly set, default to wide
  if (config.secondarySidebar !== undefined) {
    return true
  }

  // Default to narrow layout
  return false
}
```

## Testing Override

You can test overriding this behavior by setting `wide: false` in a page that also has `secondarySidebar: true` - the explicit `wide: false` should take precedence.
