declare module '@localSearchIndex' {
  const data: Record<string, () => Promise<{ default: string }>>
  export default data
}

declare module 'mark.js/src/vanilla.js' {
  import type Mark from 'mark.js'

  const mark: typeof Mark
  export default mark
}

declare const __ASSETS_DIR__: string
declare const __VP_HASH_MAP__: Record<string, string>

declare module 'virtual:nolebase-git-changelog' {
  import type { Changelog } from './types'

  const changelog: Changelog
  export default changelog
}

// Vite environment variables
interface ImportMeta {
  readonly env: {
    readonly SSR: boolean
    readonly [key: string]: string | boolean | undefined
  }
}
