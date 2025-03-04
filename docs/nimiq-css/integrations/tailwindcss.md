# Nimiq CSS in TailwindCSS

Add Nimiq CSS to your TailwindCSS project.

> [!IMPORTANT]
> Unfortunately, Nimiq CSS is not available as a TailwindCSS plugin. However, you can still use Nimiq CSS in your project by doing one of the following:

## Importing the CSS

In your entry CSS file, import the Nimiq CSS file:

::: code-group

```css [v4 | index.css]
@import url('nimiq-css/css/index.css') @layer nq-all;

/* Or if you prefer import specific layers only */
/* @import url('nimiq-css/css/typography.css') @layer nq-typography; */

@import 'tailwindcss';
```

```css [v3 | index.css]
@import url('nimiq-css/css/index.css') @layer nq-all;

/* Or if you prefer import specific layers only */
/* @import url('nimiq-css/css/typography.css') @layer nq-typography; */

@tailwind base;
@tailwind components;
@tailwind utilities;
```

:::

> [!CAUTION]
> With this approach, you will be missing a bunch of stuff like the colors or good DX for the utilities.

You can add the missing colors to your theme manually. Check out [colors.css](https://github.com/onmax/nimiq-ui/tree/main/packages/nimiq-css/src/css/colors.css) for the color palette.

## Migrating to UnoCSS

You can think of Tailwind as MacOS and UnoCSS as Linux. They are both great, but they have different philosophies:

| Feature Category  | Feature              |     Tailwind     |     UnoCSS      |
| ----------------- | -------------------- | :--------------: | :-------------: |
| **Development**   | Developer Experience |     👍 Good      |  🚀 Excellent   |
|                   | Build Performance    | ⚡️ Amazing (v4) |   ⚡️ Amazing   |
| **Customization** | Theme Customization  |    🔧 Complex    |    🎯 Simple    |
|                   | Custom Rules         |    🔧 Complex    |   ✨ Flexible   |
|                   | Preset Extension     |    🟡 Limited    |  💫 Extensive   |
| **Features**      | Syntax Options       |  📝 Class-based  |  🎨 Multiple\*  |
|                   | Web Fonts            | 🔧 Manual Setup  | 🤖 Auto-loading |
|                   | Icons Support        | 🔧 Manual Setup  | 🤖 Auto-loading |
|                   | Dark Mode            |   ✅ Built-in    |   ✅ Built-in   |
|                   | Built-in playground  |      ❌ No       |     ✅ Yes      |
| **Ecosystem**     | Community Size       |    🌟 Massive    |   📈 Growing    |
|                   | Documentation        |   📚 Extensive   |     📖 Good     |
|                   | Third-party Tools    |   🛠️ Abundant    |   🔨 Growing    |

\* _Including class-based, attributify, pure CSS, and CSS-in-JS_

---

The migration is straightforward: [Install UnoCSS](https://unocss.dev/integrations/) and add the Tailwind preset to your configuration file: [wind4](https://unocss.dev/presets/wind4#wind4-preset) or [wind3](https://unocss.dev/presets/wind3#wind3-preset).

Then, you can start using [Nimiq CSS in UnoCSS](./unocss.md).

## Create a TailwindCSS Plugin

You can create a PR to add Nimiq CSS as a TailwindCSS plugin. Check out the [TailwindCSS documentation](https://tailwindcss.com/docs/plugins) and the [UnoCSS preset implementation](https://github.com/onmax/nimiq-ui/tree/main/packages/nimiq-css/src/unocss/index.ts) for inspiration.
