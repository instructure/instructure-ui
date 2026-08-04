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
import { describe, it, expect, vi } from 'vitest'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { colorToRGB, colorToHex8 } from '@instructure/ui-color-utils'
import { ColorIndicator } from '@instructure/ui-color-picker/latest'

const colorTestCases = {
  '3 digit hex': '#069',
  '6 digit hex': '#01659a',
  rgb: 'rgb(100, 0, 200)',
  rgba: 'rgba(100, 0, 200, .5)',
  named: 'white',
  hsl: 'hsl(30, 100%, 50%)',
  hsla: 'hsla(30, 100%, 50%, .35)'
}

describe('<ColorIndicator />', () => {
  describe('elementRef prop', () => {
    it('should provide ref', async () => {
      const elementRef = vi.fn()
      const { container } = await render(
        <ColorIndicator elementRef={elementRef} />
      )

      expect(elementRef).toHaveBeenCalledWith(container.firstChild)
    })
  })

  describe('should be accessible', () => {
    it('a11y', async () => {
      const { container } = await render(<ColorIndicator />)
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })
  })

  it('should display empty by default', async () => {
    const { container } = await render(<ColorIndicator />)
    const indicator = container.querySelector('div[class$="-colorIndicator"]')!

    expect(indicator).toBeInTheDocument()
    expect(getComputedStyle(indicator).boxShadow).toBe('none')
  })

  Object.entries(colorTestCases).forEach(([testCase, testColor]) => {
    it(`should display ${testCase} color`, async () => {
      const expectedColor = colorToRGB(testColor)
      const { container } = await render(<ColorIndicator color={testColor} />)
      const indicator = container.querySelector(
        'div[class$="-colorIndicator"]'
      )!

      expect(indicator).toBeInTheDocument()

      const boxShadow = getComputedStyle(indicator).boxShadow
      const colorValue = boxShadow.split(')')[0] + ')'

      expect(colorToRGB(colorValue)).toEqual(expectedColor)
    })
  })

  // needs to be checked separately, the alpha is rounded different
  it('should display 8 digit hexa color', async () => {
    const testColor = '#06AD8580'
    const expectedColor = colorToHex8(testColor)
    const { container } = await render(<ColorIndicator color={testColor} />)
    const indicator = container.querySelector('div[class$="-colorIndicator"]')!

    expect(indicator).toBeInTheDocument()

    const boxShadow = getComputedStyle(indicator).boxShadow
    const colorValue = boxShadow.split(')')[0] + ')'

    expect(colorToHex8(colorValue)).toEqual(expectedColor)
  })

  it('should display circle by default', async () => {
    const { container } = await render(<ColorIndicator />)
    const indicator = container.querySelector('div[class$="-colorIndicator"]')!
    const { borderRadius, width, height } = getComputedStyle(indicator)

    expect(width).toEqual(height)
    expect(borderRadius).toEqual(width)
  })

  it('should display rectangle version', async () => {
    const { container } = await render(<ColorIndicator shape="rectangle" />)
    const indicator = container.querySelector('div[class$="-colorIndicator"]')!
    const { borderRadius, width, height } = getComputedStyle(indicator)

    expect(width).toEqual(height)
    expect(borderRadius).toEqual('6px')
  })
})
