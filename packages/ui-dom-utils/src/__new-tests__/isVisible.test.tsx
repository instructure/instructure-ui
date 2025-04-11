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

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { isVisible } from '../isVisible'

describe('isVisible', () => {
  it('should recognize visible elements', () => {
    render(<div data-testid="test">Hello world!</div>)
    const element = screen.getByTestId('test')

    expect(isVisible(element)).toBe(true)
  })

  it('should recognize elements with display: none', () => {
    render(
      <div data-testid="test">
        <span style={{ display: 'none' }}>Hello world!</span>
      </div>
    )
    const element = screen.getByTestId('test').firstChild

    expect(isVisible(element)).toBe(false)
  })

  it('should recognize elements hidden with clip', () => {
    const style: React.CSSProperties = {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0,0,0,0)'
    }
    render(
      <div data-testid="test">
        <span style={style}>Hello world!</span>
      </div>
    )
    const element = screen.getByTestId('test').firstChild

    expect(isVisible(element)).toBe(false)
  })

  it('should recognize clipped elements that are not hidden', () => {
    const style: React.CSSProperties = {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0,0,10px,0)'
    }
    render(
      <div data-testid="test">
        <span style={style}>Hello world!</span>
      </div>
    )
    const element = screen.getByTestId('test').firstChild

    expect(isVisible(element)).toBe(true)
  })

  it('should recursively check parent visibility', () => {
    const style: React.CSSProperties = { visibility: 'hidden' }
    render(
      <div data-testid="test" style={style}>
        <span>
          <span data-testid="test-2" style={{ visibility: 'visible' }}>
            Hello world!
          </span>
        </span>
      </div>
    )
    const element = screen.getByTestId('test-2')

    expect(isVisible(element, false)).toBe(true)
    expect(isVisible(element)).toBe(false)
  })

  it('should not recursively check text nodes', () => {
    const style: React.CSSProperties = { visibility: 'hidden' }
    render(
      <div data-testid="test" style={style}>
        <span>
          <span data-testid="test-2" style={{ visibility: 'visible' }}>
            Hello world!
          </span>
        </span>
      </div>
    )
    const element = screen.getByTestId('test-2').firstChild

    expect(isVisible(element, false)).toBe(true)
    expect(isVisible(element)).toBe(false)
  })
})
