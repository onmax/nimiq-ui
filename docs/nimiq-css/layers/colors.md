# Colors layer

Add CSS variables for colors for light and dark mode.

The Colors layer is a set of CSS variables that are applied to the `:root` element using the `nq-colors` CSS layer. This layer is responsible for defining the colors that are used in the Nimiq UI components.

[Source code](https://github.com/onmax/nimiq-ui/tree/main/packages/nimiq-css/src/css/colors.css){.nq-arrow .nq-pill-tertiary .nq-raw}

## Usage

```css
@import url('nimiq-css/css/colors.css') @layer nq-colors;

.your-element {
  background: rgb(var(--nq-blue) / 0.8); /* Use the background color with 80% opacity */
}
```

This layer is included in `nimiq-css/css/index.css`.
