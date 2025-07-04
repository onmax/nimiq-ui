import type { NimiqVitepressThemeConfig } from '../types'
import { useData, useRoute, withBase } from 'vitepress'
import { computed } from 'vue'
import { useCurrentModule } from './useCurrentModule'

export interface DocNavigationItem {
  text: string
  link: string
  description?: string
}

export function useDocNavigation() {
  const { frontmatter } = useData<NimiqVitepressThemeConfig>()
  const { currentDocModule } = useCurrentModule()
  const route = useRoute()

  const showNavigation = computed(() => {
    if (frontmatter.value.layout === 'home')
      return false
    // Hide if both are explicitly false
    if (frontmatter.value.prev === false && frontmatter.value.next === false)
      return false
    return true
  })

  const findCurrentPageInSidebar = () => {
    if (!currentDocModule.value?.sidebar)
      return null
    for (const section of currentDocModule.value.sidebar) {
      const visibleItems = section.items.filter(item => !item.hidden)
      for (const item of visibleItems) {
        if (item.link && (withBase(item.link) === route.path || `${withBase(item.link)}/` === route.path))
          return { item, section, visibleItems }
        if (item.items) {
          const visibleSubItems = item.items.filter(subitem => !subitem.hidden)
          const nestedItem = visibleSubItems.find(subitem =>
            withBase(subitem.link) === route.path || `${withBase(subitem.link)}/` === route.path,
          )
          if (nestedItem)
            return { item: nestedItem, section, parent: item, visibleItems, visibleSubItems }
        }
      }
    }
    return null
  }

  const navigation = computed(() => {
    if (!showNavigation.value || !currentDocModule.value?.sidebar)
      return { prev: null, next: null }
    const current = findCurrentPageInSidebar()
    if (!current)
      return { prev: null, next: null }
    const { section, parent, item: currentItem, visibleItems, visibleSubItems } = current
    const sectionIndex = currentDocModule.value.sidebar.indexOf(section)
    const items = visibleItems || section.items.filter(item => !item.hidden)
    let prev: DocNavigationItem | null = null
    let next: DocNavigationItem | null = null
    if (parent && visibleSubItems) {
      const parentIndex = items.indexOf(parent)
      const siblingIndex = visibleSubItems.indexOf(currentItem)
      if (siblingIndex > 0)
        prev = { text: visibleSubItems[siblingIndex - 1].text, link: withBase(visibleSubItems[siblingIndex - 1].link) }
      else if (parentIndex > 0 && items[parentIndex - 1].link)
        prev = { text: items[parentIndex - 1].text, link: withBase(items[parentIndex - 1].link!) }
      if (siblingIndex < visibleSubItems.length - 1)
        next = { text: visibleSubItems[siblingIndex + 1].text, link: withBase(visibleSubItems[siblingIndex + 1].link) }
      else if (parentIndex < items.length - 1 && items[parentIndex + 1].link)
        next = { text: items[parentIndex + 1].text, link: withBase(items[parentIndex + 1].link!) }
    }
    else {
      const itemIndex = items.indexOf(currentItem)
      if (itemIndex > 0) {
        const prevItem = items[itemIndex - 1]
        if (prevItem.link) {
          prev = { text: prevItem.text, link: withBase(prevItem.link) }
        }
        else if (prevItem.items?.length) {
          const visiblePrevItems = prevItem.items.filter(item => !item.hidden)
          if (visiblePrevItems.length > 0)
            prev = { text: visiblePrevItems[visiblePrevItems.length - 1].text, link: withBase(visiblePrevItems[visiblePrevItems.length - 1].link) }
        }
      }
      else if (sectionIndex > 0) {
        const prevSection = currentDocModule.value.sidebar[sectionIndex - 1]
        const prevItems = prevSection.items.filter(item => !item.hidden)
        const lastItem = prevItems[prevItems.length - 1]
        if (lastItem?.link) {
          prev = { text: lastItem.text, link: withBase(lastItem.link) }
        }
        else if (lastItem?.items?.length) {
          const visibleLastItems = lastItem.items.filter(item => !item.hidden)
          if (visibleLastItems.length > 0)
            prev = { text: visibleLastItems[visibleLastItems.length - 1].text, link: withBase(visibleLastItems[visibleLastItems.length - 1].link) }
        }
      }
      if (itemIndex < items.length - 1) {
        const nextItem = items[itemIndex + 1]
        if (nextItem.link) {
          next = { text: nextItem.text, link: withBase(nextItem.link) }
        }
        else if (nextItem.items?.length) {
          const visibleNextItems = nextItem.items.filter(item => !item.hidden)
          if (visibleNextItems.length > 0)
            next = { text: visibleNextItems[0].text, link: withBase(visibleNextItems[0].link) }
        }
      }
      else if (sectionIndex < currentDocModule.value.sidebar.length - 1) {
        const nextSection = currentDocModule.value.sidebar[sectionIndex + 1]
        const nextItems = nextSection.items.filter(item => !item.hidden)
        const firstItem = nextItems[0]
        if (firstItem?.link) {
          next = { text: firstItem.text, link: withBase(firstItem.link) }
        }
        else if (firstItem?.items?.length) {
          const visibleFirstItems = firstItem.items.filter(item => !item.hidden)
          if (visibleFirstItems.length > 0)
            next = { text: visibleFirstItems[0].text, link: withBase(visibleFirstItems[0].link) }
        }
      }
    }
    // Respect frontmatter booleans
    if (frontmatter.value.prev === false)
      prev = null
    if (frontmatter.value.next === false)
      next = null
    return { prev, next }
  })

  return {
    navigation,
    showNavigation,
  }
}
