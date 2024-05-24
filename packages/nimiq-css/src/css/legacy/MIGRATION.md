# Nimiq Styles Framework

The [Nimiq Styles Framework](https://github.com/nimiq/nimiq-style/tree/master) is the current main CSS framework used at Nimiq. This library has been the main inspipration for the new `nimiq-css` library.

Now, the new `nimiq-css` library is being developed to replace the old Nimiq Styles Framework. With simplicity, flexibility and scalability in mind, the new library is being developed to be more modular and easier to use. Nonetheless, we are providing a guide on how to migrate from the old Nimiq Styles Framework to the new `nimiq-css` library.

> [!Note]
> The migration path has been designed to be as simple as possible. You can decide how much of the old code you want to keep and how much you want to replace with the new library. You can do the migration progressively, one component at a time, or all at once.

## Installation

To install the new `nimiq-css` library, you can use npm:

```bash
npm install nimiq-css
```

> Don't forget to uninstall the old package `@nimiq/styles` (Only if you are NOT using the icons from the `@nimiq/styles`)

Now, you replace the import:

```css
/* Old */
/* @import url('node_modules/@nimiq/styles/nimiq-style.min.css'); */
/* New */
@import url('node_modules/nimiq-css/css/index.css'); /* Import in vite or other bundlers might be different */
```

That's it! You are ready to start using the new `nimiq-css` library.

### Icons

If you are using the icons from the `@nimiq/styles` package, you should keep use them. We offer another alternative `nimiq-icons`, but it still in development.

## Migrating

### 1. Import the library

So far, we have only replaced the main CSS file. Now, if you want to start using the new styles, you should also add the following imports:

```css
@import url('node_modules/nimiq-css/css/index.css');
```

> [!Warning]
> This import uses [`preflight.css`](../preflight.css), which resets some of the styles. If you are having issues, make sure you are importing first the `index.css` and then the `legacy/main.css`.

> [!Alert]
> The old Nimiq Styles Framework used to have a `8px` base for fonts and spacing. The new library uses a default browser font-size. This means that you might need to adjust the spacing and font sizes in your components. If this is a problem, we can look for a solution together.

You can see the content of this file in the [index.css](../index.css) file. Keep in mind, we are using now [CSS layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer).

### 2. Automatic styles

In the previous version, you had to add the `nq-style` class to a container or use specific classes to apply the styles. Now, some of the styles are applied automatically using HTML elements as selectors.

If you don't want styles to be applied to a particular element, you can use the `raw` class to prevent this.

The following components are automatically styled

- Headings `h1`, `h2` and `h3`. You can remove `.nq-h1`, `.nq-h2` and `.nq-h3`.


### 3. Replace the classes

| Old Class | New Class |
| --- | --- |
| `.nq-label` | `.label` |
| `` | `` |
