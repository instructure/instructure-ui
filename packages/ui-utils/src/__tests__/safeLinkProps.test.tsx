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
import { safeLinkProps } from '../safeLinkProps'

describe('safeLinkProps', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  it('strips unsafe href schemes', () => {
    const out = safeLinkProps({
      href: 'javascript:alert(1)',
      tag: 'a',
      attr: 'href'
    })
    expect(out.href).toBeUndefined()
  })

  it('passes safe href schemes through', () => {
    const out = safeLinkProps({
      href: 'https://example.com',
      tag: 'a',
      attr: 'href'
    })
    expect(out.href).toBe('https://example.com')
  })

  it('supplies default rel for target=_blank', () => {
    const out = safeLinkProps({
      href: 'https://example.com',
      target: '_blank',
      tag: 'a',
      attr: 'href'
    })
    expect(out.rel).toBe('noopener noreferrer')
  })

  it('does not override consumer-supplied rel', () => {
    const out = safeLinkProps({
      href: 'https://example.com',
      target: '_blank',
      rel: 'external',
      tag: 'a',
      attr: 'href'
    })
    expect(out.rel).toBe('external')
  })

  it('does not add rel when target is not _blank', () => {
    const out = safeLinkProps({
      href: 'https://example.com',
      tag: 'a',
      attr: 'href'
    })
    expect(out.rel).toBeUndefined()
  })

  it('passes through target unchanged', () => {
    const out = safeLinkProps({
      href: 'https://example.com',
      target: '_self',
      tag: 'a',
      attr: 'href'
    })
    expect(out.target).toBe('_self')
  })
})
