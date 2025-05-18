import type { Breadcrumb } from '../useBreadcrumbs'
import { useRoute } from 'vitepress'
import { describe, expect, it, vi } from 'vitest'
import { computed } from 'vue'
import { useBreadcrumbs } from '../useBreadcrumbs'
import { useCurrentModule } from '../useCurrentModule'

// Mock dependencies
vi.mock('vitepress', () => ({
  useRoute: vi.fn(),
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

    const { breadcrumbs } = useBreadcrumbs()
    expect(breadcrumbs.value).toEqual<Breadcrumb[]>([
      { text: 'Mod', link: 'mod' },
      { text: 'Sec' },
      { text: 'Parent' },
      { text: 'Child' },
    ])
  })
})
