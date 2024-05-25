# Migrate from Nimiq Styles Framework to `nimiq-css`

In this page, we show how we suggest the new classes to be used [Nimiq Style Framework](https://nimiq.github.io/nimiq-style/demo.html) with the new `nimiq-css` library.

`nimiq-css` also supports UnoCSS now and will suport Tailwind v4 in the future. 

The [Nimiq Styles Framework](https://github.com/nimiq/nimiq-style/tree/master) is the current main CSS framework used at Nimiq. This library has been the main inspipration for the new `nimiq-css` library. This library has has been built with that in mind. It is designed to be as compatible as possible with a clear path for migration. However, there are some breaking changes due to the lack of usage of classes/features implemented by the old Library. These breaking changes are highly opinioned, so if you don't agree with some of the changes or you have better ideas, please let me know and we let's change it.

The [Nimiq Styles Framework](https://github.com/nimiq/nimiq-style/tree/master) is currently the main CSS framework used in Nimiq. This library has been the main inspiration for the new `nimiq-cs` library and has been a part of it from the beginning. It is designed to be as compatible as possible, with a clear migration path. However, there are some breaking changes due to the lack of usage of classes/features implemented by the old library. These breaking changes are highly opinionated, so if you don't like some of the changes or have better ideas, please let me know and we'll change them.

One of the biggest changes in this new library is the use of [CSS layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer). This allows us to have a more modular and scalable library. Another big change is the use of a new brand palette and support for dark mode with `.dark` class.
 You can learn more about the new library in a [post I wrote](https://onmax.github.io/onmax/posts/the-evolution-of-nimiq-UI/).

Now, the new `nimiq-css` library is being developed to replace the old Nimiq Styles Framework. With simplicity, flexibility and scalability in mind, the new library is being developed to be more modular and easier to use. In this guide, you can see my recommendation to make the migration to `nimiq-css`. The guide is offered in steps, so you migrate to the new library progressively, one set of classes at a time, or all at once.

## Installation

```bash
npm install nimiq-css
```

Now, you replace the import:

```css
/* Old */
/* @import url('node_modules/@nimiq/styles/nimiq-style.min.css'); */
/* New */
@import url('node_modules/nimiq-css/css/legacy.css'); /* Import in vite or other bundlers might be different */
```

Now, you can uninstall the old package `@nimiq/styles`.

That's it! You are ready to start using the new `nimiq-css` library.

### Icons

If you also rely on the icons from the `@nimiq/styles` package, you should continue to use them. However, another alternative is being developed, `nimiq-icons`, but it is still in development.

## 1. Import the library

So far, we have only imported the `legacy.css` file which contain all of the old code. Now, if you want to start using the new styles, you should also add the following imports:

```css
@import url('node_modules/nimiq-css/css/index.css');
```

This import uses [`preflight.css`](https://github.com/onmax/nimiq-ui/tree/main/packages/nimiq-css/src/css/preflight.css), which resets some of the styles. If you are having issues, make sure you are importing first the `index.css` and then the `legacy/main.css`.

The old Nimiq Styles Framework used to have a `8px` base for fonts and spacing. The new library uses a default browser font-size. This means that you might need to adjust the spacing and font sizes in your components. You can modify the `--nimiq-size` variable like `html { --nimiq-size: 8px; }` but there might be some issues with this approach.

You can see the content of this file in the [index.css](https://github.com/onmax/nimiq-ui/tree/main/packages/nimiq-css/src/css/index.css) file. Keep in mind, we are using now [CSS layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer).

You can learn about the new colors palette and the names in the [Developer Center](https://nimiq.com/developers).

## 2. Automatic styles

In the previous version, you had to add the `nq-style` class to a container or use specific classes to apply the styles. Now, some of the styles are applied automatically using HTML elements as selectors.

If you don't want styles to be applied to a particular element, you can use the `raw` class to prevent this.

Basically, `nimiq-css` is opt-out, so you can remove the classes you don't want to use. The old Nimiq Styles Framework was opt-in, so you had to add the classes to apply the styles.

You can always "opt-out" of the styles by adding the `raw` class to the element.

The following components are automatically styled in the [preflight.css](https://github.com/onmax/nimiq-ui/tree/main/packages/nimiq-css/src/css/preflight.css) file:

- Body with some default styles.
- Headings `h1`, `h2` and `h3`. You can remove `.nq-h1`, `.nq-h2` and `.nq-h3`.
- Paragraphs `p`. You can remove `.nq-text`.
- `<small>` elements. You can remove `.nq-text-s`.
- `<code>` and `<pre>` elements.
- `<input type="text">` and `<textarea>` elements. You can remove `.nq-input`.

## 3. Replace the classes

| Old Class | New Class |
| --- | --- |
| `.nq-label` | `.label` |
| `.nq-shadow` | `.shadow` |
| `.nq-shadow-l` | `.shadow-lg` |

There are more "atomic" classes. You can see it in [atomic.css](https://github.com/onmax/nimiq-ui/tree/main/packages/nimiq-css/src/css/atomic.css).

#### 3.1 Explicit classes

One of the goals of `nimiq-css` is to allow classes to be used in a more explicit way. So it is always preferable to use the classes in a more explicit way.  

| Old Class | New Class |
| --- | --- |
| `.nq-notice` | `.notice` |
| `.nq-notice.success` | `.notice.text-green` |
| `.nq-notice.warning` | `.notice.text-orange` |
| `.nq-notice.error` | `.notice.text-red` |
| `.nq-notice.info` | `.notice.text-blue` |
| `.nq-blue` | `.text-neutral` (darkblue in light mode and white in dark mode) |
| `.nq-light-blue` | `.text-blue` |
| `.nq-gold` | `.text-gold` |
| `.nq-green` | `.text-green` |
| `.nq-orange` | `.text-orange` |
| `.nq-red` | `.text-red` |
| `.nq-purple` | `.text-purple` |
| `.nq-pink` | Deleted since it is only used in the wallet |
| `.nq-light-green` | Deleted since it is only used in the wallet |
| `.nq-brown` | Deleted since it is only used in the wallet |
| `.nq-blue-bg` | `.bg-gradient-neutral` (darkblue in light mode and white in dark mode) | 
| `.nq-grey` | `.bg-neutral-200` (You can see all the neutral options: 50,100,200, ... ,800, 900,1100) |  
| `.nq-light-blue-bg` | `.bg-blue` |
| `.nq-gold-bg` | `.bg-gold` |
| `.nq-green-bg` | `.bg-green` |
| `.nq-orange-bg` | `.bg-orange` |
| `.nq-red-bg` | `.bg-red` |
| `.nq-purple-bg` | `.bg-purple` |
| `.nq-pink-bg` | Deleted since it is only used in the wallet |
| `.nq-light-green-bg` | Deleted since it is only used in the wallet |
| `.nq-brown-bg` | Deleted since it is only used in the wallet |

With `nimiq-css`, a new palette of colors has been implemented. You can also use the CSS variables as follows: `rgb(var(--nq-neutral-900) / 0.8)`. You need to wrap it in `rgb()` to use it as a color.

#### 3.2 Buttons & Pills

| Old Class | New Class |
| --- | --- |
| `.nq-button` | `pill-xl` + `pill-{COLOR}` |
| `.nq-button-s` | `.pill-secondary` |
| `.nq-button-s.light-blue` | Deleted |
| `.nq-button-s.green` | Deleted |
| `.nq-button-s.orange` | Deleted |
| `.nq-button-s.red` | Deleted |
| N/A | `.pill-tertiary` |
| `.nq-button-pill` | Deleted |
| `.nq-button-pill.light-blue` | `pill-blue` |
| `.nq-button-pill.green` | `pill-green` |
| `.nq-button-pill.orange` | `pill-orange` |
| `.nq-button-pill.red` | `pill-red` |
| `.nq-button-pill.gold` | `pill-gold` |
| `.nq-button-pill.disabled` | Use the `disabled` state in `<button>` |
| `.nq-button-{s\|pill}.inverse` | Add `.dark` in any parent element or self element |

* There are 3 pill sizes. The default pill just use `pill-{COLOR|VARIANT}` like pill-green or pill-secondary. If you need other sizes you can use pill-lg or pill-xl.

#### 3.3 Card

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

| Old Class | New Class |
| --- | --- |
| `.nq-input-s` | Deleted |
| `.nq-input` | `<input type="text">` or `<textarea>` |
| `.vanishing` | Deleted |

#### 4. Removed classes

Everything deleted in the new library is because it is not being used anymore, or not used it much. My main research has been done in the Nimiq Wallet + Hub + Keyguard, which it is our main product. If you think this is a mistake, we can add them back. But remember, you always have them in the `legacy.css` file.

There are two types of classes that have been removed. The ones replaced by default styles and the ones that are not being used anymore.

- `.nq-text`, `.nq-style p`: Now, all the `<p>` will have this styles.
- `.nq-link`, `.nq-text a`, `.nq-style a`: I don't think this is pretty useful as link are always super different.
- `.nq-text-s` has been deleted. Instead use the `<small>` HTML element.

### 5. Atomic CSS in `nimiq-css`

The old `Nimiq Styles Framework` used to have some atomic classes like `flex-grow` or `hidden`. Those classes still available in the new library. See more in the [atomic.css](https://github.com/onmax/nimiq-ui/tree/main/packages/nimiq-css/src/css/atomic.css) file.

### 6. Prose

`nimiq-css` comes with a new class `prose` that it is useful to style the prose content. It is based on the Tailwind CSS Prose plugin. Just add `.prose` to you mardown wrapper and you are ready to go. You can also use this for smaller parts of your app.
