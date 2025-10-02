import type { MarkdownEnv, MarkdownRenderer } from 'vitepress'

export default function inlineActionsPlugin(md: MarkdownRenderer): void {
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

    // Create the inline actions component token
    const token = new state.Token('html_block', '', 0)
    token.content = '<InlineOutlineActions />\n'
    token.block = true

    // Insert at the end of the document
    state.tokens.push(token)
  })
}
