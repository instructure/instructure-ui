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
import { describe, it, expect } from 'vitest'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { Text } from '@instructure/ui-text/latest'

describe('<Text />', () => {
  it('should render', async () => {
    const { container } = await render(<Text />)
    const text = container.querySelector("span[class$='-text']")

    expect(text).toBeInTheDocument()
  })

  it('should meet a11y standards', async () => {
    const { container } = await render(<Text />)
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  it('should render with the specified tag when `as` prop is set', async () => {
    const { container } = await render(<Text as="li" />)
    const text = container.querySelector("[class$='-text']")

    expect(text?.tagName).toBe('LI')
  })

  describe('margin prop', () => {
    it('resolves spacing tokens and custom CSS values', async () => {
      const { container } = await render(
        <div>
          <Text margin="general.spaceMd">A</Text>
          <Text margin="30px">B</Text>
        </div>
      )
      const texts = container.querySelectorAll("[class$='-text']")

      // Text renders inline, so horizontal margins apply; general.spaceMd = 0.75rem = 12px
      expect(getComputedStyle(texts[0]!).marginLeft).toBe('12px')
      expect(getComputedStyle(texts[1]!).marginLeft).toBe('30px')
    })
  })
})
