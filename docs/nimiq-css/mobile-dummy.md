# Nimiq Web Client Vite Integration

Integrate Nimiq Web Client with Vite for fast blockchain development with minimal configuration.

## 1. Unordered Lists

- Item A
- Item B
  - Sub-item B1
    - Sub-sub-item B1a
    - Sub-sub-item B1b
  - Sub-item B2
- Item C

### Alternate bullet styles

- Item 1
  - Sub-item 1.1
    - Sub-item 1.1.1

* Item 2
  - Sub-item 2.1
    - Sub-item 2.1.1

## Quick Start with Templates

Get started instantly with our pre-configured starter templates:

::: code-group

```bash [Vue]
npx degit onmax/nimiq-starter/starters/vue-ts my-nimiq-app
cd my-nimiq-app && pnpm install && pnpm dev
```

```bash [React]
npx degit onmax/nimiq-starter/starters/react-ts my-nimiq-app
cd my-nimiq-app && pnpm install && pnpm dev
```

:::

## Installation

### Quick Start

Install the Nimiq Web Client and required Vite plugins:

::: code-group

```bash [pnpm]
pnpm add @nimiq/core
pnpm add -D vite-plugin-top-level-await vite-plugin-wasm
```

```bash [npm]
npm install @nimiq/core
npm install -D vite-plugin-top-level-await vite-plugin-wasm
```

```bash [yarn]
yarn add @nimiq/core
yarn add -D vite-plugin-top-level-await vite-plugin-wasm
```

```bash [bun]
bun add @nimiq/core
bun add -D vite-plugin-top-level-await vite-plugin-wasm
```

:::

## Configuration

### Basic Vite Setup

Update your `vite.config.js` or `vite.config.ts`:

```javascript
import { defineConfig } from 'vite'
import wasm from 'vite-plugin-wasm' // [!code ++]

export default defineConfig({
  plugins: [wasm()], // [!code ++]
  worker: { // [!code ++]
    format: 'esnext', // [!code ++]
    plugins: () => [wasm()], // [!code ++]
  }, // [!code ++]

  optimizeDeps: { // [!code ++]
    exclude: ['@nimiq/core'], // [!code ++]
  }, // [!code ++]

  // Additional build configuration for Nimiq // [!code ++]
  build: { // [!code ++]
    target: 'esnext', // [!code ++]
    rollupOptions: { // [!code ++]
      output: { // [!code ++]
        format: 'esnext', // [!code ++]
      }, // [!code ++]
    }, // [!code ++]
  }, // [!code ++]
})
```

## Usage Example

<!--@include: ../_demo.web.md-->
