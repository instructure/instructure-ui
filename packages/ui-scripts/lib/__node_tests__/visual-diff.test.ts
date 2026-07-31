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
  dilateMask,
  esc,
  normalizeA11y,
  normalizeImpact,
  parseContrast,
  ruleCopy,
  findingsFor,
  a11yBadge,
  a11yMarkers,
  a11yCards,
  a11ySummary,
  a11yOverview
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
  const meta = {
    'button-dark': '/button',
    'small-components-light': '/small-components'
  }

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

describe('dilateMask', () => {
  const countSet = (m: ArrayLike<number>) => {
    let n = 0
    for (let i = 0; i < m.length; i++) if (m[i]) n++
    return n
  }

  it('leaves an empty mask empty', () => {
    expect(countSet(dilateMask(mask(16, 16, []), 16, 16))).toBe(0)
  })

  it('grows a single pixel into its 3x3 neighborhood by default', () => {
    const out = dilateMask(mask(16, 16, [{ x: 8, y: 8, w: 1, h: 1 }]), 16, 16)
    expect(countSet(out)).toBe(9)
    // the neighbors around the original pixel are all set
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        expect(out[(8 + dy) * 16 + (8 + dx)]).toBe(1)
      }
    }
  })

  it('clamps the dilation at the image edges', () => {
    // a corner pixel only has 3 in-bounds neighbors besides itself
    const out = dilateMask(mask(16, 16, [{ x: 0, y: 0, w: 1, h: 1 }]), 16, 16)
    expect(countSet(out)).toBe(4)
  })

  it('honors a custom radius', () => {
    const out = dilateMask(
      mask(16, 16, [{ x: 8, y: 8, w: 1, h: 1 }]),
      16,
      16,
      2
    )
    expect(countSet(out)).toBe(25)
  })

  it('passes the mask through unchanged for radius 0', () => {
    const src = mask(16, 16, [{ x: 3, y: 3, w: 2, h: 2 }])
    const out = dilateMask(src, 16, 16, 0)
    expect(countSet(out)).toBe(countSet(src))
  })
})

describe('esc', () => {
  it('escapes HTML-significant characters', () => {
    expect(esc('<span class="x">a & b</span>')).toBe(
      '&lt;span class=&quot;x&quot;&gt;a &amp; b&lt;/span&gt;'
    )
  })

  it('leaves plain text untouched', () => {
    expect(esc('color-contrast')).toBe('color-contrast')
  })
})

// A capture in the shape spec.cy.ts now writes: page dimensions plus violations
// whose nodes carry a measured rect, a human label, and contrast numbers.
const CAPTURE = {
  'button-dark': {
    page: { w: 1000, h: 2000 },
    violations: [
      {
        id: 'color-contrast',
        impact: 'serious',
        help: 'Elements must meet minimum color contrast ratio thresholds',
        helpUrl: 'https://dequeuniversity.com/rules/axe/color-contrast',
        nodes: [
          {
            target: '.css-x-baseButton__children',
            html: '<span>primary-inverse</span>',
            summary:
              'Element has insufficient color contrast of 1.13 (foreground color: #ffffff, background color: #f5f5f5, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1',
            label: 'span “Primary inverse”',
            rect: { x: 100, y: 200, w: 250, h: 40 },
            contrast: {
              fg: '#ffffff',
              bg: '#f5f5f5',
              ratio: 1.13,
              expected: 4.5,
              fontSize: '12.0pt (16px)',
              fontWeight: 'normal'
            }
          }
        ]
      },
      {
        id: 'button-name',
        impact: 'critical',
        help: 'Buttons must have discernible text',
        helpUrl: 'https://dequeuniversity.com/rules/axe/button-name',
        nodes: [
          {
            target: 'button.icon-only',
            html: '<button></button>',
            summary: 'Element does not have inner text',
            label: 'button',
            rect: { x: 0, y: 0, w: 40, h: 40 },
            contrast: null
          }
        ]
      }
    ]
  }
}

describe('normalizeA11y', () => {
  it('passes the current { page, violations } shape through', () => {
    const out = normalizeA11y(CAPTURE)!
    expect(out['button-dark'].page).toEqual({ w: 1000, h: 2000 })
    expect(out['button-dark'].violations).toHaveLength(2)
  })

  it('accepts the earlier bare-array shape, with no page size', () => {
    const out = normalizeA11y({
      'button-dark': CAPTURE['button-dark'].violations
    })!
    expect(out['button-dark'].page).toBeNull()
    expect(out['button-dark'].violations).toHaveLength(2)
  })

  it('drops screenshots that have no violations', () => {
    expect(
      normalizeA11y({ 'a-dark': [], 'b-dark': { violations: [] } })
    ).toEqual({})
  })

  it('ignores a zero-sized page so markers are not positioned against it', () => {
    const out = normalizeA11y({
      'button-dark': { page: { w: 0, h: 0 }, violations: [{ nodes: [] }] }
    })!
    expect(out['button-dark'].page).toBeNull()
  })

  it('returns null for input that is not an object', () => {
    expect(normalizeA11y(null)).toBeNull()
    expect(normalizeA11y('nope')).toBeNull()
    expect(normalizeA11y([])).toBeNull()
  })
})

describe('normalizeImpact', () => {
  it('keeps the four axe impact levels', () => {
    for (const i of ['critical', 'serious', 'moderate', 'minor']) {
      expect(normalizeImpact(i)).toBe(i)
    }
  })

  it('buckets a missing or unrecognized impact as unknown', () => {
    expect(normalizeImpact(null)).toBe('unknown')
    expect(normalizeImpact(undefined)).toBe('unknown')
    expect(normalizeImpact('catastrophic')).toBe('unknown')
  })
})

describe('parseContrast', () => {
  const summary =
    'Fix any of the following:\n  Element has insufficient color contrast of 2.42 (foreground color: #6b7780, background color: #2d3b45, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1'

  it('recovers the numbers from axe prose for runs captured before they were structured', () => {
    expect(parseContrast(summary)).toEqual({
      fg: '#6b7780',
      bg: '#2d3b45',
      ratio: 2.42,
      expected: 4.5,
      fontSize: '12.0pt (16px)',
      fontWeight: 'normal'
    })
  })

  it('returns null for a summary that is not about contrast', () => {
    expect(parseContrast('Element does not have inner text')).toBeNull()
    expect(parseContrast('')).toBeNull()
    expect(parseContrast(undefined)).toBeNull()
  })
})

describe('ruleCopy', () => {
  it('replaces a known rule id with designer-facing copy', () => {
    const { title, fix } = ruleCopy('color-contrast', 'axe help text')
    expect(title).toBe('Text contrast is too low')
    expect(fix).not.toBe('')
  })

  it("falls back to axe's help text for an unmapped rule", () => {
    expect(ruleCopy('some-future-rule', 'axe help text')).toEqual({
      title: 'axe help text',
      fix: ''
    })
  })
})

describe('findingsFor', () => {
  const a11y = normalizeA11y(CAPTURE)

  it('returns nothing for a screenshot with no violations', () => {
    expect(findingsFor('alert-dark.png', a11y).findings).toEqual([])
    expect(findingsFor('button-dark.png', null).findings).toEqual([])
  })

  it('flattens rules into one numbered finding per offending element', () => {
    const { findings } = findingsFor('button-dark.png', a11y)
    expect(findings.map((f) => f.n)).toEqual([1, 2])
  })

  it('orders findings worst impact first so the numbering runs by priority', () => {
    const { findings } = findingsFor('button-dark.png', a11y)
    expect(findings.map((f) => f.rule)).toEqual([
      'button-name',
      'color-contrast'
    ])
  })

  it('carries the page size through for positioning the overlay', () => {
    expect(findingsFor('button-dark.png', a11y).page).toEqual({
      w: 1000,
      h: 2000
    })
  })

  it('attaches plain-language copy to each finding', () => {
    const { findings } = findingsFor('button-dark.png', a11y)
    expect(findings[0].title).toBe('Button has no accessible name')
  })

  it('derives contrast from the axe summary when it was not captured structurally', () => {
    const legacy = normalizeA11y({
      'x-dark': [
        {
          id: 'color-contrast',
          impact: 'serious',
          help: 'h',
          helpUrl: 'u',
          nodes: [
            {
              target: 'p',
              html: '<p>',
              summary:
                'Element has insufficient color contrast of 2.42 (foreground color: #6b7780, background color: #2d3b45). Expected contrast ratio of 4.5:1'
            }
          ]
        }
      ]
    })
    expect(
      findingsFor('x-dark.png', legacy).findings[0].contrast
    ).toMatchObject({ fg: '#6b7780', ratio: 2.42, expected: 4.5 })
  })
})

describe('a11yBadge', () => {
  const { findings } = findingsFor('button-dark.png', normalizeA11y(CAPTURE))

  it('renders nothing when there are no findings', () => {
    expect(a11yBadge([])).toBe('')
  })

  it('counts every offending element', () => {
    expect(a11yBadge(findings)).toContain('⚠ 2 a11y')
  })

  it('is colored by the worst impact present', () => {
    // data-impact, not a class — that's what the severity-color rules key off.
    expect(a11yBadge(findings)).toContain('data-impact="critical"')
  })

  it('pluralizes the tooltip', () => {
    expect(a11yBadge(findings.slice(0, 1))).toContain(
      '1 accessibility issue, worst impact: critical'
    )
    expect(a11yBadge(findings)).toContain('2 accessibility issues')
  })
})

describe('a11yMarkers', () => {
  const { findings, page } = findingsFor(
    'button-dark.png',
    normalizeA11y(CAPTURE)
  )

  it('positions each box as a percentage of the captured page', () => {
    const html = a11yMarkers(findings, page)
    // the color-contrast node: x 100/1000, y 200/2000, w 250/1000, h 40/2000
    expect(html).toContain('--x:10.000%;--y:10.000%;--w:25.000%;--h:2.000%')
  })

  it('numbers each box to match its card', () => {
    const html = a11yMarkers(findings, page)
    expect(html).toContain('data-n="1"')
    expect(html).toContain('data-n="2"')
  })

  it('tags each box with its impact so it picks up the severity color', () => {
    expect(a11yMarkers(findings, page)).toContain('data-impact="critical"')
  })

  it('renders nothing when the run recorded no page size', () => {
    expect(a11yMarkers(findings, null)).toBe('')
  })

  it('skips findings whose element could not be measured', () => {
    const unmeasured = findings.map((f) => ({ ...f, rect: null }))
    expect(a11yMarkers(unmeasured, page)).toBe('')
  })
})

describe('a11yCards', () => {
  const { findings } = findingsFor('button-dark.png', normalizeA11y(CAPTURE))
  const html = a11yCards(findings)

  it('renders nothing when there are no findings', () => {
    expect(a11yCards([])).toBe('')
  })

  it('leads with the plain-language title, not the rule id', () => {
    expect(html).toContain('<h3>Text contrast is too low</h3>')
    expect(html).toContain('<h3>Button has no accessible name</h3>')
  })

  it('names the offending element in human terms', () => {
    expect(html).toContain('span “Primary inverse”')
  })

  it('shows contrast as swatches, the measured ratio, and the required one', () => {
    expect(html).toContain('background:#ffffff')
    expect(html).toContain('background:#f5f5f5')
    expect(html).toContain('>1.13:1<')
    expect(html).toContain('needs 4.5:1')
  })

  it('marks a passing ratio differently from a failing one', () => {
    const passing = findings.map((f) =>
      f.contrast ? { ...f, contrast: { ...f.contrast, ratio: 7 } } : f
    )
    expect(a11yCards(passing)).toContain('class="ratio ok"')
    expect(html).toContain('class="ratio bad"')
  })

  it('suggests a fix', () => {
    expect(html).toContain('Darken the text or lighten the background')
  })

  it('keeps the raw axe output behind a disclosure', () => {
    expect(html).toContain('<summary>Technical details</summary>')
    expect(html).toContain('.css-x-baseButton__children')
    expect(html).toContain(
      'href="https://dequeuniversity.com/rules/axe/color-contrast"'
    )
  })

  it('tags cards with rule and impact so the filters can narrow them', () => {
    expect(html).toContain('data-rule="color-contrast"')
    expect(html).toContain('data-impact="serious"')
  })

  it('says so when the element could not be located', () => {
    const unlabeled = findings.map((f) => ({ ...f, label: '' }))
    expect(a11yCards(unlabeled)).toContain('position not captured')
  })

  it('does not interpolate a non-hex color into a style attribute', () => {
    const injected = findings.map((f) =>
      f.contrast
        ? {
            ...f,
            contrast: { ...f.contrast, fg: 'red;background-image:url(x)' }
          }
        : f
    )
    const out = a11yCards(injected)
    expect(out).toContain('background:transparent')
    expect(out).not.toContain('background-image')
  })
})

describe('a11ySummary', () => {
  const many = normalizeA11y({
    'button-dark': CAPTURE['button-dark'],
    'button-light': CAPTURE['button-dark'],
    'alert-dark': {
      page: { w: 1000, h: 500 },
      violations: [CAPTURE['button-dark'].violations[0]]
    }
  })

  it('rolls each rule up across the whole run', () => {
    const rules = a11ySummary(many)
    const contrast = rules.find((r) => r.rule === 'color-contrast')!
    expect(contrast.nodes).toBe(3)
    expect(contrast.screens).toBe(3)
  })

  it('collapses the same rule across themes into one line', () => {
    expect(a11ySummary(many).map((r) => r.rule)).toEqual([
      'button-name',
      'color-contrast'
    ])
  })

  it('sorts worst impact first', () => {
    expect(a11ySummary(many)[0].impact).toBe('critical')
  })

  it('labels each rule with its plain-language title', () => {
    expect(a11ySummary(many)[0].title).toBe('Button has no accessible name')
  })

  it('returns an empty list when there is no a11y data', () => {
    expect(a11ySummary(null)).toEqual([])
  })
})

describe('a11yOverview', () => {
  const rules = a11ySummary(normalizeA11y(CAPTURE))

  it('renders nothing when there are no rules', () => {
    expect(a11yOverview([], 0)).toBe('')
  })

  it('totals the elements across every rule', () => {
    expect(a11yOverview(rules, 1)).toContain('⚠ 2 accessibility issues')
  })

  it('reports the screenshot and rule counts', () => {
    expect(a11yOverview(rules, 1)).toContain('across 1 screenshot · 2 rules')
  })

  it('makes each rule a filter button', () => {
    expect(a11yOverview(rules, 1)).toContain(
      '<button class="ov-rule" data-rule="color-contrast">'
    )
  })
})
