declare const __NIMIQ_VITEPRESS_CONFIG__: {
  repoURL?: string
  contentPath?: string
} | undefined

export interface NimiqVitepressConfig {
  repoURL?: string
  contentPath?: string
}

export function useNimiqConfig(): NimiqVitepressConfig {
  // Check if running in browser environment and config is available
  if (typeof window !== 'undefined' && typeof __NIMIQ_VITEPRESS_CONFIG__ !== 'undefined') {
    return __NIMIQ_VITEPRESS_CONFIG__
  }

  // For SSR or when config is not available, return fallback
  return {
    repoURL: undefined,
    contentPath: '',
  }
}
