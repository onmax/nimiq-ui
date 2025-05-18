import type { NimiqVitepressThemeConfig } from '../types'
import { createSharedComposable, useScroll, useThrottleFn } from '@vueuse/core'
import { useData, useRoute } from 'vitepress'
import { computed, nextTick, onMounted, ref, watch } from 'vue'

export interface SidebarHeading {
  hashPath: string
  text: string
  level: number
  items: SidebarHeading[]
}

export const useSecondarySidebar = createSharedComposable(() => {
  const { frontmatter } = useData<NimiqVitepressThemeConfig>()
  const headingTree = ref<SidebarHeading[]>([])
  const activeHeadings = ref<string[]>([])

  // Build the heading tree by querying only h2 and h3 elements
  // inside an article, ignoring those inside [data-card] elements.
  function updateHeadingTree() {
    if (import.meta.env.SSR)
      return
    const nodes = document.querySelectorAll('article :where(h2,h3):not([data-card] *)')
    const tree: SidebarHeading[] = []
    let lastH2: SidebarHeading | null = null

    nodes.forEach((node) => {
      const el = node as HTMLElement
      if (!el.id)
        return
      const level = Number(el.tagName[1])
      const heading: SidebarHeading = {
        hashPath: el.id,
        text: el.textContent?.trim() || '',
        level,
        items: [],
      }
      if (level === 2) {
        tree.push(heading)
        lastH2 = heading
      }
      else if (level === 3) {
        if (lastH2) {
          lastH2.items.push(heading)
        }
        else {
          tree.push(heading)
        }
      }
    })
    headingTree.value = tree
  }

  // Update active headings based on their visibility within the viewport.
  // This function is throttled to run at most every 100ms.
  const updateActiveHeadings = useThrottleFn(async () => {
    await nextTick()
    const active: string[] = []

    // Recursively check each heading (and its children) for visibility.
    function checkHeading(heading: SidebarHeading) {
      const el = document.getElementById(heading.hashPath)
      if (el) {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          active.push(heading.hashPath)
        }
      }
      heading.items.forEach(checkHeading)
    }

    headingTree.value.forEach(checkHeading)
    activeHeadings.value = active
  }, 100)

  const { y: scrollY } = useScroll(undefined)

  const route = useRoute()

  watch(route, async () => {
    await nextTick()
    updateHeadingTree()
  })

  onMounted(() => updateHeadingTree())

  // Watch the reactive scroll position to update active headings.
  watch(scrollY, updateActiveHeadings)

  // Compute whether to show the outline based on frontmatter settings or heading existence.
  // Determine layout type
  const layout = computed(() => frontmatter.value.layout || 'docs')

  const showOutline = computed(() => {
    if (frontmatter.value.outline !== undefined)
      return !!frontmatter.value.outline
    if (layout.value === 'home')
      return false
    return headingTree.value.length > 0
  })

  const showWidget = computed(() => {
    if (frontmatter.value.widget !== undefined)
      return !!frontmatter.value.widget
    if (layout.value === 'home')
      return false
    return true
  })

  const showSecondarySidebar = computed(() => {
    if (frontmatter.value.secondarySidebar !== undefined)
      return !!frontmatter.value.secondarySidebar
    if (layout.value === 'home')
      return false
    // For docs layout, we show the secondary sidebar by default regardless of widget or outline
    // This matches the behavior described in the documentation
    return true
  })

  // Returns true if the heading (by its hashPath) is active (visible in viewport)
  function isHeadingActive(hash: string): boolean {
    return activeHeadings.value.includes(hash)
  }

  return {
    headingTree,
    isHeadingActive,
    showOutline,
    showWidget,
    showSecondarySidebar,
  }
})
