import { dirname, resolve } from 'node:path'
import type { MarkdownEnv, MarkdownRenderer } from 'vitepress'

const randomStr = () => Math.random().toString(36).substring(7)

export default function (md: MarkdownRenderer) {
  md.core.ruler.after('block', 'markdown-preview', (state) => {
    // Find all html_block tokens containing MarkdownComponentPreview
    for (let i = 0; i < state.tokens.length; i++) {
      const token = state.tokens[i]

      if (token.type === 'html_block' && token.content.includes('<MarkdownComponentPreview')) {
        // Extract props from the binding value.
        const propPattern = /(\w+)="([^"]*)"/g
        const props: { [key: string]: string } = {}
        const matches = token.content.matchAll(propPattern)
        for (const match of matches) {
          const [, key, value] = match
          props[key] = value
        }

        // Find the end of the MarkdownComponentPreview block
        let endIndex = i
        for (let j = i; j < state.tokens.length; j++) {
          if (state.tokens[j].type === 'html_block' && state.tokens[j].content.includes('</MarkdownComponentPreview>')) {
            endIndex = j
            break
          }
        }

        // We need to regenerate the markdown for code representation
        const tokensToRender = state.tokens.slice(i + 1, endIndex)
        let markdownSource = '';

        // Process tokens to reconstruct markdown
        for (const token of tokensToRender) {
          console.log({ token })
          if (token.type === 'fence') {
            // Recreate code fence with original info and content
            markdownSource += '```' + (token.info || '') + '\n';
            markdownSource += token.content;
            markdownSource += '```\n\n';

          } else if (token.type === 'heading_open') {
            token.attrPush(['id', randomStr()])
          } else if (token.type === 'paragraph_open') {
            markdownSource += '\n';
          } else if (token.type === 'paragraph_close') {
            markdownSource += '\n';
          } else if (token.type === 'inline' && token.content) {
            markdownSource += token.content + '\n';
          } else if (token.type === 'container_directives_open') {
            markdownSource += ':::' + (token.info || '') + '\n';
          } else if (token.type === 'container_directives_close') {
            markdownSource += ':::\n';
          } else if (token.content) {
            markdownSource += token.content + '\n';
          }
        }

        // Push tokens

        const dummyToken = new state.Token('', '', 0)
        const tokens: Array<typeof dummyToken> = []

        const codeTemplateStart = new state.Token('html_inline', '', 0)
        codeTemplateStart.content = `<template #code>`
        tokens.push(codeTemplateStart)

        // Create a fence token that will contain actual markdown
        const codeToken = new state.Token('fence', 'code', 0)
        codeToken.info = 'md'
        codeToken.content = markdownSource.trim();
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
