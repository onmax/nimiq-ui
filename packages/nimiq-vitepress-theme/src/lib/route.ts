import { inBrowser } from 'vitepress'

const HASH_RE = /#.*$/
const HASH_OR_QUERY_RE = /[?#].*$/
const INDEX_OR_EXT_RE = /(?:(^|\/)index)?\.(?:md|html)$/

export function isActive(currentPath: string, matchPath?: string): boolean {
  if (matchPath === undefined)
    return false

  const normalizedCurrent = normalize(currentPath)
  const normalizedMatch = normalize(matchPath)

  // If there's a hash in the match path, check it specifically
  const hashMatch = matchPath.match(HASH_RE)
  if (hashMatch) {
    return normalizedCurrent === normalizedMatch && (inBrowser ? location.hash : '') === hashMatch[0]
  }

  // For exact path matching, return true only if they are exactly the same
  return normalizedCurrent === normalizedMatch
}

export function normalize(path: string): string {
  return decodeURI(path).replace(HASH_OR_QUERY_RE, '').replace(INDEX_OR_EXT_RE, '$1').replace(/^\//, '').replace(/\/$/, '')
}
