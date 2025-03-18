import { GitChangelog } from "@nolebase/vitepress-plugin-git-changelog/vite";
import type { Plugin } from "vite";

export interface NimiqVitepressVitePluginOptions {
  /**
   * Whether to enable the GitChangelog plugin.
   * An options object can be passed to configure the plugin.
   */
  gitChangelog?: false | any

  /**
   * The URL of the Git repository.
   * This is used to generate the changelog.
   */
  repoURL: string
}

export function NimiqVitepressVitePlugin(options: NimiqVitepressVitePluginOptions): Plugin {
  const { gitChangelog = {} } = options;

  const plugins: Plugin[] = [];

  const repoURL = options.repoURL

  if (gitChangelog !== false)
    plugins.push({ ...GitChangelog({ repoURL, ...gitChangelog }) })

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
      define: {
        __GIT_REMOTE_URL__: JSON.stringify(repoURL),
      },
      // plugins,
      resolve: {
        alias: {
        },
      },
    }),
  } satisfies Plugin;
}

export default NimiqVitepressVitePlugin
