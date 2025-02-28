# Preflights layer

Reset the default browser styles that are applied to the HTML element.

The Preflights layer is a set of CSS rules that are applied to the HTML element using the `preflight` CSS layer. This layer is responsible for resetting the default browser styles that are applied to the HTML element. It is hightly recommended to use this layer in all your projects together with the `tailwind` reset layer.

[Source code](https://github.com/onmax/nimiq-ui/tree/main/packages/nimiq-css/src/css/preflights.css){.nq-arrow .nq-pill-tertiary .nq-raw}

## Usage

```css
import url('nimiq-css/css/preflight.css') @layer nq-preflight;
```

This layer is included in `nimiq-css/css/index.css`.
