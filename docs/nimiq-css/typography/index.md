# Nimiq Typography

A single utility to convert your text into a Nimiq-themed article.

## `.nq-prose`

With a single class, you can transform your text into a beautifully styled article.

<ComponentPreview lang="html">

<article class="nq-prose">
  <h1>The Adventurous Journey of Pixel the Crypto Explorer</h1>
  <p>Pixel, a curious little byte, lived in the bustling heart of a digital city and always dreamed of exploring the vast world of Cryptoland. Intrigued by the mysteries...</p>
  <a href="./demo-article.md" class="nq-arrow">Keep reading</a>
</article>

</ComponentPreview>

> [!WARNING]
> This utility does not include the font source.

## `.nq-prose-compact`

`.nq-prose` is designed for long articles, but sometimes, we need to embed a rich text in a box or a card. Use `.nq-prose-compact` for a more compact version.

```html
<ul class="flex gap-4 p-4">
  <li>
    <article class="nq-prose-compact">
      <h2>The first step</h2>
      <p>A packed prose component</p>
    </article>
  </li>
  <li>
    <article class="nq-prose-compact">
      <h2>The second step</h2>
      <p>...</p>
    </article>
  </li>
</ul>
```

## Undoing typography styles

If you have a block of markup embedded in some content that shouldn't inherit the prose styles, use the `nq-not-prose` or `nq-raw` class to sandbox it:

```html
<article class="prose">
  <h1>My Heading</h1>
  <p>...</p>

  <div class="not-prose">
    <!-- Some example or demo that needs to be prose-free -->
  </div>

  <p>...</p>
  <!-- ... -->
</article>
```

## Credits

- Based on the [Tailwind CSS Typography](https://tailwindcss.com/docs/typography-plugin) plugin.
- Designed by [Overnice](https://www.overnice.com/).
