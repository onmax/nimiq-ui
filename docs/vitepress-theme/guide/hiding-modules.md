# Hiding Modules from Navigation

The Nimiq VitePress theme allows you to hide specific modules from the navigation while keeping them accessible for legacy reasons and SEO purposes.

## Basic Usage

To hide a module from both the sidebar and header navigation, add the `hidden: true` property to the module configuration:

```ts
// .vitepress/config.ts
export default defineNimiqVitepressConfig({
  themeConfig: {
    modules: [
      {
        text: 'Visible Module',
        subpath: 'visible-module',
        defaultPageLink: '/visible-module/',
        description: 'This module appears in navigation',
        sidebar: [
          // ... sidebar config
        ],
      },
      {
        text: 'Hidden Module',
        subpath: 'hidden-module',
        defaultPageLink: '/hidden-module/',
        description: 'This module is hidden from navigation',
        hidden: true, // This module won't appear in navigation
        sidebar: [
          // ... sidebar config
        ],
      },
    ],
  },
})
```

## What Gets Hidden

When a module is marked as `hidden: true`, it will be filtered out from:

- **Sidebar module selector** - The dropdown list in the sidebar
- **Header navigation** - The navigation links in the home layout header
- **Module grid** - The grid of modules displayed on the home page
- **404 page modules** - The module list shown on the 404 page

## Hiding Sidebar Items

You can also hide individual sidebar items (submodules) within a module's sidebar by adding the `hidden: true` property to specific sidebar items:

```ts
// .vitepress/config.ts
export default defineNimiqVitepressConfig({
  themeConfig: {
    modules: [
      {
        text: 'API Documentation',
        subpath: 'api',
        defaultPageLink: '/api/',
        sidebar: [
          {
            label: 'Core API',
            items: [
              { text: 'Getting Started', link: '/api/getting-started', icon: 'i-tabler:rocket' },
              { text: 'Authentication', link: '/api/auth', icon: 'i-tabler:lock' },
              // This item will be hidden from the sidebar
              { text: 'Legacy Methods', link: '/api/legacy', icon: 'i-tabler:archive', hidden: true },
              {
                text: 'Advanced Features',
                icon: 'i-tabler:settings',
                items: [
                  { text: 'Webhooks', link: '/api/webhooks' },
                  // This nested item will be hidden
                  { text: 'Deprecated Endpoints', link: '/api/deprecated', hidden: true },
                  { text: 'Rate Limiting', link: '/api/rate-limiting' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
})
```

Hidden sidebar items are also filtered from:

- **Sidebar navigation** - The nested navigation items won't appear
- **Previous/Next navigation** - Hidden items are skipped in page navigation

## What Remains Accessible

Hidden modules remain fully accessible through:

- **Direct links** - Users can still navigate to hidden modules via direct URLs
- **Search functionality** - Hidden modules appear in search results
- **SEO crawling** - Search engines can still index hidden module pages
- **Internal navigation** - Navigation within the hidden module works normally

## Use Cases

### Legacy Support

Hide deprecated modules while keeping them accessible for existing users:

```ts
const legacyModule = {
  text: 'Legacy API v1',
  subpath: 'legacy-api-v1',
  defaultPageLink: '/legacy-api-v1/',
  description: 'Deprecated API - use v2 instead',
  hidden: true,
  sidebar: [
    // ... legacy documentation
  ],
}
```

### Work in Progress

Hide modules that are under development:

```ts
const experimentalModule = {
  text: 'Experimental Features',
  subpath: 'experimental',
  defaultPageLink: '/experimental/',
  description: 'Features under development',
  hidden: true,
  sidebar: [
    // ... experimental documentation
  ],
}
```

### Conditional Visibility

You can conditionally hide modules based on environment or other factors:

```ts
const internalModule = {
  text: 'Internal Tools',
  subpath: 'internal',
  defaultPageLink: '/internal/',
  description: 'Internal development tools',
  hidden: process.env.NODE_ENV === 'production',
  sidebar: [
    // ... internal documentation
  ],
}
```

## Best Practices

1. **Use sparingly** - Only hide modules when there's a specific need
2. **Provide alternatives** - If hiding a module, ensure users can find replacement functionality
3. **Document the change** - Consider adding a note about hidden modules in your changelog
4. **Test accessibility** - Ensure hidden modules remain accessible via search and direct links
5. **Consider redirects** - For deprecated modules, consider adding redirects to newer alternatives

## Technical Implementation

The hiding functionality works by:

1. Adding a `hidden?: boolean` property to the module configuration
2. Filtering modules in navigation components using the `useVisibleModules` composable
3. Keeping the original module list intact for search and direct access
4. Maintaining full functionality for hidden modules when accessed directly

This approach ensures that hiding modules only affects navigation visibility, not the actual accessibility or functionality of the modules themselves.
