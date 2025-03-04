# Utilities

A set of CSS utility classes for the most common use cases.

[Source code](https://github.com/onmax/nimiq-ui/tree/main/packages/nimiq-css/src/css/utilities.css){.nq-arrow .nq-pill-tertiary .nq-raw}

## Usage in Native CSS

Make sure to add the `utilities.css` file to your project.

Learn more about the `Native CSS` integration [here](/nimiq-css/integrations/native-css). But in short, you can include the utilities in your project by adding one of the following lines to your CSS file:

::: code-group

```css [utilities.css]
@import url('nimiq-css/css/utilities.css') @layer nq-utilities;
```

```css [index.css]
/* Imports all the important nimiq-css layers. */
@import url('nimiq-css/css/index.css');
```

:::

## Usage in UnoCSS

[Set up the Nimiq CSS preset](/nimiq-css/integrations/unocss) in your UnoCSS project and enable the `utilities` option.

::: code-group

```ts [unocss.config.ts]
import { presetNimiq } from 'nimiq-css' // [!code hl]
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetNimiq({ // [!code hl]
      utilities: true, // [!code hl]
    }), // [!code hl]
  ],
})
```

```ts [With Attributify | unocss.config.ts]
import { presetNimiq } from 'nimiq-css' // [!code hl]
import { defineConfig, presetAttributify } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetNimiq({ // [!code hl]
      utilities: true, // [!code hl]
      attributifyUtilities: true, // [!code hl]
    }), // [!code hl]
  ],
})
```

:::

<script setup lang="ts">
import { Teleport } from 'vue'
</script>

## Utilities

### `nq-label` {.sr-only}

<ComponentPreview lang="html">

<label class="nq-label">Label</label>

</ComponentPreview>

### `nq-arrow` {.sr-only}

<ComponentPreview lang="html">

<a class="nq-arrow" href="#">
  A link with an internal link
</a>

</ComponentPreview>

<ComponentPreview lang="html">

<a class="nq-arrow" href="https://nimiq.com">
  A link with an external link
</a>

</ComponentPreview>

### `nq-subline` {.sr-only}

<ComponentPreview lang="html">

<p class="nq-subline">A subheading or subtitle text</p>

</ComponentPreview>

### `nq-arrow-back` {.sr-only}

<ComponentPreview lang="html">

<a class="nq-arrow-back" href="#">
  Back to previous page
</a>

</ComponentPreview>

### `nq-pill` variants {.sr-only}

<ComponentPreview lang="html">

<button class="nq-pill-blue">Blue Pill</button>
<button class="nq-pill-white">White Pill</button>
<button class="nq-pill-gold">Gold Pill</button>
<button class="nq-pill-green">Green Pill</button>
<button class="nq-pill-orange">Orange Pill</button>
<button class="nq-pill-red">Red Pill</button>
<button class="nq-pill-secondary">Secondary Pill</button>
<button class="nq-pill-tertiary">Tertiary Pill</button>

<!-- Size variants -->

<button class="nq-pill-lg">Large Pill</button>
<button class="nq-pill-xl">Extra Large Pill</button>

</ComponentPreview>

### `nq-ghost-btn` {.sr-only}

<ComponentPreview lang="html">

<button class="nq-ghost-btn">Ghost Button</button>

</ComponentPreview>

### `nq-close-btn` {.sr-only}

<ComponentPreview lang="html">

<button class="nq-close-btn" aria-label="Close"></button>

</ComponentPreview>

### `nq-switch` {.sr-only}

<ComponentPreview lang="html">

<input type="checkbox" class="nq-switch" />
<input type="checkbox" class="nq-switch" checked />
<input type="checkbox" class="nq-switch" disabled />

</ComponentPreview>

### `nq-curtain-y` {.sr-only}

<ComponentPreview lang="html">

<div class="nq-curtain-y" style="height: 200px; top: 0">
  <p>Content that scrolls with a fade effect at top and bottom</p>
  <!-- Add more content to make it scrollable -->
</div>

</ComponentPreview>

### `nq-card-lg` {.sr-only}

<ComponentPreview lang="html">

<div class="nq-card-lg">
  <header>
    <h2>Card Title</h2>
  </header>
  <section>
    <p>Card content</p>
  </section>
  <footer>
    <button class="nq-pill-blue">Action</button>
  </footer>
</div>

</ComponentPreview>

### `nq-input-box` {.sr-only}

<ComponentPreview lang="html">

<input class="nq-input-box" placeholder="Regular input" />
<input class="nq-input-box nq-invalid" placeholder="Invalid input" />
<textarea class="nq-input-box" placeholder="Textarea input"></textarea>

</ComponentPreview>

### `nq-focusable` {.sr-only}

<ComponentPreview lang="html">

<button class="nq-focusable">Focusable element</button>

</ComponentPreview>

### `nq-card` {.sr-only}

<ComponentPreview lang="html">

<div class="nq-card">
  <h3>Simple Card</h3>
  <p>Card content</p>
</div>

</ComponentPreview>

### `nq-hoverable` {.sr-only}

<ComponentPreview lang="html">

<div class="nq-hoverable">
  <h3>Hoverable Card</h3>
  <p>Hover to see effect</p>
</div>

</ComponentPreview>

### `nq-hoverable-cta` {.sr-only}

<ComponentPreview lang="html">

<div class="nq-hoverable">
  <div class="nq-hoverable-cta">
    <h3>Hoverable Card with CTA</h3>
    <p>Hover to see the CTA</p>
  </div>
</div>

</ComponentPreview>

### Scrollbar Utilities {.sr-only}

<ComponentPreview lang="html">

<!-- Hide scrollbar -->
<div class="nq-scrollbar-hide" style="overflow: auto">
  Content with hidden scrollbar
</div>

<!-- Custom scrollbar -->
<div class="nq-scrollbar" style="overflow: auto">
  Content with custom scrollbar
</div>

<!-- Small custom scrollbar -->
<div class="nq-scrollbar-sm" style="overflow: auto">
  Content with small custom scrollbar
</div>

</ComponentPreview>

## Combining utilities

The power of utility-based CSS is in combining classes to create complex components. Here are some examples:

### Pill with arrow {.sr-only}

<ComponentPreview lang="html">

<a class="nq-pill-blue nq-arrow" href="#">Blue Pill with arrow</a>

</ComponentPreview>

### Card with close button {.sr-only}

<ComponentPreview lang="html">

<div class="nq-card">
  <h3>Card with close button</h3>
  <button class="nq-close-btn absolute top-32 right-32" aria-label="Close"></button>
  <p>This card features a button that can be customized for different actions.</p>
</div>

</ComponentPreview>
