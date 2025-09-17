declare const __NIMIQ_VITEPRESS_CONFIG__: {
  repoURL?: string
  contentPath?: string
} | undefined

export interface NimiqVitepressConfig {
  repoURL?: string
  contentPath?: string
}

export function useNimiqConfig(): NimiqVitepressConfig {
  // Vite's define works in both browser and SSR environments
  if (typeof __NIMIQ_VITEPRESS_CONFIG__ !== 'undefined') {
    return __NIMIQ_VITEPRESS_CONFIG__
  }

  // Fallback only when config is truly not available
  return {
    repoURL: undefined,
    contentPath: '',
  }
}
