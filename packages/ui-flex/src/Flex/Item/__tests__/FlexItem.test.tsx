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

import { render, waitFor } from '@testing-library/react'
import { vi } from 'vitest'

import '@testing-library/jest-dom'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { Item } from '../index'

describe('<Item />', () => {
  it('should render children', async () => {
    const { container } = render(<Item>Flex item 1</Item>)
    const item = container.querySelector('[class*="-flexItem"]')

    expect(item).toBeInTheDocument()
    expect(item).toHaveTextContent('Flex item 1')
  })

  it('should support an elementRef prop', async () => {
    const elementRef = vi.fn()

    const { container } = render(
      <Item elementRef={elementRef}>Flex item 2</Item>
    )
    const item = container.querySelector('[class*="-flexItem"]')

    await waitFor(() => {
      expect(elementRef).toHaveBeenCalledWith(item)
    })
  })

  it('should meet a11y standards', async () => {
    const { container } = render(<Item>Flex item 3</Item>)
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })
})
