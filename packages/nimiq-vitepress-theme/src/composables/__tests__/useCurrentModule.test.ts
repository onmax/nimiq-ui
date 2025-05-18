import { useData, useRoute } from 'vitepress'
import { describe, expect, it, vi } from 'vitest'
import { useCurrentModule } from '../useCurrentModule'

vi.mock('vitepress', () => ({
  useData: vi.fn(),
  useRoute: vi.fn(),
  withBase: (p: string) => `/base${p}`,
}))
vi.mock('@vueuse/core', () => ({
  createSharedComposable: (fn: any) => fn,
}))

describe('useCurrentModule', () => {
  it('should select first matching module based on route.path', () => {
    const modules = [
      { text: 'A', subpath: 'a' },
      { text: 'B', subpath: 'b' },
    ]
    ;(useData as any).mockReturnValue({ theme: { value: { modules } } })
    ;(useRoute as any).mockReturnValue({ path: '/base/b/page' })

    const { currentDocModule } = useCurrentModule()
    expect(currentDocModule.value).toEqual(modules[1])
  })

  it('should fall back to first module if none match', () => {
    const modules = [
      { text: 'X', subpath: 'x' },
      { text: 'Y', subpath: 'y' },
    ]
    ;(useData as any).mockReturnValue({ theme: { value: { modules } } })
    ;(useRoute as any).mockReturnValue({ path: '/other/path' })

    const { currentDocModule } = useCurrentModule()
    expect(currentDocModule.value).toEqual(modules[0])
  })
})
