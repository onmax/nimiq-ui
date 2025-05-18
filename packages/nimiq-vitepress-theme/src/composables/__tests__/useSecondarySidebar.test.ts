// Import the mocked modules to set their behavior
import { useData } from 'vitepress'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useSecondarySidebar } from '../useSecondarySidebar'

// Mock the necessary dependencies
vi.mock('vitepress', () => ({
  useData: vi.fn(),
  useRoute: vi.fn(() => ({})),
}))

vi.mock('@vueuse/core', () => ({
  createSharedComposable: (fn: any) => fn,
  useScroll: vi.fn(() => ({ y: { value: 0 } })),
  useThrottleFn: vi.fn(fn => fn),
}))

vi.mock('vue', () => ({
  computed: vi.fn(fn => ({ value: fn() })),
  nextTick: vi.fn(),
  onMounted: vi.fn(fn => fn()),
  ref: vi.fn(val => ({ value: val })),
  watch: vi.fn(),
}))

describe('useSecondarySidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('layout behavior', () => {
    it('should hide sidebar for home layout', () => {
      // Mock the frontmatter to have home layout
      vi.mocked(useData).mockReturnValue({
        frontmatter: { value: { layout: 'home' } },
      } as any)

      const { showSecondarySidebar, showOutline, showWidget } = useSecondarySidebar()

      expect(showSecondarySidebar.value).toBe(false)
      expect(showOutline.value).toBe(false)
      expect(showWidget.value).toBe(false)
    })

    it('should show sidebar for docs layout', () => {
      // Mock the frontmatter to have docs layout with headings
      vi.mocked(useData).mockReturnValue({
        frontmatter: { value: { layout: 'docs' } },
      } as any)

      const { showSecondarySidebar, showOutline, showWidget } = useSecondarySidebar()

      // For docs layout, secondarySidebar should always be true by default
      expect(showSecondarySidebar.value).toBe(true)

      // However, outline depends on headings existing
      expect(showOutline.value).toBe(false)

      // Widget is always shown by default in docs layout
      expect(showWidget.value).toBe(true)
    })

    it('should respect explicit frontmatter settings regardless of layout', () => {
      // Mock the frontmatter to have home layout but with explicit secondary sidebar settings
      vi.mocked(useData).mockReturnValue({
        frontmatter: {
          value: {
            layout: 'home',
            secondarySidebar: true,
            outline: true,
            widget: true,
          },
        },
      } as any)

      const { showSecondarySidebar, showOutline, showWidget } = useSecondarySidebar()

      expect(showSecondarySidebar.value).toBe(true)
      expect(showOutline.value).toBe(true)
      expect(showWidget.value).toBe(true)
    })
  })
})
