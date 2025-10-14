# Nimiq UI

Design system and component library for the Nimiq blockchain ecosystem. Built as a monorepo with pnpm workspaces, providing CSS frameworks, Vue components, icons, and documentation tools.

## Packages

- **[nimiq-css](./packages/nimiq-css)** - Main CSS framework with design tokens and UnoCSS presets
- **[nimiq-icons](./packages/nimiq-icons)** - Icon system with Figma integration
- **[nimiq-vitepress-theme](./packages/nimiq-vitepress-theme)** - Custom VitePress theme
- **[nimiq-theme](./packages/nimiq-theme)** - Theme utilities
- **[nimiq-maplibre-styles](./packages/nimiq-maplibre-styles)** - Map styling

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Run documentation site
pnpm docs
```

## Development

```bash
# Build all packages
pnpm build

# Run tests
pnpm test

# Lint and fix
pnpm lint:fix

# Type checking
pnpm typecheck
```

## Key Features

- **UnoCSS-based** - Custom presets with design tokens
- **CSS Layers** - Organized preflights, colors, fonts, utilities, typography, and static content
- **Dark/Light Mode** - Built-in theme support
- **Vue 3** - TypeScript components with `Nq*` naming convention
- **Icon System** - Auto-generated from Figma designs via API
- **Documentation** - VitePress with interactive component demos

## Architecture

Built with modern tooling:

- **Build**: Unbuild for libraries, Vite for development
- **Frontend**: Vue 3 with TypeScript
- **CSS**: UnoCSS with custom presets
- **Docs**: VitePress with custom Nimiq theme
- **Testing**: Vitest with JSDOM

## Release

```bash
pnpm release
```

## Documentation

Full documentation available at the docs site. Run `pnpm docs` to view locally.

## License

See individual packages for license information.
