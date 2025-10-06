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

export interface OutlineAction {
  icon: string
  label: string
  onClick: () => void | Promise<void>
}

export interface NimiqVitepressThemeConfig {
  /** Array of navigation modules for your documentation */
  modules: NimiqVitepressThemeNav[]
  /** Social and external links displayed in the navigation */
  links?: {
    icon: string
    link: string
    label: string
  }[]
  /**
   * Show last updated timestamp for pages
   * @default true
   */
  showLastUpdated?: boolean
  /**
   * Show "Edit this page" link
   * @default true
   */
  showEditContent?: boolean
  /**
   * Enable local search functionality
   * @example { provider: 'local' }
   */
  search?: { provider: 'local' }
  /** Custom actions displayed in the page outline */
  outlineActions?: OutlineAction[]
  /**
   * Customize the page footer left text
   * - false: hide the footer link
   * - string: use custom text (supports markdown)
   * - function: dynamic text based on page path
   * - undefined: show default "Suggest changes on this page"
   *
   * Can be overridden per-page via frontmatter
   */
  pageFooterLeftText?: false | string | ((options: { path: string }) => string)
}

export interface NimiqVitepressFrontmatter {
  layout?: 'home' | 'docs' | 'overview'
  sidebar?: boolean
  breadcrumbs?: boolean
  outline?: boolean
  secondarySidebar?: boolean
  widget?: boolean
  changelog?: boolean
  sourceCode?: boolean | string
  sourceCodeLabel?: string
  sourceCodePathPrefix?: string
  copyMarkdown?: boolean
  inlineActions?: boolean
  pageFooterLeftText?: false | string
}

export interface DefineThemeNqVpOptions {
  enhanceApp?: Theme['enhanceApp']
}
