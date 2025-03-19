import type { Plugin } from 'vite'

export interface NimiqVitepressVitePluginOptions {

}

export function NimiqVitepressVitePlugin(_options: NimiqVitepressVitePluginOptions = {}): Plugin {
  return {
    name: 'nimiq-vitepress-plugin',
    // enforce: 'pre',
    config: () => ({
      optimizeDeps: {
        exclude: [
          'nimiq-vitepress-theme/client',
          'virtual:nolebase-git-changelog',
        ],
      },
      ssr: {
        noExternal: [
          'nimiq-vitepress-theme',
        ],
      },
      // plugins,
      resolve: {
        alias: {
        },
      },
    }),
  } satisfies Plugin
}

export default NimiqVitepressVitePlugin
