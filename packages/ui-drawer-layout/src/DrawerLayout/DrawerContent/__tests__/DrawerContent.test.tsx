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

import { render, screen, act } from '@testing-library/react'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

import { DrawerContent } from '../index'

describe('<DrawerContent />', () => {
  it('should render', async () => {
    render(<DrawerContent label="DrawerContentTest">Hello World</DrawerContent>)
    const drawerContent = screen.getByLabelText('DrawerContentTest')

    expect(drawerContent).toBeInTheDocument()
    expect(drawerContent).toHaveTextContent('Hello World')
  })

  it('should call the content ref', async () => {
    const contentRef = vi.fn()
    render(
      <DrawerContent label="DrawerContentTest" contentRef={contentRef}>
        Hello World
      </DrawerContent>
    )
    const drawerContent = screen.getByLabelText('DrawerContentTest')

    expect(contentRef).toHaveBeenCalledWith(drawerContent)
  })

  it('should not transition on mount, just on update', () => {
    vi.useFakeTimers()
    const { rerender } = render(
      <DrawerContent label="DrawerContentTest">Hello World</DrawerContent>
    )
    const drawerContent = screen.getByLabelText('DrawerContentTest')

    const styleOnMount = getComputedStyle(drawerContent)
    expect(styleOnMount.transition).toBe('')

    rerender(<DrawerContent label="test">Hello World</DrawerContent>)
    act(() => {
      vi.runAllTimers()
    })

    const drawerContentUpdated = screen.getByLabelText('test')
    const updatedStyle = getComputedStyle(drawerContentUpdated)

    expect(updatedStyle.transition).not.toBe('')

    vi.useRealTimers()
  })
})
