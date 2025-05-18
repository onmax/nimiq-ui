import type { Breadcrumb } from '../useBreadcrumbs'
import { useData, useRoute } from 'vitepress'
import { describe, expect, it, vi } from 'vitest'
import { computed } from 'vue'
import { useBreadcrumbs } from '../useBreadcrumbs'
import { useCurrentModule } from '../useCurrentModule'

// Mock dependencies
vi.mock('vitepress', () => ({
  useRoute: vi.fn(),
  useData: vi.fn(),
  withBase: (p: string) => `/base${p}`,
}))
vi.mock('../useCurrentModule', () => ({
  useCurrentModule: vi.fn(),
}))

describe('useBreadcrumbs', () => {
  it('should generate breadcrumbs for top-level item', () => {
    const moduleData = {
      text: 'Module1',
      subpath: 'mod1',
      sidebar: [
        {
          label: 'Section1',
          items: [
            { text: 'Page1', link: '/page1' },
          ],
        },
      ],
    }
    ;(useCurrentModule as any).mockReturnValue({
      currentDocModule: computed(() => moduleData),
    })
    ;(useRoute as any).mockReturnValue({ path: '/base/page1/' })
    ;(useData as any).mockReturnValue({ frontmatter: computed(() => ({})) })

    const { breadcrumbs } = useBreadcrumbs()
    expect(breadcrumbs.value).toEqual<Breadcrumb[]>([
      { text: 'Module1', link: 'mod1' },
      { text: 'Section1' },
      { text: 'Page1' },
    ])
  })

  it('should generate breadcrumbs for nested item', () => {
    const moduleData = {
      text: 'Mod',
      subpath: 'mod',
      sidebar: [
        {
          label: 'Sec',
          items: [
            {
              text: 'Parent',
              items: [
                { text: 'Child', link: '/child' },
              ],
            },
          ],
        },
      ],
    }
    ;(useCurrentModule as any).mockReturnValue({
      currentDocModule: computed(() => moduleData),
    })
    ;(useRoute as any).mockReturnValue({ path: '/base/child/' })
    ;(useData as any).mockReturnValue({ frontmatter: computed(() => ({})) })

    const { breadcrumbs } = useBreadcrumbs()
    expect(breadcrumbs.value).toEqual<Breadcrumb[]>([
      { text: 'Mod', link: 'mod' },
      { text: 'Sec' },
      { text: 'Parent' },
      { text: 'Child' },
    ])
  })

  it('should show breadcrumbs by default for docs layout', () => {
    const moduleData = {
      text: 'Module',
      subpath: 'mod',
      sidebar: [],
    }
    ;(useCurrentModule as any).mockReturnValue({
      currentDocModule: computed(() => moduleData),
    })
    ;(useRoute as any).mockReturnValue({ path: '/base/test/' })
    ;(useData as any).mockReturnValue({ frontmatter: computed(() => ({})) })

    const { showBreadcrumbs } = useBreadcrumbs()
    expect(showBreadcrumbs.value).toBe(true)
  })

  it('should hide breadcrumbs by default for home layout', () => {
    const moduleData = {
      text: 'Module',
      subpath: 'mod',
      sidebar: [],
    }
    ;(useCurrentModule as any).mockReturnValue({
      currentDocModule: computed(() => moduleData),
    })
    ;(useRoute as any).mockReturnValue({ path: '/base/test/' })
    ;(useData as any).mockReturnValue({ frontmatter: computed(() => ({ layout: 'home' })) })

    const { showBreadcrumbs } = useBreadcrumbs()
    expect(showBreadcrumbs.value).toBe(false)
  })

  it('should respect explicit breadcrumbs frontmatter setting', () => {
    const moduleData = {
      text: 'Module',
      subpath: 'mod',
      sidebar: [],
    }
    ;(useCurrentModule as any).mockReturnValue({
      currentDocModule: computed(() => moduleData),
    })
    ;(useRoute as any).mockReturnValue({ path: '/base/test/' })
    ;(useData as any).mockReturnValue({ frontmatter: computed(() => ({ breadcrumbs: false })) })

    const { showBreadcrumbs } = useBreadcrumbs()
    expect(showBreadcrumbs.value).toBe(false)
  })
})
