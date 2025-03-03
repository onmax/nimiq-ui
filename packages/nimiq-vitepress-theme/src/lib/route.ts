import { inBrowser } from "vitepress"

const HASH_RE = /#.*$/
const HASH_OR_QUERY_RE = /[?#].*$/
const INDEX_OR_EXT_RE = /(?:(^|\/)index)?\.(?:md|html)$/

export function isActive(currentPath: string, matchPath?: string): boolean {
  if (matchPath === undefined)
    return false

  console.log({
    currentPath: normalize(currentPath),
    matchPath: normalize(matchPath),  
  })
  if (normalize(matchPath) !== normalize(currentPath))
    return false

  const hashMatch = matchPath.match(HASH_RE)
  if (hashMatch) 
    return (inBrowser ? location.hash : '') === hashMatch[0]

  return true
}

export function normalize(path: string): string {
  return decodeURI(path).replace(HASH_OR_QUERY_RE, '').replace(INDEX_OR_EXT_RE, '$1')
}
