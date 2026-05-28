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
import { vi } from 'vitest'
import { safeHref } from '../safeHref'

describe('safeHref', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  it('passes through http and https URLs', () => {
    expect(safeHref('http://example.com', 'a', 'href')).toBe(
      'http://example.com'
    )
    expect(safeHref('https://example.com/path?q=1', 'a', 'href')).toBe(
      'https://example.com/path?q=1'
    )
  })

  it('passes through mailto, tel, ftp', () => {
    expect(safeHref('mailto:a@b.com', 'a', 'href')).toBe('mailto:a@b.com')
    expect(safeHref('tel:+15551234', 'a', 'href')).toBe('tel:+15551234')
    expect(safeHref('ftp://example.com', 'a', 'href')).toBe('ftp://example.com')
  })

  it('passes through webcal: URLs for calendar subscriptions', () => {
    expect(safeHref('webcal://example.com/cal.ics', 'a', 'href')).toBe(
      'webcal://example.com/cal.ics'
    )
    expect(safeHref('WEBCAL://example.com/cal.ics', 'a', 'href')).toBe(
      'WEBCAL://example.com/cal.ics'
    )
    expect(consoleErrorSpy).not.toHaveBeenCalled()
  })

  it('passes through additional safe schemes', () => {
    expect(safeHref('sms:+15551234', 'a', 'href')).toBe('sms:+15551234')
    expect(safeHref('callto:+15551234', 'a', 'href')).toBe('callto:+15551234')
    expect(safeHref('xmpp:user@example.com', 'a', 'href')).toBe(
      'xmpp:user@example.com'
    )
    expect(safeHref('cid:image-123', 'img', 'src')).toBe('cid:image-123')
    expect(safeHref('ftps://example.com', 'a', 'href')).toBe(
      'ftps://example.com'
    )
    expect(safeHref('feed:https://example.com/rss.xml', 'a', 'href')).toBe(
      'feed:https://example.com/rss.xml'
    )
    expect(safeHref('geo:37.786971,-122.399677', 'a', 'href')).toBe(
      'geo:37.786971,-122.399677'
    )
    expect(consoleErrorSpy).not.toHaveBeenCalled()
  })

  it('passes through anchors, root-relative, and query-only refs', () => {
    expect(safeHref('#section', 'a', 'href')).toBe('#section')
    expect(safeHref('/foo/bar', 'a', 'href')).toBe('/foo/bar')
    expect(safeHref('?q=1', 'a', 'href')).toBe('?q=1')
    expect(safeHref('foo/bar', 'a', 'href')).toBe('foo/bar')
    expect(safeHref('./relative', 'a', 'href')).toBe('./relative')
  })

  it('blocks javascript: URLs', () => {
    expect(safeHref('javascript:alert(1)', 'a', 'href')).toBeUndefined()
    expect(safeHref('JAVASCRIPT:alert(1)', 'a', 'href')).toBeUndefined()
    expect(safeHref('  javascript:alert(1)', 'a', 'href')).toBeUndefined()
    expect(consoleErrorSpy).toHaveBeenCalled()
  })

  it('blocks javascript: URLs with embedded control characters', () => {
    expect(safeHref('java\tscript:alert(1)', 'a', 'href')).toBeUndefined()
    expect(safeHref('java\nscript:alert(1)', 'a', 'href')).toBeUndefined()
  })

  it('blocks data: and vbscript: URLs', () => {
    expect(
      safeHref('data:text/html,<script>alert(1)</script>', 'a', 'href')
    ).toBeUndefined()
    expect(safeHref('vbscript:msgbox(1)', 'a', 'href')).toBeUndefined()
  })

  it('handles null, undefined, and empty values', () => {
    expect(safeHref(undefined, 'a', 'href')).toBeUndefined()
    expect(safeHref(null, 'a', 'href')).toBeUndefined()
    expect(safeHref('', 'a', 'href')).toBe('')
  })

  it('allows data: URIs for image sources, blocks them for anchor hrefs', () => {
    const dataImg = 'data:image/png;base64,iVBORw0KGgo='
    expect(safeHref(dataImg, 'img', 'src')).toBe(dataImg)
    expect(safeHref(dataImg, 'a', 'href')).toBeUndefined()
  })

  it('blocks javascript: regardless of (tag, attr)', () => {
    expect(safeHref('javascript:alert(1)', 'img', 'src')).toBeUndefined()
    expect(safeHref('javascript:alert(1)', 'a', 'href')).toBeUndefined()
    expect(safeHref('javascript:alert(1)', 'form', 'action')).toBeUndefined()
  })
})
