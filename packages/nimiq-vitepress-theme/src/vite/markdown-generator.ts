import { readFile, writeFile } from 'node:fs/promises'
import process from 'node:process'
import consola from 'consola'
import fg from 'fast-glob'
import { htmlToMarkdown } from 'mdream'
import { basename, relative, resolve } from 'pathe'

export async function generateMarkdownFiles(distDir?: string) {
  const vitepressOutDir = distDir || resolve(process.cwd(), '.vitepress/dist')

  consola.start('Generating markdown files from HTML...')

  try {
    const htmlFiles = await fg('**/*.html', {
      cwd: vitepressOutDir,
      absolute: true,
      ignore: ['**/node_modules/**'],
    })

    consola.info(`Found ${htmlFiles.length} HTML files in ${vitepressOutDir}`)

    if (htmlFiles.length === 0) {
      consola.warn('No HTML files found. Skipping markdown generation.')
      return
    }

    let converted = 0
    let failed = 0

    for (const htmlFile of htmlFiles) {
      try {
        const html = await readFile(htmlFile, 'utf-8')
        const markdown = await htmlToMarkdown(html)
        const mdFile = htmlFile.replace(/\.html$/, '.md')

        await writeFile(mdFile, markdown, 'utf-8')

        const relativePath = relative(vitepressOutDir, htmlFile)
        consola.debug(`Generated: ${relativePath} -> ${basename(mdFile)}`)

        converted++
      }
      catch (error) {
        failed++
        const relativePath = relative(vitepressOutDir, htmlFile)
        consola.error(`Failed to convert ${relativePath}:`, error)
      }
    }

    consola.success(`Generated ${converted} markdown files (${failed} failed)`)
  }
  catch (error) {
    consola.error('Error generating markdown files:', error)
    throw error
  }
}
