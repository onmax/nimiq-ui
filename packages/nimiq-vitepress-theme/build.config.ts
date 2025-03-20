// Thanks to https://github.com/wobsoriano/vue-sfc-unbuild
// and all the discussions in https://github.com/unjs/unbuild/issues/80
// for the following configuration.

import { exec } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { dirname, join } from 'pathe'
import { defineBuildConfig } from 'unbuild'

const execAsync = promisify(exec)

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input: './src',
      pattern: ['**/*.vue'],
      loaders: ['vue'],
    },
    {
      builder: 'mkdist',
      input: './src',
      pattern: ['**/*.ts'],
      format: 'esm',
      loaders: ['js'],
    },
    {
      builder: 'mkdist',
      input: './src',
      pattern: ['**/*.css'],
      format: 'esm',
    },
  ],
  declaration: true,
  clean: true,
  externals: [
    'vue',
  ],
  hooks: {
    'mkdist:done': async (ctx) => {
      if (ctx.options.stub)
        return
      // Since not all the users would choose to use unocss,
      // we bundle the styles from unocss here for users to opt-in.
      //
      // However, since the unocss doesn't provide a unplugin, or rollup
      // plugin for us to use, we have to use the CLI here.
      //
      // The use of CLI was suggested by how to use unocss with rollup? · unocss/unocss · Discussion #542
      // https:// github.com/unocss/unocss/discussions/542
      console.info('Generating unocss styles...')
      const packageDir = fileURLToPath(dirname(import.meta.url))
      const srcDir = join(packageDir, 'src')
      const distFile = join(packageDir, 'dist/assets/uno.css')
      const config = join(packageDir, 'uno.config.ts')
      await execAsync(`unocss "${srcDir}/**/*.vue" -o "${distFile}" --config "${config}"`, { cwd: packageDir })
    },
  },
})
