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
import { getCSSStyleDeclaration } from '../getCSSStyleDeclaration'

describe('getCSSStyleDeclaration', () => {
  it('returns a CSSStyleDeclaration for a valid element with correct CSS values', () => {
    const div = document.createElement('div')
    div.style.width = '100px'
    div.style.height = '50px'
    div.style.display = 'flex'
    div.style.position = 'absolute'

    document.body.appendChild(div)

    const style = getCSSStyleDeclaration(div)
    expect(style).toBeInstanceOf(CSSStyleDeclaration)

    expect(style!.width).toBe('100px')
    expect(style!.height).toBe('50px')
    expect(style!.display).toBe('flex')
    expect(style!.position).toBe('absolute')

    document.body.removeChild(div)
  })

  it('returns undefined for undefined or null element', () => {
    expect(getCSSStyleDeclaration(undefined)).toBeUndefined()
    expect(getCSSStyleDeclaration(null)).toBeUndefined()
  })

  it('returns undefined for an iframe with cross-origin content', () => {
    const originalGetComputedStyle = window.getComputedStyle

    const iframe = document.createElement('iframe')
    document.body.appendChild(iframe)

    // In real browsers, accessing cross-origin iframe content throws SecurityError
    // and prevents reading computed styles from documents with different origins
    // We simulate this by mocking getComputedStyle to throw a DOMException
    window.getComputedStyle = vi.fn((element, pseudoElt) => {
      if (element === iframe) {
        throw new DOMException(
          'Blocked a frame with origin from accessing a cross-origin frame',
          'SecurityError'
        )
      }
      return originalGetComputedStyle(element, pseudoElt)
    })

    const style = getCSSStyleDeclaration(iframe)
    expect(style).toBeUndefined()
    expect(window.getComputedStyle).toHaveBeenCalled()

    window.getComputedStyle = originalGetComputedStyle
    document.body.removeChild(iframe)
  })
})
