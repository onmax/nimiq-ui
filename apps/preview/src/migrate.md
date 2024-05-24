# Migrate from Nimiq Styles Framework to `nimiq-css`

In this page, we show how we suggest the new classes to be used [Nimiq Style Framework](https://nimiq.github.io/nimiq-style/demo.html) with the new `nimiq-css` library.

Please, remember that `nimiq-css` has been built with the Nimiq Styles Framework in mind. This means that the new library has been designed to be as compatible as possible with the old one. However, some changes have been made to improve the library and make it more flexible and scalable. If you don't agree with some of the changes or you have better ideas, please let me know and we let's change it.

The [Nimiq Styles Framework](https://github.com/nimiq/nimiq-style/tree/master) is the current main CSS framework used at Nimiq. This library has been the main inspipration for the new `nimiq-css` library.

Now, the new `nimiq-css` library is being developed to replace the old Nimiq Styles Framework. With simplicity, flexibility and scalability in mind, the new library is being developed to be more modular and easier to use. Nonetheless, we are providing a guide on how to migrate from the old Nimiq Styles Framework to the new `nimiq-css` library.

The migration path has been designed to be as simple as possible. You can decide how much of the old code you want to keep and how much you want to replace with the new library. You can do the migration progressively, one component at a time, or all at once.

<!-- TODO Add comments about tailwind and unocss -->
<!-- TODO Use of layers, more specificity you can always rewrite the default styles -->
<!-- TODO Comment how to do dark mode -->

## Installation

To install the new `nimiq-css` library, you can use npm:

```bash
npm install nimiq-css
```

Don't forget to uninstall the old package `@nimiq/styles` (Only if you are NOT using the icons from the `@nimiq/styles`)

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

This import uses [`preflight.css`](../preflight.css), which resets some of the styles. If you are having issues, make sure you are importing first the `index.css` and then the `legacy/main.css`.

The old Nimiq Styles Framework used to have a `8px` base for fonts and spacing. The new library uses a default browser font-size. This means that you might need to adjust the spacing and font sizes in your components. If this is a problem, we can look for a solution together.

You can see the content of this file in the [index.css](../index.css) file. Keep in mind, we are using now [CSS layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer).

### 2. Automatic styles

In the previous version, you had to add the `nq-style` class to a container or use specific classes to apply the styles. Now, some of the styles are applied automatically using HTML elements as selectors.

If you don't want styles to be applied to a particular element, you can use the `raw` class to prevent this.

The following components are automatically styled

- Headings `h1`, `h2` and `h3`. You can remove `.nq-h1`, `.nq-h2` and `.nq-h3`.

<!-- TODO Colors -->

### 3. Replace the classes

| Old Class | New Class |
| --- | --- |
| `.nq-label` | `.label` |
| `.nq-shadow` | `.shadow` |
| `.nq-shadow-l` | `.shadow-lg` |


#### 3.1 Explicit classes

One of the goals of `nimiq-css` is to allow classes to be used in a more explicit way. So it is always preferable to use the classes in a more explicit way.  

| Old Class | New Class |
| --- | --- |
| `.nq-notice` | `.notice` |
| `.nq-notice.success` | `.notice.text-green` |
| `.nq-notice.warning` | `.notice.text-orange` |
| `.nq-notice.error` | `.notice.text-red` |
| `.nq-notice.info` | `.notice.text-blue` |

#### 3.2 Card

| Old Class | New Class | Comments |
| --- | --- | --- | 
| `.nq-card` | `.card` | |
| `.nq-card-header` | `.card <header>` | A container with `.card` and a children with `<header>` | 
| `.nq-card-header .nq-h1` | `.card <header> h1` | A container with `.card` and a children with `<header>` and a children with `h1` |
| `.nq-card-header .nq-notice` | `.card <header> .nq-notice` | A container with `.card` and a children with `<header>` and a children with `.nq-notice` |
| `.nq-card-body` | `section` | A container with `.card` and a children with `<section>` |
| `.nq-card-footer` | `.card <footer>` | A container with `.card` and a children with `<footer>` |

```html

Before:

```html
<div class="nq-card">
    <div class="nq-card-header">
        <h1 class="nq-h1">Card Header</h1>
    </div>
    <div class="nq-card-body">
        <p>Card Body</p>
    </div>
    <div class="nq-card-footer">
        <a>Card Footer</a>
    </div>
</div>
```

After

```html
<div class="card">
   <header>
       <h1>Card Header</h1>
    </header>
    <section>
        <p>Card Body</p>
    </section>
    <footer>
        <a>Card Footer</a>
    </footer>
</div>
```

#### Text inputs

#### 4. Removed classes

Some of the classes, I have considered useful as they are not use any longer. If you think this is a mistake, we can add them back. But remember, you always have them in the `legacy.css` file.

There are two types of classes that have been removed. The ones replaced by default styles and the ones that are not being used anymore.

##### 4.1 Replaced by default styles

Remember, that you can always override them with your own style or use the `raw` class.

- `.nq-text`, `.nq-style p`: Now, all the `<p>` will have this styles.
- `.nq-link`, `.nq-text a`, `.nq-style a`: Now all the `<a>` that are children of `<p>`, `<li>` or `<a>` containing only text will apply the same styles

##### 4.2 Not being used anymore 

- `.nq-input-s`
- `.vanishing`

### 5. Atomic CSS in `nimiq-css`

The old `Nimiq Styles Framework` used to have some atomic classes like `flex-grow` or `hidden`. Those classes still available in the new library. See more in the [atomic.css](https://github.com/onmax/nimiq-ui/tree/main/packages/nimiq-css/src/css/atomic.css) file.
