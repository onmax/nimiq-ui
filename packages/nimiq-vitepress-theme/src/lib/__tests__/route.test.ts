import { describe, expect, it } from 'vitest'
import { isActive, normalize } from '../route'

describe('normalize', () => {
  it('removes leading slash', () => {
    expect(normalize('/path/to/page')).toBe('path/to/page')
  })

  it('removes trailing slash', () => {
    expect(normalize('path/to/page/')).toBe('path/to/page')
  })

  it('removes .md extension', () => {
    expect(normalize('path/to/page.md')).toBe('path/to/page')
  })

  it('removes .html extension', () => {
    expect(normalize('path/to/page.html')).toBe('path/to/page')
  })

  it('removes index.md', () => {
    expect(normalize('path/to/index.md')).toBe('path/to')
  })

  it('removes index.html', () => {
    expect(normalize('path/to/index.html')).toBe('path/to')
  })

  it('removes leading index.md', () => {
    expect(normalize('index.md')).toBe('')
  })

  it('removes hash fragments', () => {
    expect(normalize('path/to/page#section')).toBe('path/to/page')
  })

  it('removes query parameters', () => {
    expect(normalize('path/to/page?param=value')).toBe('path/to/page')
  })

  it('handles complex case', () => {
    expect(normalize('/path/to/index.md#section')).toBe('path/to')
  })
})

describe('isActive', () => {
  it('returns false when matchPath is undefined', () => {
    expect(isActive('path/to/page', undefined)).toBe(false)
  })

  it('returns true for exact path match', () => {
    expect(isActive('nimiq-icons/explorer.html', '/nimiq-icons/explorer')).toBe(true)
  })

  it('returns false for non-matching paths', () => {
    expect(isActive('nimiq-icons/explorer.html', '/nimiq-icons')).toBe(false)
  })

  it('returns true for index page matching module root', () => {
    expect(isActive('nimiq-icons/index.html', '/nimiq-icons')).toBe(true)
  })

  it('returns true for exact match with extensions and slashes', () => {
    expect(isActive('/path/to/page.md', 'path/to/page')).toBe(true)
  })

  it('returns false for partial matches that should not be active', () => {
    expect(isActive('nimiq-icons-extended/page.html', '/nimiq-icons')).toBe(false)
  })

  it('handles hash fragments in match path', () => {
    expect(isActive('path/to/page.md', '/path/to/page#section')).toBe(false) // simplified without browser hash check
  })

  it('normalizes paths before comparison', () => {
    expect(isActive('path/to/index.md', '/path/to/')).toBe(true)
  })
})
