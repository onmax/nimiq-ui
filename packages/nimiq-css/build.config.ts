import fs from 'node:fs'
import path from 'node:path'
import { defineBuildConfig } from 'unbuild'

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
      'mkdist:done': async (ctx) => {
        if (ctx.options.stub)
          return

        // Copy ./src/css folder to ./dist/css without minification
        const srcDir = path.resolve('./src/css')
        const destDir = path.resolve('./dist/css')

        // Create destination directory if it doesn't exist
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true })
        }

        // Copy all files from src/css to dist/css
        copyDirectorySync(srcDir, destDir)
        console.log('CSS files copied from src/css to dist/css')
      },
    },
  },
])

/**
 * Recursively copy a directory
 */
function copyDirectorySync(src: string, dest: string) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  // Read all files and directories in the source
  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      // Recursively copy subdirectories
      copyDirectorySync(srcPath, destPath)
    }
    else {
      // Copy files
      fs.copyFileSync(srcPath, destPath)
    }
  }
}
