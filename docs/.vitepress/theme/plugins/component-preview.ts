import type { MarkdownEnv, MarkdownRenderer } from 'vitepress'
import { dirname, resolve } from 'node:path'
import { renderMarkdownItTokens } from 'render-markdown-it-tokens'

export default function (md: MarkdownRenderer) {
  md.core.ruler.after('block', 'markdown-preview', (state) => {
    // Find all html_block tokens containing ComponentPreview
    for (let i = 0; i < state.tokens.length; i++) {
      const token = state.tokens[i]

      if (token.type === 'html_block' && token.content.includes('<ComponentPreview')) {
        // Extract props from the binding value.
        const propPattern = /(\w+)="([^"]*)"/g
        const props: { [key: string]: string } = {}
        const matches = token.content.matchAll(propPattern)
        for (const match of matches) {
          const [, key, value] = match
          props[key] = value
        }

        const lang = props.lang || 'md'

        // Find the end of the ComponentPreview block
        let endIndex = i
        for (let j = i; j < state.tokens.length; j++) {
          if (state.tokens[j].type === 'html_block' && state.tokens[j].content.includes('</ComponentPreview>')) {
            endIndex = j
            break
          }
        }

        // Push tokens

        const dummyToken = new state.Token('', '', 0) // eslint-disable-line unused-imports/no-unused-vars
        const tokens: Array<typeof dummyToken> = []

        const codeTemplateStart = new state.Token('html_inline', '', 0)
        codeTemplateStart.content = `<template #code>`
        tokens.push(codeTemplateStart)

        // Create a fence token that will contain actual markdown
        const codeToken = new state.Token('fence', 'code', 0)
        codeToken.info = lang
        codeToken.content = renderMarkdownItTokens(state.tokens.slice(i + 1, endIndex))
        tokens.push(codeToken)

        const codeTemplateEnd = new state.Token('html_inline', '', 0)
        codeTemplateEnd.content = `</template>`
        tokens.push(codeTemplateEnd)

        if (props.filePath) {
          // Get environment info to resolve the code file.
          const { realPath, path: _path } = state.env as MarkdownEnv
          const resolvedCodeFile = resolve(dirname(realPath ?? _path), props.filePath)

          const codeToken = new state.Token('fence', 'code', 0)
          codeToken.info = 'vue'
          codeToken.content = `<<< ${resolvedCodeFile}`
          // Set the src property so the snippet plugin can replace it with file content.
          // @ts-expect-error token.src is used by the snippet plugin.
          codeToken.src = [resolvedCodeFile]
          tokens.push(codeToken)
        }

        state.tokens.splice(i + 1, 0, ...tokens)
      }
    }
  })
}
