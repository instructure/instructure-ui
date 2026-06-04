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
import { sanitizeSvg } from '../sanitizeSvg'

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
  })
})
