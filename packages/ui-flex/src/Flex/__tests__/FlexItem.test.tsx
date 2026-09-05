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
import { describe, it, expect, vi } from 'vitest'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { Flex, FlexItem as Item } from '@instructure/ui-flex/latest'

describe('<Item />', () => {
  it('should render children', async () => {
    const { container } = await render(<Item>Flex item 1</Item>)
    const item = container.querySelector('[class*="-flexItem"]')

    expect(item).toBeInTheDocument()
    expect(item).toMatchTextContent('Flex item 1')
  })

  it('should support an elementRef prop', async () => {
    const elementRef = vi.fn()

    const { container } = await render(
      <Item elementRef={elementRef}>Flex item 2</Item>
    )
    const item = container.querySelector('[class*="-flexItem"]')

    await vi.waitFor(() => {
      expect(elementRef).toHaveBeenCalledWith(item)
    })
  })

  it('should meet a11y standards', async () => {
    const { container } = await render(<Item>Flex item 3</Item>)
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  describe('order prop', () => {
    it('should apply `order` CSS when passed', async () => {
      await render(<Item order={2}>Item with order</Item>)
      const item = page.getByText('Item with order').element()
      expect(item).toHaveStyle('order: 2')
    })

    it('should not apply `order` CSS when prop is undefined', async () => {
      await render(<Item>Item without order</Item>)
      const item = page.getByText('Item without order').element()
      expect(getComputedStyle(item).order).toBe('0')
    })
  })

  describe('Component tests', () => {
    it('visually reorders items when order prop is set', async () => {
      await render(
        <Flex data-testid="flex-container-default">
          <Item data-testid="item-1-default">FOO</Item>
          <Item data-testid="item-2-default">BOO</Item>
        </Flex>
      )
      const firstRect = page
        .getByTestId('item-1-default')
        .element()
        .getBoundingClientRect()
      const secondRect = page
        .getByTestId('item-2-default')
        .element()
        .getBoundingClientRect()

      expect(firstRect.left).toBeLessThan(secondRect.left)

      // set order prop
      await render(
        <Flex data-testid="flex-container-ordered">
          <Item order={2} data-testid="item-1-ordered">
            FOO
          </Item>
          <Item order={1} data-testid="item-2-ordered">
            BOO
          </Item>
        </Flex>
      )
      const firstOrderedRect = page
        .getByTestId('item-1-ordered')
        .element()
        .getBoundingClientRect()
      const secondOrderedRect = page
        .getByTestId('item-2-ordered')
        .element()
        .getBoundingClientRect()

      expect(secondOrderedRect.left).toBeLessThan(firstOrderedRect.left)
    })
  })
})
