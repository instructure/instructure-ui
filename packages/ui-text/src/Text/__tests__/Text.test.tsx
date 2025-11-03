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

import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { Text } from '../index'

describe('<Text />', () => {
  it('should render', async () => {
    const { container } = render(<Text />)
    const text = container.querySelector("span[class$='-text']")

    expect(text).toBeInTheDocument()
  })

  it('should meet a11y standards', async () => {
    const { container } = render(<Text />)
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  it('should render with the specified tag when `as` prop is set', async () => {
    const { container } = render(<Text as="li" />)
    const text = container.querySelector("[class$='-text']")

    expect(text?.tagName).toBe('LI')
  })

  describe('margin prop', () => {
    it('should apply margin with custom CSS value and with tokens', () => {
      const { getByTestId } = render(
        <div>
          <Text margin="30px" data-testid="text-custom">
            test1
          </Text>
          <Text margin="large" data-testid="text-large">
            test2
          </Text>
          <Text margin="space4" data-testid="text-space">
            test3
          </Text>
          <Text margin="small 20px" data-testid="text-mixed">
            test4
          </Text>
        </div>
      )
      const textCustom = getByTestId('text-custom')
      const textCustomStyle = window.getComputedStyle(textCustom)
      const textLarge = getByTestId('text-large')
      const textLargeStyle = window.getComputedStyle(textLarge)
      const textSpace = getByTestId('text-space')
      const textSpaceStyle = window.getComputedStyle(textSpace)
      const textMixed = getByTestId('text-mixed')
      const textMixedStyle = window.getComputedStyle(textMixed)

      expect(textCustomStyle.margin).toBe('30px')
      expect(textLargeStyle.margin).toBe('2.25rem')
      expect(textSpaceStyle.margin).toBe('0.25rem')
      expect(textMixedStyle.margin).toBe('0.75rem 20px')
    })
  })
})
