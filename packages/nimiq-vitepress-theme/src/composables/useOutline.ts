import { useThrottleFn } from '@vueuse/core'
import { getScrollOffset } from 'vitepress'
import { onMounted, onUnmounted, onUpdated, ref } from 'vue'

export interface HeadingItem {
  hashPath: string
  text: string
}

export interface HeadingTree extends HeadingItem {
  items: HeadingItem[]
}

const ignoreRE = /\b(?:header-anchor|ignore-header)\b/
const resolvedHeaders: { element: HTMLHeadElement, link: string }[] = []

function serializeHeader(h: Element): string {
  let ret = ''
  Array.from(h.childNodes).forEach((node) => {
    if (node.nodeType === 1) {
      if (ignoreRE.test((node as Element).className))
        return
      ret += node.textContent
    }
    else if (node.nodeType === 3) {
      ret += node.textContent
    }
  })
  return ret.trim()
}

function getAbsoluteTop(element: HTMLElement): number {
  let offsetTop = 0
  while (element !== document.body) {
    if (element === null) {
      return Number.NaN
    }
    offsetTop += element.offsetTop
    element = element.offsetParent as HTMLElement
  }
  return offsetTop
}

export function useOutline() {
  const headingTree = ref<HeadingTree[]>([])
  const activeHeadingIds = ref<string[]>([])

  function buildTree(headings: HTMLElement[]) {
    const tree: HeadingTree[] = []
    let currentH2: HeadingTree | undefined

    headings.forEach((heading) => {
      const hashPath = heading.id
      const text = serializeHeader(heading)

      if (heading.tagName === 'H2') {
        currentH2 = { hashPath, text, items: [] }
        tree.push(currentH2)
        resolvedHeaders.push({ element: heading as HTMLHeadElement, link: `#${hashPath}` })
      }
      else if (heading.tagName === 'H3' && currentH2) {
        currentH2.items.push({ hashPath, text })
        resolvedHeaders.push({ element: heading as HTMLHeadElement, link: `#${hashPath}` })
      }
    })

    return tree
  }

  const onScroll = useThrottleFn(() => {
    const scrollY = window.scrollY
    const innerHeight = window.innerHeight
    const offsetHeight = document.body.offsetHeight

    // Get all headers positions
    const headers = resolvedHeaders
      .map(({ element, link }) => ({
        link,
        top: getAbsoluteTop(element),
      }))
      .filter(({ top }) => !Number.isNaN(top))
      .sort((a, b) => a.top - b.top)

    if (!headers.length) {
      activeHeadingIds.value = []
      return
    }

    // Page top - activate first heading
    if (scrollY < 1) {
      activeHeadingIds.value = headers[0] ? [headers[0].link.slice(1)] : []
      return
    }

    // Page bottom - activate last heading
    if (Math.abs(scrollY + innerHeight - offsetHeight) < 1) {
      const lastHeader = headers[headers.length - 1]
      if (lastHeader) {
        activeHeadingIds.value = [lastHeader.link.slice(1)]
      }
      return
    }

    // Find all headers that are in viewport
    const visibleHeaders = headers.filter(({ top }) => {
      const elementTop = top - scrollY - getScrollOffset()
      return elementTop >= -50 && elementTop <= innerHeight * 0.4
    })

    activeHeadingIds.value = visibleHeaders.map(h => h.link.slice(1))
  }, 100)

  onMounted(() => {
    resolvedHeaders.length = 0
    const headings = Array.from(document.querySelectorAll('article :where(h2,h3)'))
      .filter(el => el.id && el.hasChildNodes()) as HTMLElement[]

    headingTree.value = buildTree(headings)
    window.addEventListener('scroll', onScroll)
    requestAnimationFrame(onScroll)
  })

  onUpdated(() => {
    resolvedHeaders.length = 0
    const headings = Array.from(document.querySelectorAll('article :where(h2,h3)'))
      .filter(el => el.id && el.hasChildNodes()) as HTMLElement[]

    headingTree.value = buildTree(headings)
    requestAnimationFrame(onScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return {
    headingTree,
    activeHeadingIds,
    isHeadingActive: (hashPath: string) => activeHeadingIds.value.includes(hashPath),
  }
}
