import type { Plugin } from 'vite'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import { GitChangelog } from '@nolebase/vitepress-plugin-git-changelog/vite'
import { groupIconVitePlugin } from './code-groups/vite'

export interface NimiqVitepressVitePluginOptions {

}

const execAsync = promisify(exec)

export async function NimiqVitepressVitePlugin(_options: NimiqVitepressVitePluginOptions = {}): Promise<Plugin[]> {
  const { resolveId, configureServer, load, transform } = groupIconVitePlugin()

  const externalPlugins: Plugin[] = []

  const repoURL = await execAsync('git config --get remote.origin.url', { cwd: __dirname }).then(result => result.stdout.trim()).catch(() => null)
  if (repoURL)
    externalPlugins.push(GitChangelog({ repoURL }))

  return [
    {
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
    } satisfies Plugin,
    ...externalPlugins,
  ]
}

export default NimiqVitepressVitePlugin
