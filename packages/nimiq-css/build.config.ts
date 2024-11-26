import { defineBuildConfig } from 'unbuild'
import {copy} from 'fs-extra'

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
    hooks: {
    'build:done': async () => {
      await copy('src/css', 'dist/css')
    },
  },
  // {
  //   entries: [
  //     './src/css',
  //   ],
  //   outDir: 'dist/css',
  //   clean: true,
  // },
}
])
