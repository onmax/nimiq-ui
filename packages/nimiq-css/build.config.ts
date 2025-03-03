import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig([
  {
    entries: [{
      builder: 'mkdist',
      input: './src',
    },
    ],
    outDir: 'dist',
    declaration: true,
    clean: true,
    rollup: {
      emitCJS: false,
      commonjs: false
    },
    // hooks: {
    //   'build:done': async () => {
    // await copy('src/css', 'dist/css')
    // },
    // },
  // {
  //   entries: [
  //     './src/css',
  //   ],
  //   outDir: 'dist/css',
  //   clean: true,
  // },
  },
])
