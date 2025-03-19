// https://github.com/yuyinws/vitepress-plugin-group-icons/blob/main/src/vite.ts

import type { Plugin, ViteDevServer } from 'vite'
import { createFilter } from 'vite'
import { generateCSS } from './codegen'

const filter = createFilter([/\.md$/, /\.md\?vue/, /\.md\?v=/])

export function groupIconVitePlugin(): Plugin {
  const virtualCssId = 'virtual:group-icons.css'
  const resolvedVirtualCssId = `\0${virtualCssId}`
  const regex = /```(?:\S+)\s+\[(?:(?:[^\]\.]+\.)+)?([^\]]+)\]/;
  const matches = new Set<string>()

  let oldMatches: Set<string> = new Set()
  let server: ViteDevServer | undefined

  function handleUpdateModule() {
    const mod = server?.moduleGraph.getModuleById(resolvedVirtualCssId)
    if (mod) {
      server!.moduleGraph.invalidateModule(mod)
      server!.reloadModule(mod)
    }
  }

  return {
    name: 'vitepress-forked-plugin-group-icons',
    resolveId(id) {
      if (id === virtualCssId)
        return resolvedVirtualCssId
    },

    configureServer(_server) {
      server = _server
    },

    async load(id) {
      if (id === resolvedVirtualCssId) {
        const { css } = await generateCSS(matches)
        oldMatches = new Set(matches)
        return css
      }
    },
    transform(code, id) {
      if (!filter(id))
        return

      while (true) {
        const match = regex.exec(code)
        if (!match)
          break
        matches.add(match[1])
      }

      if (!isSetEqual(matches, oldMatches))
        handleUpdateModule()
    },
  }
}

function isSetEqual(set1: Set<string>, set2: Set<string>) {
  if (set1.size !== set2.size)
    return false
  for (const item of set1) {
    if (!set2.has(item))
      return false
  }
  return true
}
