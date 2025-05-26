# Nimiq Colors (`nimiq-colors`)

The `nimiq-colors` package is the central source of truth for color definitions within the Nimiq Design System. It provides a consistent and themeable color palette for use across Nimiq projects and UI components.

## Purpose

- **Centralized Management**: Defines all official Nimiq brand and UI colors in one place.
- **Themeable**: Supports light and dark color schemes out-of-the-box.
- **Modern CSS**: Uses the [oklch color space](https://oklch.com/) for more perceptually uniform colors.
- **Multiple Formats**: Exports colors as both a ready-to-use CSS file and as TypeScript modules.

## Package Exports

The `nimiq-colors` package exports:

1.  **CSS File**:
    -   Path: `nimiq-colors/dist/nimiq-colors.css`
    -   Contains CSS custom properties for all defined colors (e.g., `--nq-blue-500`, `--nq-neutral`) and gradients (e.g., `--nq-blue-gradient`).
    -   Automatically handles light and dark themes using `@media (prefers-color-scheme: dark)` and a `.dark` class selector.

2.  **TypeScript Modules**:
    -   Path: `nimiq-colors/src/colors.ts` (and `nimiq-colors/src/gradients.ts`, re-exported from `nimiq-colors/src/index.ts`)
    -   Provides the raw color definitions as TypeScript objects. Colors are typically defined with `light` and `dark` properties containing their oklch string values.
    -   Example: `import { blue, neutralGradient } from 'nimiq-colors/src';`

## Usage

### CSS

If you are using the main `nimiq-css` package, the Nimiq colors CSS is automatically included.

If you want to use `nimiq-colors` directly in a project without the full `nimiq-css`:

```css
@import "nimiq-colors/dist/nimiq-colors.css";

.my-element {
  background-color: oklch(var(--nq-blue-500));
  color: oklch(var(--nq-neutral-900));
}
```
(Note: Using `oklch(var(...))` is optional; `var(...)` works directly if the value is already a full color string, but oklch() ensures the context).

### TypeScript

You can import the TypeScript definitions for use in build scripts, theming engines, or JavaScript logic:

```typescript
import { blue, allColors, allGradients } from 'nimiq-colors/src'; // Or from 'nimiq-colors' if top-level export is configured for src

// Accessing a specific color shade for light mode:
console.log(blue[500].light); // e.g., 'oklch(0.88 0.08 230)'

// Accessing a default color for dark mode:
console.log(allColors.neutral.DEFAULT.dark);

// Accessing gradient stops:
console.log(allGradients.blueGradient.light.from);
```

## Integration

The `nimiq-colors` package is a foundational part of the Nimiq design system.
-   `nimiq-css` uses `nimiq-colors` for its global color styles and for its UnoCSS color preset.
-   Other Nimiq tools or applications can consume `nimiq-colors` directly for consistent color usage.
