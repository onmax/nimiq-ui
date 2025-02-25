# Nimiq VitePress Theme

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Vitepress Theme for Nimiq documentation pages

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/pkg-placeholder?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/pkg-placeholder
[npm-downloads-src]: https://img.shields.io/npm/dm/pkg-placeholder?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/pkg-placeholder
[bundle-src]: https://img.shields.io/bundlephobia/minzip/pkg-placeholder?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=pkg-placeholder
[license-src]: https://img.shields.io/github/license/onmax/nimiq-ui.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/onmax/nimiq-ui/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/pkg-placeholder

## Git Data Performance

The git data feature fetches information about files from git history, which can be slow for large repositories.
To improve performance, the script implements:

1. **Caching**: File information is cached in `.vitepress/cache/git-data-cache.json`
2. **Change detection**: Only files that have been modified since the last run are processed

### Debugging

To enable debug logs for the git data script, run VitePress with:

```bash
DEBUG=true npm run dev
```

### Configuration

You can adjust the concurrency level by modifying the `CONCURRENCY` constant in `git.data.ts`.
