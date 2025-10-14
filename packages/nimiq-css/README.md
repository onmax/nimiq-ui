# nimiq-css

Nimiq's Design System in CSS - a comprehensive CSS framework with design tokens and UnoCSS presets.

## Features

- **Design Tokens** - Centralized color system supporting light/dark modes
- **UnoCSS Presets** - Custom presets for rapid development
- **CSS Layers** - Organized preflights, colors, fonts, utilities, typography, and static content
- **Nimiq Components** - `Nq*` styled components (NqCard, NqGrid, etc.)
- **Icon System** - Integrated with nimiq-icons
- **Typography** - Consistent text styles and spacing

## Installation

```bash
pnpm add nimiq-css
```

## Usage

### Import CSS

```ts
// Import all styles
import 'nimiq-css/css/index.css'

// Or import specific modules
import 'nimiq-css/css/preflight.css'
import 'nimiq-css/css/colors.css'
import 'nimiq-css/css/fonts.css'
import 'nimiq-css/css/typography.css'
import 'nimiq-css/css/utilities.css'
```

### UnoCSS Integration

```ts
import { presetNimiq } from 'nimiq-css/unocss'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetNimiq(),
  ],
})
```

## Available CSS Modules

- `animations.css` - Animation utilities
- `atomic.css` - Atomic utility classes
- `colors.css` - Color system with light/dark mode
- `fonts.css` - Typography and font definitions
- `preflight.css` - Base resets
- `spacing.css` - Spacing utilities
- `static-content.css` - Static content styles
- `typography.css` - Text styles
- `utilities.css` - Utility classes

## Legacy Styles

```ts
import 'nimiq-css/css/legacy/icons.css'
import 'nimiq-css/css/legacy/inputs.css'
```

## Development

```bash
# Build the package
pnpm build

# Development mode with stub
pnpm dev
```

## License

MIT
