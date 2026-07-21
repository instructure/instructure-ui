/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { describe, it, expect } from 'vitest'
import {
  badgeFor,
  thumb,
  indexByName,
  sourceLinkFor,
  appUrlFor,
  boxesFromMask
} from '../commands/visual-diff.ts'

// Build a w*h changed-mask with the given filled rectangles set to 1.
function mask(
  w: number,
  h: number,
  rects: Array<{ x: number; y: number; w: number; h: number }>
) {
  const m = new Uint8Array(w * h)
  for (const r of rects) {
    for (let y = r.y; y < r.y + r.h; y++) {
      for (let x = r.x; x < r.x + r.w; x++) m[y * w + x] = 1
    }
  }
  return m
}

describe('badgeFor', () => {
  it('returns the OK pill for unchanged status', () => {
    const html = badgeFor('unchanged')
    expect(html).toContain('class="pill pass"')
    expect(html).toContain('>ok<')
  })

  it('returns the fail pill for changed status', () => {
    const html = badgeFor('changed')
    expect(html).toContain('class="pill fail"')
    expect(html).toContain('>changed<')
  })

  it('returns the new pill for added status', () => {
    const html = badgeFor('added')
    expect(html).toContain('class="pill new"')
    expect(html).toContain('>new<')
  })

  it('returns the removed pill for removed status', () => {
    const html = badgeFor('removed')
    expect(html).toContain('class="pill gone"')
    expect(html).toContain('>removed<')
  })
})

describe('thumb', () => {
  it('builds an img tag with the right src for the given mode and name', () => {
    expect(thumb('baseline', 'Button.png')).toContain(
      'src="baseline/Button.png"'
    )
    expect(thumb('actual', 'Card.png')).toContain('src="actual/Card.png"')
    expect(thumb('diff', 'Tabs.png')).toContain('src="diff/Tabs.png"')
  })

  it('includes data-name and data-mode attributes for JS hooks', () => {
    const html = thumb('baseline', 'Button.png')
    expect(html).toContain('data-name="Button.png"')
    expect(html).toContain('data-mode="baseline"')
  })

  it('marks the image as lazy-loaded and uses the thumb class', () => {
    const html = thumb('baseline', 'Button.png')
    expect(html).toContain('loading="lazy"')
    expect(html).toContain('class="thumb"')
  })
})

describe('indexByName', () => {
  it('maps each file path to an entry keyed by its basename', () => {
    const result = indexByName([
      '/some/dir/Button.png',
      '/another/dir/Card.png'
    ])
    expect(result.get('Button.png')).toEqual({ path: '/some/dir/Button.png' })
    expect(result.get('Card.png')).toEqual({ path: '/another/dir/Card.png' })
  })

  it('contains exactly one entry per input file', () => {
    expect(indexByName(['/a/X.png', '/b/Y.png', '/c/Z.png']).size).toBe(3)
  })

  it('returns an empty map for an empty input list', () => {
    expect(indexByName([]).size).toBe(0)
  })
})

describe('sourceLinkFor', () => {
  it('returns an empty string when no meta is provided', () => {
    expect(sourceLinkFor('Button.png', null, 'https://github.com/x/y')).toBe('')
  })

  it('returns an empty string when no sourceBaseUrl is provided', () => {
    expect(sourceLinkFor('Button.png', { Button: '/components/button' })).toBe(
      ''
    )
  })

  it('returns an empty string when meta has no entry for the screenshot', () => {
    expect(
      sourceLinkFor('Unknown.png', { Button: '/x' }, 'https://github.com/x/y')
    ).toBe('')
  })

  it('builds an absolute href when meta has the entry', () => {
    const html = sourceLinkFor(
      'Button.png',
      { Button: '/components/button' },
      'https://github.com/instructure/instructure-ui/blob/main/regression-test/src/app'
    )
    expect(html).toContain(
      'href="https://github.com/instructure/instructure-ui/blob/main/regression-test/src/app/components/button/page.tsx"'
    )
  })

  it('strips a trailing slash from sourceBaseUrl when building the href', () => {
    const html = sourceLinkFor(
      'Button.png',
      { Button: '/components/button' },
      'https://example.com/base/'
    )
    expect(html).toContain(
      'href="https://example.com/base/components/button/page.tsx"'
    )
  })

  it('uses a display path that drops the leading slash', () => {
    const html = sourceLinkFor(
      'Button.png',
      { Button: '/components/button' },
      'https://example.com'
    )
    expect(html).toContain('>components/button/page.tsx<')
  })

  it('opens the link in a new tab with noopener', () => {
    const html = sourceLinkFor(
      'Button.png',
      { Button: '/x' },
      'https://example.com'
    )
    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noopener"')
  })
})

describe('appUrlFor', () => {
  const facets = ['canvas', 'light', 'dark']
  const meta = { 'button-dark': '/button', 'small-components-light': '/small-components' }

  it('returns an empty string when appPath is not provided', () => {
    expect(appUrlFor('button-dark.png', meta, facets)).toBe('')
  })

  it('returns an empty string when meta is null', () => {
    expect(appUrlFor('button-dark.png', null, facets, 'app')).toBe('')
  })

  it('returns an empty string when meta has no entry for the screenshot', () => {
    expect(appUrlFor('unknown-dark.png', meta, facets, 'app')).toBe('')
  })

  it('builds a relative app URL with the theme query from the trailing facet', () => {
    expect(appUrlFor('button-dark.png', meta, facets, 'app')).toBe(
      'app/button/?theme=dark'
    )
  })

  it('matches facets even when the slug itself contains hyphens', () => {
    expect(appUrlFor('small-components-light.png', meta, facets, 'app')).toBe(
      'app/small-components/?theme=light'
    )
  })

  it('omits the theme query when no facet matches the name', () => {
    expect(appUrlFor('button-dark.png', meta, [], 'app')).toBe('app/button/')
  })

  it('strips a trailing slash from appPath', () => {
    expect(appUrlFor('button-dark.png', meta, facets, 'app/')).toBe(
      'app/button/?theme=dark'
    )
  })
})

describe('boxesFromMask', () => {
  it('returns no boxes for an unchanged mask', () => {
    expect(boxesFromMask(mask(32, 32, []), 32, 32)).toEqual([])
  })

  it('wraps a single changed cluster in one box that contains it', () => {
    const boxes = boxesFromMask(
      mask(32, 32, [{ x: 4, y: 4, w: 10, h: 10 }]),
      32,
      32
    )
    expect(boxes).toHaveLength(1)
    const [b] = boxes
    // the box must fully contain the changed region
    expect(b.x).toBeLessThanOrEqual(4)
    expect(b.y).toBeLessThanOrEqual(4)
    expect(b.x + b.w).toBeGreaterThanOrEqual(14)
    expect(b.y + b.h).toBeGreaterThanOrEqual(14)
  })

  it('separates two distant clusters into two boxes', () => {
    const boxes = boxesFromMask(
      mask(64, 64, [
        { x: 0, y: 0, w: 6, h: 6 },
        { x: 50, y: 50, w: 6, h: 6 }
      ]),
      64,
      64
    )
    expect(boxes).toHaveLength(2)
  })

  it('drops specks smaller than minPixels', () => {
    // a single changed pixel is below the default minPixels threshold
    expect(
      boxesFromMask(mask(32, 32, [{ x: 5, y: 5, w: 1, h: 1 }]), 32, 32)
    ).toEqual([])
  })

  it('never lets a box exceed the image bounds', () => {
    const boxes = boxesFromMask(
      mask(20, 20, [{ x: 0, y: 0, w: 20, h: 20 }]),
      20,
      20
    )
    expect(boxes).toHaveLength(1)
    const [b] = boxes
    expect(b.x + b.w).toBeLessThanOrEqual(20)
    expect(b.y + b.h).toBeLessThanOrEqual(20)
  })
})
