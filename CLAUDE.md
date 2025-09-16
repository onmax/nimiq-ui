# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nimiq UI is a monorepo design system and component library for the Nimiq blockchain ecosystem. Built with pnpm workspaces, it provides CSS frameworks, Vue components, icons, and documentation tools.

## Key Commands

### Development
- `pnpm dev` - Start development servers for all packages
- `pnpm docs` - Run documentation site locally
- `pnpm build` - Build all packages
- `pnpm test` - Run tests with Vitest
- `pnpm lint` / `pnpm lint:fix` - ESLint with auto-fix
- `pnpm typecheck` - TypeScript type checking

### Package Management
- Uses **pnpm** with catalogs for dependency management
- `pnpm -F <package>` to run commands in specific packages
- Workspace references use `workspace:*` format

## Architecture

### Monorepo Structure
```
packages/
├── nimiq-css/              # Main CSS framework with design tokens
├── nimiq-icons/            # Icon system with Figma integration
├── nimiq-vitepress-theme/  # Custom VitePress theme
├── nimiq-theme/            # Theme utilities
└── nimiq-maplibre-styles/  # Map styling
docs/                       # VitePress documentation site
```

### Key Technologies
- **Build**: Unbuild for libraries, Vite for development
- **CSS**: UnoCSS with custom presets and design tokens
- **Frontend**: Vue 3 with TypeScript
- **Docs**: VitePress with custom Nimiq theme
- **Testing**: Vitest with JSDOM

### CSS Architecture
- **UnoCSS-based** with custom presets in nimiq-css package
- **CSS Layers**: preflights, colors, fonts, utilities, typography, static-content
- **Design Tokens**: Centralized color system supporting light/dark modes
- Components use `Nq*` naming convention (NqCard, NqGrid, etc.)

### Icon System
- Icons managed via Figma API integration
- Built with nimiq-icons-builder package
- Naming: `i-nimiq:*` or `i-local:*` format
- Auto-generated from Figma designs

### Documentation
- VitePress with custom Nimiq theme
- Multi-module structure with dedicated sections per package
- Interactive component demos using NqPlayground component
- Automated changelog and Git integration

## Development Patterns

### Package Configuration
- Each package has dedicated build.config.ts for Unbuild
- TypeScript with ESNext target and strict checking
- Modular exports with specific entry points
- Version coordination across packages (currently v1.0.0-beta.81)

### Component Development
- Vue 3 components with TypeScript
- UnoCSS classes for styling
- Dark/light mode support via design tokens
- Responsive design with mobile-first approach

### Testing
- Vitest for unit tests
- JSDOM environment for browser simulation
- Coverage reporting available

## Release Process

- `pnpm release` for version bumps and publishing
- Automated NPM publishing on git tags
- Coordinated releases across all packages
- Figma integration updates icons automatically

## Task Master AI Instructions
**Import Task Master's development workflow commands and guidelines, treat as if import is in the main CLAUDE.md file.**
@./.taskmaster/CLAUDE.md
