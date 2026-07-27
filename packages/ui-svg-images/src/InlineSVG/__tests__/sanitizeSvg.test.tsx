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

import '@testing-library/jest-dom'
import DOMPurifySingleton from 'dompurify'
import { sanitizeSvg } from '../sanitizeSvg.js'

describe('sanitizeSvg', () => {
  it('preserves benign SVG content', () => {
    const out = sanitizeSvg(
      `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="red" /><path d="M0 0L10 10" /></svg>`
    )
    expect(out).toMatch(/<circle\b[^>]*cx="50"/)
    expect(out).toMatch(/fill="red"/)
    expect(out).toMatch(/<path\b[^>]*d="M0 0L10 10"/)
  })

  it('strips <script> blocks with content', () => {
    const out = sanitizeSvg(
      `<svg><circle/><script>alert(1)</script><rect/></svg>`
    )
    expect(out).not.toMatch(/<script/i)
    expect(out).not.toContain('alert(1)')
    expect(out).toMatch(/<circle\b/)
    expect(out).toMatch(/<rect\b/)
  })

  it('strips self-closing/empty <script> tags', () => {
    expect(sanitizeSvg(`<svg><a/><script src="x"/></svg>`)).not.toMatch(
      /<script/i
    )
    expect(sanitizeSvg(`<svg><a/><script src="x"></svg>`)).not.toMatch(
      /<script/i
    )
  })

  it('is case-insensitive for <script>', () => {
    expect(sanitizeSvg(`<svg><SCRIPT>alert(1)</SCRIPT></svg>`)).not.toMatch(
      /script/i
    )
    expect(sanitizeSvg(`<svg><ScRiPt>alert(1)</sCrIpT></svg>`)).not.toMatch(
      /script/i
    )
  })

  it('strips <foreignObject> blocks', () => {
    const out = sanitizeSvg(
      `<svg><foreignObject><div onclick="alert(1)">x</div></foreignObject><rect/></svg>`
    )
    expect(out).not.toMatch(/foreignObject/i)
    expect(out).not.toContain('onclick')
    expect(out).not.toContain('alert(1)')
    expect(out).toMatch(/<rect\b/)
  })

  it('strips on* event-handler attributes', () => {
    const out1 = sanitizeSvg(`<svg><circle onload="alert(1)" cx="0"/></svg>`)
    expect(out1).not.toMatch(/\bonload\b/i)
    expect(out1).toMatch(/cx="0"/)

    const out2 = sanitizeSvg(`<svg><circle onclick='alert(1)' cx="0"/></svg>`)
    expect(out2).not.toMatch(/\bonclick\b/i)
    expect(out2).toMatch(/cx="0"/)

    const out3 = sanitizeSvg(`<svg><circle ONMOUSEOVER=alert(1) cx="0"/></svg>`)
    expect(out3).not.toMatch(/onmouseover/i)
    expect(out3).toMatch(/cx="0"/)
  })

  it('strips on* event-handler attributes from outer <svg>', () => {
    const out = sanitizeSvg(
      `<svg onload="window.__pwn=1" viewBox="0 0 24 24"><circle/></svg>`
    )
    expect(out).not.toMatch(/\bonload\b/i)
    expect(out).toMatch(/viewBox="0 0 24 24"/)
  })

  it('strips javascript: in href', () => {
    const out = sanitizeSvg(
      `<svg><a href="javascript:alert(1)"><circle/></a></svg>`
    )
    expect(out).not.toContain('javascript:')
    expect(out).not.toMatch(/\bhref=/i)
    expect(out).toMatch(/<circle\b/)
  })

  it('strips javascript: with embedded control characters', () => {
    const out = sanitizeSvg(
      `<svg><a href="java\tscript:alert(1)"><circle/></a></svg>`
    )
    expect(out).not.toMatch(/java\s*script\s*:/i)
    expect(out).not.toMatch(/\bhref=/i)
  })

  it('strips data: and vbscript: in href', () => {
    const out1 = sanitizeSvg(
      `<svg><a href="data:text/html,<script>alert(1)</script>"/></svg>`
    )
    expect(out1).not.toContain('data:')
    expect(out1).not.toMatch(/<script/i)

    const out2 = sanitizeSvg(`<svg><a href="vbscript:msgbox(1)"/></svg>`)
    expect(out2).not.toContain('vbscript:')
    expect(out2).not.toMatch(/\bhref=/i)
  })

  it('preserves safe href values', () => {
    const out = sanitizeSvg(
      `<svg><a href="https://example.com"><circle/></a></svg>`
    )
    expect(out).toMatch(/href="https:\/\/example\.com"/)
    expect(out).toMatch(/<circle\b/)
  })

  it('handles empty and non-string input', () => {
    expect(sanitizeSvg('')).toBe('')
    // @ts-expect-error - testing runtime safety
    expect(sanitizeSvg(undefined)).toBeUndefined()
  })

  describe('global DOMPurify singleton isolation', () => {
    afterEach(() => {
      DOMPurifySingleton.clearConfig()
    })

    it('sanitizes correctly when the global singleton is restricted via setConfig', () => {
      DOMPurifySingleton.setConfig({ USE_PROFILES: { html: true } })

      const out = sanitizeSvg(
        `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="red" /></svg>`
      )

      expect(out).toMatch(/<circle\b[^>]*cx="50"/)
      expect(out).toMatch(/fill="red"/)
    })

    it('does not mutate the global singleton config', () => {
      sanitizeSvg(`<svg><circle cx="0"/></svg>`)

      const out = DOMPurifySingleton.sanitize('<p>text</p><h2>heading</h2>')

      expect(out).toContain('<p>')
      expect(out).toContain('<h2>')
    })

    it('does not install its <use> fragment-only hook on the global singleton', () => {
      // Our fragment-only <use> rule is a hook on our instance.
      // The singleton must be unaffected, keeping non-fragment hrefs.
      sanitizeSvg(`<svg><use href="#icon"/></svg>`, { allowUseElement: true })

      const out = DOMPurifySingleton.sanitize(
        `<svg><use href="https://example.com/icons.svg#icon"/></svg>`,
        {
          USE_PROFILES: { svg: true },
          ADD_TAGS: ['use'],
          ADD_ATTR: ['href']
        }
      )

      expect(out).toMatch(/href="https:\/\/example\.com\/icons\.svg#icon"/)
    })
  })

  describe('allowUseElement option', () => {
    it('strips <use> elements by default', () => {
      const out = sanitizeSvg(
        `<svg><defs><path id="icon" d="M0 0L10 10"/></defs><use xlink:href="#icon"/></svg>`
      )
      expect(out).not.toMatch(/<use\b/i)
      expect(out).toMatch(/<path\b/)
    })

    it('allows <use> with fragment reference when allowUseElement is true', () => {
      const out = sanitizeSvg(
        `<svg><defs><path id="icon" d="M0 0L10 10"/></defs><use xlink:href="#icon"/></svg>`,
        { allowUseElement: true }
      )
      expect(out).toMatch(/<use\b/)
      expect(out).toMatch(/xlink:href="#icon"/)
      expect(out).toMatch(/<path\b/)
    })

    it('allows href attribute when allowUseElement is true', () => {
      const out = sanitizeSvg(
        `<svg><defs><path id="icon" d="M0 0"/></defs><use href="#icon"/></svg>`,
        { allowUseElement: true }
      )
      expect(out).toMatch(/<use\b/)
      expect(out).toMatch(/href="#icon"/)
    })

    it('strips external URLs from href even when allowUseElement is true', () => {
      const out = sanitizeSvg(
        `<svg><use href="https://example.com/icons.svg#icon"/></svg>`,
        { allowUseElement: true }
      )
      // Fragment reference with external URL should be stripped
      expect(out).not.toMatch(/href="https:/)
    })

    it('strips data: URIs from href when allowUseElement is true', () => {
      const out = sanitizeSvg(
        `<svg><use href="data:image/svg+xml,<svg>..."/></svg>`,
        { allowUseElement: true }
      )
      expect(out).not.toMatch(/href="data:/)
      // <use> tag remains without href (safe but useless)
      expect(out).toMatch(/<use\b/)
    })

    it('strips javascript: scheme from href when allowUseElement is true', () => {
      const out = sanitizeSvg(`<svg><use href="javascript:alert(1)"/></svg>`, {
        allowUseElement: true
      })
      expect(out).not.toMatch(/javascript:/)
      // <use> tag remains without href (safe but useless)
      expect(out).toMatch(/<use\b/)
    })

    it('preserves multiple <use> elements with fragment refs when allowUseElement is true', () => {
      const out = sanitizeSvg(
        `<svg><defs><symbol id="a"/><symbol id="b"/></defs><use xlink:href="#a"/><use xlink:href="#b"/></svg>`,
        { allowUseElement: true }
      )
      expect(out).toMatch(/xlink:href="#a"/)
      expect(out).toMatch(/xlink:href="#b"/)
      const useCount = (out.match(/<use\b/g) || []).length
      expect(useCount).toBe(2)
    })

    it('preserves non-URI attributes everywhere when allowUseElement is true', () => {
      const out = sanitizeSvg(
        `<svg viewBox="0 0 120 40"><defs><circle id="dot" cx="20" cy="20" r="18"/></defs><use href="#dot" x="40" fill="red"/></svg>`,
        { allowUseElement: true }
      )
      expect(out).toMatch(/viewBox="0 0 120 40"/)
      expect(out).toMatch(/<circle\b[^>]*cx="20"[^>]*cy="20"[^>]*r="18"/)
      expect(out).toMatch(/<use\b[^>]*x="40"/)
      expect(out).toMatch(/<use\b[^>]*fill="red"/)
    })

    it('preserves valid SVG attributes on <use> elements when allowUseElement is true', () => {
      const out = sanitizeSvg(
        `<svg><defs><path id="icon"/></defs><use xlink:href="#icon" class="my-icon"/></svg>`,
        { allowUseElement: true }
      )
      expect(out).toMatch(/xlink:href="#icon"/)
      // <use> tag is rendered with the fragment reference
      expect(out).toMatch(/<use\b/)
    })
  })
})
