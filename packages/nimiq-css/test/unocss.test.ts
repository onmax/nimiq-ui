/// <reference types="vite/client" />

import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createGenerator } from 'unocss'
import { describe, expect, it } from 'vitest'
import { presetNimiq } from '../src'

const __dirname = dirname(fileURLToPath(import.meta.url))

it('presetUnoVue basic', async () => {
  const uno = await createGenerator({
    presets: [presetNimiq()],
  })
  const presets = uno.config.presets
  expect(presets).toHaveLength(2)
})

describe('unocss preset', () => {
  async function checkCase(_baseFolder: string) {
    const uno = await createGenerator({ presets: [presetNimiq()] })
    const baseFolder = resolve(__dirname, _baseFolder)
    const input = readFileSync(resolve(baseFolder, 'input.html'), 'utf-8')
    const { css, matched } = await uno.generate(input, { preflights: false })
    await expect([...matched].join('\n')).toMatchFileSnapshot(resolve(baseFolder, 'matched.txt'))
    await expect(css).toMatchFileSnapshot(resolve(baseFolder, 'output.css'))
  }
  it('basic colors', async () => checkCase('./cases/icons'))
})
