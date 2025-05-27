# Colors Layer

The Nimiq Design System uses a dedicated package, [`nimiq-colors`](../../nimiq-colors/index.md) (TODO: Fix link if necessary), to manage and define all color variables. These variables are then made available in `nimiq-css`.

The Colors layer in `nimiq-css` ensures that these CSS variables for colors are available for light and dark modes, using the `nq-colors` CSS layer.

[View `nimiq-colors` source definitions](https://github.com/onmax/nimiq-ui/tree/main/packages/nimiq-colors/src/colors.ts){.nq-arrow .nq-pill-tertiary .nq-raw}
[View generated CSS from `nimiq-colors`](https://github.com/onmax/nimiq-ui/tree/main/packages/nimiq-colors/dist/nimiq-colors.css){.nq-arrow .nq-pill-tertiary .nq-raw}

## Usage

The necessary color CSS from `nimiq-colors` is automatically imported by `nimiq-css` via its main CSS file (`nimiq-css/dist/css/index.css`). You generally do not need to import it separately if you are using `nimiq-css`.

You can use the color variables in your custom CSS:

```css
.your-element {
  background: oklch(var(--nq-blue-500) / 0.8); /* Use a blue shade with 80% opacity */
  color: oklch(var(--nq-neutral-900));
}
```

All color variables are defined using the oklch color space and support light and dark themes automatically.

**Important Note:** Due to current limitations in the development environment, the automated build and testing process could not fully verify that `nimiq-css` correctly imports the styles from `nimiq-colors` in its latest build. Please ensure the line `@import "nimiq-colors/dist/nimiq-colors.css" layer(nq-colors);` is correctly present in `packages/nimiq-css/src/css/index.css` if you encounter issues.

Refer to the [`nimiq-colors` documentation](../../nimiq-colors/index.md) (TODO: Fix link if necessary) for a detailed list of available colors and how they are structured.
