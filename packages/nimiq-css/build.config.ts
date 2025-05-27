import { defineBuildConfig } from 'unbuild'
import { buildCSS } from './scripts/build-css'

export default defineBuildConfig([
  {
    entries: [
      {
        builder: 'mkdist',
        input: './src',
        pattern: ['**/*.ts'],
        format: 'esm',
        loaders: ['js'],
      },
    ],
    declaration: true,
    clean: true,
    hooks: {
      'mkdist:done': async () => {
        buildCSS()
      },
    },
  },
])
