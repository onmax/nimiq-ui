# Nimiq Icons

An Iconify collection of Nimiq icons.

The Nimiq icons are a set of icons used in many Nimiq projects. The `nimiq-icons` library uses the Iconify JSON format in order to let you use these icons in your projects with ease.

## Nimiq Icons in VSCode

To improve the development experience using this library, I highly recommend using the [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) extension for Visual Studio Code.

Then you need to add the following configuration to your `settings.json`:

::: code-group

```md [Setting page]

1. Open the settings by pressing `Ctrl + ,` or `Cmd + ,`.
2. Search for `Iconify Custom Collection JSON Paths`.
3. Add the following URL to the list of paths: `https://raw.githubusercontent.com/onmax/nimiq-ui/refs/heads/main/packages/nimiq-icons/dist/icons.json`.
```

```json [setting.json]
{
  "iconify.customCollectionJsonPaths": [ // [!code lh]
    "https://raw.githubusercontent.com/onmax/nimiq-ui/refs/heads/main/packages/nimiq-icons/dist/icons.json" // [!code lh]
  ] // [!code lh]
}
```

:::


Then, whenever you use an icon in your code, the extension will replace the text with the icon preview. Super handy!

