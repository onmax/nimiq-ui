export function renderMarkdown(markdownText = '') {
  const htmlText = markdownText
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.*)\*\*/g, '<b>$1</b>')
    .replace(/\*(.*)\*/g, '<i>$1</i>')
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt=\'$1\' src=\'$2\' />')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a class="no-icon" href=\'$2\'>$1</a>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n$/gm, '<br />')

  return htmlText.trim()
}

export function renderCommitMessage(repoLink: string, msg: string) {
  return renderMarkdown(msg)
    .replace(/#(\d+)/g, `<a href=\'${repoLink}/issues/$1\'>#$1</a>`)
}
