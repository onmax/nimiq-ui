import { useData, useRoute, withBase } from 'vitepress'
import { computed } from 'vue'
import { useCurrentModule } from './useCurrentModule'

export interface Breadcrumb {
  text: string
  link?: string
  icon?: string
}

export function useBreadcrumbs() {
  const { currentDocModule } = useCurrentModule()
  const route = useRoute()
  const { frontmatter } = useData()

  const showBreadcrumbs = computed(() => {
    if (frontmatter.value.breadcrumbs !== undefined)
      return frontmatter.value.breadcrumbs
    if (frontmatter.value.layout === 'home')
      return false
    return true
  })

  const breadcrumbs = computed<Breadcrumb[]>(() => {
    const items: Breadcrumb[] = []

    if (!currentDocModule.value)
      return items

    // 1. Add module info with link
    items.push({
      text: currentDocModule.value.text,
      link: currentDocModule.value.subpath,
    })

    // Find current page in sidebar
    const currentSidebar = currentDocModule.value.sidebar.find((section) => {
      return section.items.some(item =>
        (item.link && (`${withBase(item.link)}/` === route.path || withBase(item.link) === route.path))
        || (item.items?.some(subitem => `${withBase(subitem.link)}/` === route.path || withBase(subitem.link) === route.path)),
      )
    })

    // 2. Add section label if exists
    if (currentSidebar?.label)
      items.push({ text: currentSidebar.label })

    // 3. Add parent item if exists (for nested items)
    const parentItem = currentSidebar?.items.find(item =>
      item.items?.some(subitem => `${withBase(subitem.link)}/` === route.path || withBase(subitem.link) === route.path),
    )
    if (parentItem)
      items.push({ text: parentItem.text })

    // 4. Add current item
    const currentItem = currentSidebar?.items.find(item =>
      item.link && (withBase(item.link) === route.path || `${withBase(item.link)}/` === route.path),
    )
    || currentSidebar?.items
      .find(item => item.items?.some(subitem =>
        subitem.link && (withBase(subitem.link) === route.path || `${withBase(subitem.link)}/` === route.path),
      ))
      ?.items
      ?.find(subitem =>
        subitem.link && (withBase(subitem.link) === route.path || `${withBase(subitem.link)}/` === route.path),
      )

    if (currentItem)
      items.push({ text: currentItem.text })

    return items
  })

  return {
    breadcrumbs,
    showBreadcrumbs,
  }
}
