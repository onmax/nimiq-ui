# 404 Error Page Demo

This is a demonstration of the improved 404 error page for the Nimiq VitePress theme.

## Features

The custom 404 error page includes:

### 🎯 User-Friendly Design

- **Random Emoji**: A fun, random emoji is displayed to make the error less intimidating
- **Friendly Message**: Clear, helpful text that explains what happened
- **Beautiful Gradient**: Eye-catching 404 number with a blue gradient

### 🧭 Navigation Options

- **Go Back Button**: Takes users back to the previous page
- **Go Home Button**: Returns users to the homepage
- **Quick Links**: Direct access to common pages (Home, Docs, Examples, API)

### 🔍 Search Integration

- **Search Box**: Clickable search interface that triggers the command menu
- **Keyboard Shortcut**: Visual indicator for the ⌘K shortcut
- **Seamless Integration**: Works with the existing VitePress search system

### 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Responsive grid layouts
- **Desktop Enhancement**: Full-width layouts with proper spacing

### 🎨 Theme Integration

- **Consistent Branding**: Matches the Nimiq design system
- **Dark Mode Support**: Automatic dark/light mode switching
- **Module Integration**: Displays available modules when configured

## Testing the 404 Page

To see the 404 error page in action:

1. **Broken Link**: [Click here to see a 404 error](/this-page-does-not-exist)
2. **Manual Navigation**: Type any non-existent URL in your browser
3. **Search Test**: Use the search box on the error page

## Technical Features

### Composables Used

- `useRandomEmoji`: Provides random emoji selection
- `useData`: Accesses VitePress theme configuration
- `withBase`: Handles base URL for navigation

### Components Integrated

- `Logo`: Consistent branding
- `CommandMenu`: Search functionality
- `MobileNav`: Mobile navigation support

### UnoCSS Classes

The error page uses the theme's UnoCSS configuration for:

- Responsive layouts (`grid`, `flex`)
- Color schemes (`neutral`, `blue`)
- Typography (`text-xl`, `font-bold`)
- Spacing (`px-8`, `py-4`, `mb-12`)

## Customization

The error page can be customized through the theme configuration:

```ts
// .vitepress/config.ts
export default defineNimiqVitepressConfig({
  themeConfig: {
    modules: [
      {
        text: 'Custom Module',
        defaultPageLink: '/custom',
        description: 'Your custom module',
        icon: 'i-nimiq:custom-icon'
      }
    ]
  }
})
```

This will automatically populate the "Explore Modules" section on the 404 page.
