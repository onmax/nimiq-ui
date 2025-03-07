import type { Theme } from 'vitepress'

export interface NimiqVitepressSidebar {
  label?: string
  items: {
    text: string
    link?: string
    icon: string
    items?: { text: string, link: string }[]
  }[]
}

export interface NimiqVitepressThemeNav {
  /**
   * The string displayed in the selector.
   */
  text: string
  /**
   * The path to the sub-module. If you want to link to the root of the module, use `/`.
   */
  subpath: string
  icon?: string
  defaultPageLink: string
  description?: string
  sidebar: NimiqVitepressSidebar[]
}

export interface NimiqVitepressThemeConfig {
  modules: NimiqVitepressThemeNav[]
  links?: {
    icon: string
    link: string
  }[]
  showLastUpdated?: boolean
  showEditContent?: boolean
}

export interface DefineThemeNqVpOptions {
  enhanceApp?: Theme['enhanceApp']
}
