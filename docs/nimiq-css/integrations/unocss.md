# Nimiq CSS in UnoCSS

A preset with everything ready to use Nimiq CSS in your UnoCSS project.

## Colors

The Nimiq UnoCSS preset sources its color palette from the `nimiq-colors` package, ensuring all predefined Nimiq colors and their shades are available as utility classes. For example, you can use classes like `bg-blue-500` for backgrounds or `text-neutral-900` for text, corresponding to the shades defined in `nimiq-colors`. Refer to the [`nimiq-colors` documentation](../../nimiq-colors/index.md) for a full list of available colors and shades.

## Icons

You can add the Nimiq icons to your project by importing the Nimiq icons CSS file.

```css
@import 'nimiq-css/css/icons.css' @layer nq-icons;
```

## Fonts

By default, UnoCSS will leverage [Web Fonts Preset](https://unocss.dev/presets/web-fonts) to download the fonts and create a folder in your project with the fonts.

### Changing the fonts path

You can customize how the fonts are serve locally by passing the options for `createLocalFontProcessor`.

::: code-group

```ts [unocss.config.ts]
import { presetNimiq } from 'nimiq-css'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetNimiq({
      fonts: { // [!code hl]
        fontAssetsDir: './my-custom/assets/fonts', // default is `./public/fonts` // [!code hl]
        fontServeBaseUrl: '/my-custom/assets/fonts', // default is `assets/fonts` // [!code hl]
      } // [!code hl]
    })
  ]
})
```

:::

### Disable fonts

::: code-group

```ts [unocss.config.ts]
import { presetNimiq } from 'nimiq-css'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetNimiq({
      fonts: false // [!code hl]
    })
  ]
})
```

:::
