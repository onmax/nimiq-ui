import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig([
  {
    entries: [
      './src/unocss/index.ts',
    ],
    outDir: 'dist',
    declaration: true,
    clean: true,
    rollup: {
      emitCJS: true,
    },
  },
  {
    entries: [
      './src/css',
    ],
    outDir: 'dist/css',
    clean: true,
  },
])
