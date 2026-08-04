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

import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { describe, it, expect } from 'vitest'
import { isVisible } from '../isVisible.js'

describe('isVisible', () => {
  it('should recognize visible elements', async () => {
    await render(<div data-testid="test">Hello world!</div>)
    const element = page.getByTestId('test').element()

    expect(isVisible(element)).toBe(true)
  })

  it('should recognize elements with display: none', async () => {
    await render(
      <div data-testid="test">
        <span style={{ display: 'none' }}>Hello world!</span>
      </div>
    )
    const element = page.getByTestId('test').element().firstChild

    expect(isVisible(element)).toBe(false)
  })

  it('should recognize elements hidden with clip', async () => {
    const style: React.CSSProperties = {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0,0,0,0)'
    }
    await render(
      <div data-testid="test">
        <span style={style}>Hello world!</span>
      </div>
    )
    const element = page.getByTestId('test').element().firstChild

    expect(isVisible(element)).toBe(false)
  })

  it('should recognize clipped elements that are not hidden', async () => {
    const style: React.CSSProperties = {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0,0,10px,0)'
    }
    await render(
      <div data-testid="test">
        <span style={style}>Hello world!</span>
      </div>
    )
    const element = page.getByTestId('test').element().firstChild

    expect(isVisible(element)).toBe(true)
  })

  it('should recursively check parent visibility', async () => {
    const style: React.CSSProperties = { visibility: 'hidden' }
    await render(
      <div data-testid="test" style={style}>
        <span>
          <span data-testid="test-2" style={{ visibility: 'visible' }}>
            Hello world!
          </span>
        </span>
      </div>
    )
    const element = page.getByTestId('test-2').element()

    expect(isVisible(element, false)).toBe(true)
    expect(isVisible(element)).toBe(false)
  })

  it('should not recursively check text nodes', async () => {
    const style: React.CSSProperties = { visibility: 'hidden' }
    await render(
      <div data-testid="test" style={style}>
        <span>
          <span data-testid="test-2" style={{ visibility: 'visible' }}>
            Hello world!
          </span>
        </span>
      </div>
    )
    const element = page.getByTestId('test-2').element().firstChild

    expect(isVisible(element, false)).toBe(true)
    expect(isVisible(element)).toBe(false)
  })
})
