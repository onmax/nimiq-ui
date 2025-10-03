# Getting Started with Frankenstein

Frankenstein is a collection of production-ready Vue 3 components built for various Nimiq projects. Unlike traditional component libraries, Frankenstein uses a **copy-paste approach** - you copy the components you need directly into your project, giving you full control to customize them.

## Philosophy

> Why "Frankenstein"? Just like the famous creature, you assemble your application from different parts, putting together exactly what you need!

Frankenstein components are:

- **Production-tested**: Used in real Nimiq applications
- **Customizable**: Copy the source code and adapt it to your needs
- **Dependency-light**: Built on proven libraries (Reka UI, VueUse)
- **Styled with Nimiq CSS**: Follows Nimiq design patterns

This approach gives you the flexibility of custom components with the reliability of battle-tested code.

## How It Works

1. Browse the [component documentation](#available-components)
2. Copy the component code from the preview
3. Paste it into your project
4. Customize styles and behavior as needed
5. Keep full ownership of the code

## Prerequisites

### Required Dependencies

Each component may have different requirements, but you'll typically need:

#### Vue 3.15+

Frankenstein requires Vue 3.15 or higher for the latest Composition API features.

::: code-group

```bash [pnpm]
pnpm add vue@^3.15
```

```bash [npm]
npm install vue@^3.15
```

```bash [yarn]
yarn add vue@^3.15
```

:::

#### Reka UI

A headless component library providing accessibility and functionality for complex components like modals, comboboxes, and more.

::: code-group

```bash [pnpm]
pnpm add reka-ui
```

```bash [npm]
npm install reka-ui
```

```bash [yarn]
yarn add reka-ui
```

:::

[Learn more about Reka UI →](https://reka-ui.com)

#### VueUse

Essential Vue composition utilities used across many components.

::: code-group

```bash [pnpm]
pnpm add @vueuse/core
```

```bash [npm]
npm install @vueuse/core
```

```bash [yarn]
yarn add @vueuse/core
```

:::

[Learn more about VueUse →](https://vueuse.org)

#### Nimiq CSS

The styling foundation for all Frankenstein components.

::: code-group

```bash [pnpm]
pnpm add nimiq-css
```

```bash [npm]
npm install nimiq-css
```

```bash [yarn]
yarn add nimiq-css
```

:::

Then configure it in your project:

```ts
// uno.config.ts (recommended)
import { presetNimiq } from 'nimiq-css'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetNimiq({
      utilities: true,
      fonts: true,
    }),
  ],
})
```

[Complete Nimiq CSS setup guide →](../nimiq-css/getting-started)

## Quick Start

### Step 1: Install Dependencies

Make sure you have all the required dependencies for the components you want to use:

```bash
pnpm add vue@^3.15 reka-ui @vueuse/core nimiq-css
```

### Step 2: Set Up Nimiq CSS

Follow the [Nimiq CSS installation guide](../nimiq-css/installation) to configure styling.

### Step 3: Copy a Component

Browse the available components below and copy the one you need:

```vue
<!-- Example: BasicModal.vue -->
<script setup lang="ts">
import { DialogContent, DialogPortal, DialogRoot, DialogTrigger } from 'reka-ui'

// Component code here...
</script>

<template>
  <div>
    <!-- Component template here... -->
  </div>
</template>
```

### Step 4: Customize

Since you own the code, customize it freely:

- Change styling classes
- Add/remove features
- Adjust animations
- Modify behavior

## Available Components

### Dialog Components

Modal dialogs built on Reka UI with Nimiq styling.

#### [Basic Modal](./components/basic-modal/)

A simple dialog that can be triggered by a button or programmatically via a ref.

**Use cases**: Confirmations, alerts, simple forms

#### [Nested Modal](./components/nested-modal/)

Advanced modal system that supports opening dialogs on top of other dialogs.

**Use cases**: Multi-step flows, drill-down interfaces

### Animations

#### [Animated Staking Ripple](./components/animated-staking-ripple/)

An animated ripple effect for staking visualizations.

**Use cases**: Staking interfaces, loading states, blockchain activity

## Component Dependencies

Each component page lists its specific dependencies. Not all components require all libraries:

| Component               | Vue 3.15+ | Reka UI | VueUse | Nimiq CSS |
| ----------------------- | --------- | ------- | ------ | --------- |
| Basic Modal             | ✅        | ✅      | ✅     | ✅        |
| Nested Modal            | ✅        | ✅      | ✅     | ✅        |
| Animated Staking Ripple | ✅        | ❌      | ❌     | ✅        |

## Best Practices

### Component Organization

Create a dedicated components directory:

```
src/
├── components/
│   ├── modals/
│   │   ├── BasicModal.vue
│   │   └── NestedModal.vue
│   └── animations/
│       └── AnimatedStakingRipple.vue
```

### Keeping Components Updated

Since you copy the code, updates aren't automatic. To stay current:

1. Check the documentation for component changes
2. Review the change log periodically
3. Compare your version with the latest source
4. Apply updates manually as needed

### Customization Tips

When modifying components:

- Keep core functionality intact
- Document your changes
- Test accessibility features
- Maintain TypeScript types
- Follow Vue 3 best practices

## Troubleshooting

### Component doesn't render

**Solution**:

- Verify all dependencies are installed
- Check that Nimiq CSS is properly configured
- Ensure you're using Vue 3.15+

### Styles are missing

**Solution**:

- Confirm Nimiq CSS is imported in your entry file
- Check that UnoCSS is configured correctly
- Verify CSS layer order

### TypeScript errors

**Solution**:

- Install `@types/` packages for dependencies
- Check that component prop types match your usage
- Update TypeScript to latest version

### Animation not working

**Solution**:

- Check browser compatibility
- Verify CSS is loaded
- Ensure animation classes are applied

## Credits

These components stand on the shoulders of giants and wouldn't be possible without:

- **[Reka UI](https://reka-ui.com)** - Headless UI primitives providing accessibility and functionality
- **[VueUse](https://vueuse.org)** - Essential Vue composition utilities
- **[Nimiq CSS](../nimiq-css/)** - Design system and styling foundation
- **[UnoCSS](https://unocss.dev)** - Instant on-demand atomic CSS engine

The layout has been heavily inspired by:

- **[Fumadocs](https://fumadocs.vercel.app/)** - Modern documentation theme
- **[Nimiq Hub Documentation](https://nimiq.com/developers/)** - Design patterns and structure

Icons provided by:

- **[Tabler Icons](https://tabler-icons.io/)** - Beautiful open source icons
- **[Nimiq Icons](../nimiq-icons/)** - Custom Nimiq icon set

Special thanks to the maintainers and contributors of these excellent libraries.

## Getting Help

- **Documentation**: Browse component examples and API references
- **Source Code**: Each component preview shows the full source
- **GitHub**: [Report issues or contribute](https://github.com/onmax/nimiq-ui)
- **Nimiq Community**: Join the discussion on Discord

## Next Steps

- [Browse Modal Components →](./components/basic-modal/)
- [Explore Animations →](./components/animated-staking-ripple/)
- [Learn about Nimiq CSS →](../nimiq-css/getting-started)
- [Read the Philosophy →](../nimiq-css/philosophy)
