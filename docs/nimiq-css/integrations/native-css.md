# Nimiq CSS in Native CSS

## Fonts

You can use the css file directly in your project but make sure that the paths to the font files are correct. The default path is optimized for Vite.

> [!TIP]
> If you are using `vite`, you should place the fonts inside `/public/assets/fonts/`

```css
@import url('nimiq-css/css/fonts.css') @layer nq-fonts;
```

### Manual

You will need to download and place the font files in your project, then you can copy the contents of the `fonts.css` file, modify the paths to the font files and include it in your project.

<<< @/../packages/nimiq-css/src/css/fonts.css
