import type { PluginSimple } from 'markdown-it'
import type { MarkdownEnv, MarkdownRenderer } from 'vitepress'

export default function inlineActionsPlugin(md: MarkdownRenderer): PluginSimple {
  md.core.ruler.after('block', 'inline-actions', (state) => {
    const env = state.env as MarkdownEnv
    const frontmatter = env.frontmatter || {}

    // Check conditions for injecting inline actions
    const layout = frontmatter.layout || 'docs'
    const isOverview = layout === 'overview'
    const isDocsWithoutOutline = layout === 'docs' && frontmatter.outline === false
    const inlineActionsEnabled = frontmatter.inlineActions !== false

    // Only proceed if conditions are met: overview layout OR docs with outline disabled
    if ((!isOverview && !isDocsWithoutOutline) || !inlineActionsEnabled) {
      return
    }

    // Find the first h1 token
    let h1Index = -1
    for (let i = 0; i < state.tokens.length; i++) {
      if (state.tokens[i].type === 'heading_open' && state.tokens[i].tag === 'h1') {
        h1Index = i
        break
      }
    }

    if (h1Index === -1) {
      return
    }

    // Find the closing h1 tag
    let h1CloseIndex = -1
    for (let i = h1Index; i < state.tokens.length; i++) {
      if (state.tokens[i].type === 'heading_close' && state.tokens[i].tag === 'h1') {
        h1CloseIndex = i
        break
      }
    }

    if (h1CloseIndex === -1) {
      return
    }

    // Check if there's a paragraph immediately after h1
    let insertIndex = h1CloseIndex + 1
    if (insertIndex < state.tokens.length
      && state.tokens[insertIndex].type === 'paragraph_open') {
      // Find the closing paragraph tag
      for (let i = insertIndex; i < state.tokens.length; i++) {
        if (state.tokens[i].type === 'paragraph_close') {
          insertIndex = i + 1
          break
        }
      }
    }

    // Create the inline actions component token
    const token = new state.Token('html_block', '', 0)
    token.content = '<InlineOutlineActions />\n'
    token.block = true

    // Insert the token
    state.tokens.splice(insertIndex, 0, token)
  })
}
