import type { Theme } from 'vitepress'

export interface NimiqVitepressSidebar<T extends `/${string}/` = any> {
  label?: string
  items: {
    text: string
    link?: `${T}${string}`
    icon: string
    /**
     * Hide this sidebar item from navigation. The item will still be
     * accessible via direct links and search for legacy and SEO purposes.
     */
    hidden?: boolean
    items?: { text: string, link: `${T}${string}`, hidden?: boolean }[]
  }[]
}

export interface NimiqVitepressThemeNav<T extends `/${string}/` = any> {
  /**
   * The string displayed in the selector.
   */
  text: string
  /**
   * The path to the sub-module. If you want to link to the root of the module, use `/`.
   * Needs to match the folder name in your vitepress project.
   */
  subpath: string
  icon?: string
  /**
   * The default page link for the module. This is used to open the page when the module is selected.
   * You need to use something like `/your-page/` or `/your-page/not-index-page`.
   */
  defaultPageLink: T
  description?: string
  /**
   * Hide this module from navigation (sidebar and header). The module will still be
   * accessible via direct links and search for legacy and SEO purposes.
   */
  hidden?: boolean
  sidebar: NimiqVitepressSidebar<T>[]
}

export interface NimiqVitepressThemeConfig {
  modules: NimiqVitepressThemeNav[]
  links?: {
    icon: string
    link: string
  }[]
  showLastUpdated?: boolean
  showEditContent?: boolean
  search?: { provider: 'local' }
}

export interface NimiqVitepressFrontmatter {
  layout?: 'home' | 'docs'
  sidebar?: boolean
  outline?: boolean
  secondarySidebar?: boolean
  widget?: boolean
  sourceCode?: boolean | string
  sourceCodeLabel?: string
  sourceCodePathPrefix?: string
  copyMarkdown?: boolean
  wide?: boolean
}

export interface DefineThemeNqVpOptions {
  enhanceApp?: Theme['enhanceApp']
}
