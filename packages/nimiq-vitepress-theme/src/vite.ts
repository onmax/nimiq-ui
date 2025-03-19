import type { Plugin } from 'vite'
import { groupIconVitePlugin } from 'vitepress-plugin-group-icons'

export interface NimiqVitepressVitePluginOptions {

}

export function NimiqVitepressVitePlugin(_options: NimiqVitepressVitePluginOptions = {}): Plugin {
  const plugins: Plugin[] = [
    groupIconVitePlugin(),
  ]

  return {
    name: 'nimiq-vitepress-plugin',

    config: () => ({
      plugins,
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
