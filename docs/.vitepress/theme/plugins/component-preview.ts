import type { MarkdownEnv, MarkdownRenderer } from 'vitepress'
import { dirname, resolve } from 'node:path'

export const rawPathRegexp
  = /^(.+?(?:\.([a-z0-9]+))?)(#[\w-]+)?(?: ?\{(\d+(?:[,-]\d+)*)? ?(\S+)?\})? ?(?:\[(.+)\])?$/

export default function (md: MarkdownRenderer) {
  md.core.ruler.after('inline', 'component-preview', (state) => {
    const insertComponentImport = (importString: string) => {
      const index = state.tokens.findIndex(i =>
        i.type === 'html_block' && i.content.match(/<script setup>/g),
      )
      if (index === -1) {
        const importToken = new state.Token('html_block', '', 0)
        importToken.content = `<script setup>\n${importString}\n</script>\n`
        state.tokens.unshift(importToken)
      }
      else {
        const content = state.tokens[index].content
        state.tokens[index].content = content.replace('</script>', `${importString}\n</script>`)
      }
    }

    // Match a tag like: <ComponentPreview name="SomeName" />
    const regex = /<ComponentPreview\s+([^>]+)\/>/g

    state.src = state.src.replace(regex, (_, bindingValue) => {
      // Extract props from the binding value.
      const propPattern = /(\w+)="([^"]*)"/g
      const props: { [key: string]: string } = {}
      const matches = bindingValue.matchAll(propPattern)
      for (const match of matches) {
        const [, key, value] = match
        props[key] = value
      }
      if (!('name' in props))
        throw new Error('You need to set up `name` when using ComponentPreview')

      // Build component name and path.
      const demoComponentName = `${props.name}Demo`
      const demoPath = `./${demoComponentName}.vue`
      insertComponentImport(`import ${demoComponentName} from '${demoPath}'`)

      // Get environment info to resolve the code file.
      const { realPath, path: _path } = state.env as MarkdownEnv
      const codeFileRelative = `./${props.name}Component.vue`
      const resolvedCodeFile = resolve(dirname(realPath ?? _path), codeFileRelative)

      // Find the token index where the ComponentPreview is defined.
      const index = state.tokens.findIndex(i => i.content.match(regex))
      // Replace the content of the current token with the opening tag.
      state.tokens[index].content = `<ComponentPreview>`

      // Create tokens for inner content.
      const dummyToken = new state.Token('', '', 0)
      const tokens: Array<typeof dummyToken> = []

      // Demo slot tokens.
      const demoTemplateStart = new state.Token('html_inline', '', 0)
      demoTemplateStart.content = `<template #demo>`
      tokens.push(demoTemplateStart)

      const demoToken = new state.Token('html_inline', '', 0)
      demoToken.content = `<${demoComponentName} />`
      tokens.push(demoToken)

      const demoTemplateEnd = new state.Token('html_inline', '', 0)
      demoTemplateEnd.content = `</template>`
      tokens.push(demoTemplateEnd)

      // Code slot tokens using a fence token.
      const codeTemplateStart = new state.Token('html_inline', '', 0)
      codeTemplateStart.content = `<template #code>`
      tokens.push(codeTemplateStart)

      const codeToken = new state.Token('fence', 'code', 0)
      codeToken.info = 'vue'
      codeToken.content = `<<< ./${props.name}Component.vue`
      // Set the src property so the snippet plugin can replace it with file content.
      // @ts-expect-error token.src is used by the snippet plugin.
      codeToken.src = [resolvedCodeFile]
      tokens.push(codeToken)

      const codeTemplateEnd = new state.Token('html_inline', '', 0)
      codeTemplateEnd.content = `</template>`
      tokens.push(codeTemplateEnd)

      // Closing tag token.
      const endTag = new state.Token('html_inline', '', 0)
      endTag.content = `</ComponentPreview>`
      tokens.push(endTag)

      // Insert new tokens after the current token.
      state.tokens.splice(index + 1, 0, ...tokens)

      // Remove the original pattern.
      return ''
    })
  })
}
