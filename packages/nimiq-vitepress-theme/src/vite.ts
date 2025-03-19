import type { Plugin } from 'vite'
import { groupIconVitePlugin } from './code-groups/vite'

export interface NimiqVitepressVitePluginOptions {

}

export function NimiqVitepressVitePlugin(_options: NimiqVitepressVitePluginOptions = {}): Plugin {
  const { resolveId, configureServer, load, transform } = groupIconVitePlugin()

  return {
    name: 'nimiq-vitepress-plugin',
    enforce: 'pre',
    resolveId,
    configureServer,
    load,
    transform,
    config: () => ({
      optimizeDeps: {
        exclude: [
          'nimiq-vitepress-theme',
          'virtual:nolebase-git-changelog',
        ],
      },
      ssr: {
        noExternal: [
          'nimiq-vitepress-theme',
        ],
      },
    }),
  } satisfies Plugin
}

export default NimiqVitepressVitePlugin
