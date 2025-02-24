# The Nimiq CSS philosophy

I created Nimiq CSS because I was writing the same CSS code over and over again. I wanted a tool that would reduce the amount of code I write and make the design more consistent.

## Why Nimiq CSS?

When I started at Nimiq, we did not have a design system (even today). However, we did have a set of patterns and parts that we used a lot. Nimiq CSS gives you resets, utilities, colour rules, typography rules and other styles that we use in our work.

Before adding a new feature, I ask myself: do we use this element in more than one project? If so, it belongs in Nimiq CSS.

Remember that this library does not include full components or any JavaScript interactions. It is a small CSS library. Each design is different and should be treated separately.

## Why not Nimiq Styles?

[Nimiq Styles](https://nimiq.github.io/nimiq-style/) is the official library built by the Nimiq Frontend Team in 2018. These are the reason why I don't use Nimiq Styles:

1. They force you to use `1rem=8px` whereas the default is `1rem=16px`. This is a big change that affects all your designs.
2. They are not modular (even though is small). You have to include the whole library to use a single component. You don't have CSS layers
3. Missing colors, typography, and other utilities. The library was built for the Nimiq Safe and barely has not been updated since then. My work has been focused in new apps where the design is different.
4. With this library I can add my own features and customizations without the fear of breaking the official library. Here are some features that Nimiq Styles does not provide:
  1. Light and dark mode support
  2. Typography rules
  3. Nice `preflight` rules
  4. CSS layer for our Static content pages
  5. A lot of new utilities like `nq-pill` or `nq-arrow` 

If you still depend on Nimiq Styles, you can also use `nimiq-css/css/legacy` without the `8px` rule so you can use both libraries together. Read the [migration guide](./migration).

## A note about TailwindCSS

I write all my CSS rules in Native CSS first. An automated tool then converts these rules to UnoCSS. If you want a TailwindCSS version, please send me a pull request. I am happy to help, and the process is very similar to the UnoCSS approach.

In short, I recommend using Nimiq CSS with UnoCSS. It works like TailwindCSS, with similar syntax and a few extra features. I tried to make a [Nimiq TailwindCSS plugin](https://github.com/onmax/tailwindcss-nimiq) before, but abandoned that idea in favour of this library.
