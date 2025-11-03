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

import { render, fireEvent, act } from '@testing-library/react'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

import { Mask } from '../index'

describe('<Mask />', () => {
  let originalScroll: any

  beforeAll(() => {
    // Mocking window.scroll to prevent test output pollution
    originalScroll = window.scroll
    Object.defineProperty(window, 'scroll', {
      value: vi.fn(),
      writable: true
    })
  })

  afterAll(() => {
    window.scroll = originalScroll
  })

  it('should render', () => {
    render(<Mask />)

    const mask = document.querySelector("span[class$='-mask']")

    expect(mask).toBeInTheDocument()
  })

  it('should have tabIndex -1 when onClick is provided', () => {
    const onClick = vi.fn()

    render(<Mask onClick={onClick} />)
    const mask = document.querySelector("span[class$='-mask']")

    expect(mask).toHaveAttribute('tabindex', '-1')
  })

  it('should call onClick prop when clicked', () => {
    vi.useFakeTimers()
    const onClick = vi.fn()

    render(<Mask onClick={onClick} />)

    const mask = document.querySelector("span[class$='-mask']")

    fireEvent.click(mask!, { button: 0, detail: 1 })
    act(() => {
      vi.runAllTimers()
    })

    expect(onClick).toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('should apply fullscreen CSS when prop is true', () => {
    render(<Mask fullscreen />)
    const mask = document.querySelector("span[class$='-mask']")

    expect(mask).toHaveStyle('position: fixed')
  })

  it('should provide an elementRef', async () => {
    const elementRef = vi.fn()

    render(<Mask elementRef={elementRef} />)
    const mask = document.querySelector("span[class$='-mask']")

    expect(elementRef).toHaveBeenCalledWith(mask)
  })
})
