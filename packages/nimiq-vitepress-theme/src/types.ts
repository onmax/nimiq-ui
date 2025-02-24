export interface NimiqVitepressSidebar {
  label: string
  items: {
    text: string
    link?: string
    icon: string
    items?: { text: string, link: string} []
  }[]
}



export interface NimiqVitepressThemeConfig {
  nav?: {
    text: string
    link: string
    icon?: string
  }[]
  sidebar: NimiqVitepressSidebar[]
  socialLinks?: {
    icon: string
    link: string
  }[]
}
