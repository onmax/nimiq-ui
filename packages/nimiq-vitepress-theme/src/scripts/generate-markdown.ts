#!/usr/bin/env node
import process from 'node:process'
import { resolve } from 'pathe'
import { generateMarkdownFiles } from '../vite/markdown-generator'

const distDir = process.argv[2] || resolve(process.cwd(), '.vitepress/dist')

generateMarkdownFiles(distDir)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Failed to generate markdown files:', error)
    process.exit(1)
  })
