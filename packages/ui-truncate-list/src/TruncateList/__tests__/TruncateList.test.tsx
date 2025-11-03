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

import { render, act } from '@testing-library/react'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { TruncateList } from '../index'

describe('<TruncateList />', () => {
  it('should return ref with elementRef prop', () => {
    vi.useFakeTimers()
    const elementRef = vi.fn()

    const { container } = render(
      <TruncateList elementRef={elementRef}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </TruncateList>
    )
    const list = container.querySelector('ul[class$="-truncateList"]')

    act(() => {
      vi.runAllTimers()
    })

    expect(elementRef).toHaveBeenCalledWith(list)

    vi.useRealTimers()
  })

  it('should render <ul> and <li> items', async () => {
    const { container } = render(
      <TruncateList>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </TruncateList>
    )
    const list = container.querySelector('[class$="-truncateList"]')
    const items = container.querySelectorAll(
      '[class$="truncateList__listItem"]'
    )

    expect(list).toBeInTheDocument()
    expect(list?.tagName).toBe('UL')
    expect(items.length).toBe(3)

    items.forEach((item) => {
      expect(item.tagName).toBe('LI')
    })
  })

  it('should render only `visibleItemsCount` items', async () => {
    const { container } = render(
      <TruncateList visibleItemsCount={2}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </TruncateList>
    )
    const list = container.querySelector('ul[class$="-truncateList"]')
    const items = container.querySelectorAll(
      '[class$="truncateList__listItem"]'
    )

    expect(items.length).toBe(2)
    expect(list).not.toHaveTextContent('Item 3')
  })

  describe('renderHiddenItemMenu', () => {
    it('should render element', async () => {
      const { container } = render(
        <TruncateList
          visibleItemsCount={2}
          renderHiddenItemMenu={() => <div id="trigger">trigger label</div>}
        >
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
          <div>Item 3</div>
        </TruncateList>
      )
      const trigger = container.querySelector('[id="trigger"]')

      expect(trigger).toHaveTextContent('trigger label')
    })
  })

  describe('should be accessible', () => {
    it('a11y', async () => {
      const { container } = render(<TruncateList />)
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })
  })
})
