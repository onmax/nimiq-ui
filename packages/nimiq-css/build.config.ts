import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig([
  {
    entries: [{
      builder: 'mkdist',
      input: './src',
    }],
    outDir: 'dist',
    declaration: true,
    clean: true,
    rollup: {
      emitCJS: true,
    },
  },
  {
    entries: [{
      builder: 'mkdist',
      input: './src/css',
    }],
    outDir: 'dist/css',
    clean: true,
  },
])
