import { useData } from 'vitepress'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useWideLayout } from '../useWideLayout'

// Mock VitePress useData
vi.mock('vitepress', () => ({
  useData: vi.fn(),
}))

describe('useWideLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('default behavior', () => {
    it('should return false by default when no frontmatter is set', () => {
      vi.mocked(useData).mockReturnValue({
        frontmatter: { value: {} },
      } as any)

      const { isWide } = useWideLayout()

      expect(isWide.value).toBe(false)
    })

    it('should return true when secondarySidebar is explicitly set to true', () => {
      vi.mocked(useData).mockReturnValue({
        frontmatter: { value: { secondarySidebar: true } },
      } as any)

      const { isWide } = useWideLayout()

      expect(isWide.value).toBe(true)
    })

    it('should return true when secondarySidebar is explicitly set to false', () => {
      vi.mocked(useData).mockReturnValue({
        frontmatter: { value: { secondarySidebar: false } },
      } as any)

      const { isWide } = useWideLayout()

      expect(isWide.value).toBe(true)
    })
  })

  describe('explicit wide setting', () => {
    it('should respect explicit wide: true', () => {
      vi.mocked(useData).mockReturnValue({
        frontmatter: { value: { wide: true } },
      } as any)

      const { isWide } = useWideLayout()

      expect(isWide.value).toBe(true)
    })

    it('should respect explicit wide: false', () => {
      vi.mocked(useData).mockReturnValue({
        frontmatter: { value: { wide: false } },
      } as any)

      const { isWide } = useWideLayout()

      expect(isWide.value).toBe(false)
    })

    it('should prioritize explicit wide setting over secondarySidebar', () => {
      vi.mocked(useData).mockReturnValue({
        frontmatter: { value: { secondarySidebar: true, wide: false } },
      } as any)

      const { isWide } = useWideLayout()

      expect(isWide.value).toBe(false)
    })

    it('should prioritize explicit wide setting even when secondarySidebar is false', () => {
      vi.mocked(useData).mockReturnValue({
        frontmatter: { value: { secondarySidebar: false, wide: true } },
      } as any)

      const { isWide } = useWideLayout()

      expect(isWide.value).toBe(true)
    })
  })

  describe('edge cases', () => {
    it('should handle undefined frontmatter gracefully', () => {
      vi.mocked(useData).mockReturnValue({
        frontmatter: { value: undefined },
      } as any)

      const { isWide } = useWideLayout()

      expect(isWide.value).toBe(false)
    })

    it('should handle null frontmatter gracefully', () => {
      vi.mocked(useData).mockReturnValue({
        frontmatter: { value: null },
      } as any)

      const { isWide } = useWideLayout()

      expect(isWide.value).toBe(false)
    })
  })
})
