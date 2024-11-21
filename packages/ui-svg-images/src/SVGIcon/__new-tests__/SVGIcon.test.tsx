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

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

// eslint-disable-next-line no-restricted-imports
import { generateA11yTests } from '@instructure/ui-scripts/lib/test/generateA11yTests'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { SVGIcon } from '../index'
import SVGIconExamples from '../__examples__/SVGIcon.examples'

const SVG_SRC = `<svg><circle cx="50" cy="50" r="40" /></svg>`

describe('<SVGIcon />', () => {
  it('should render', async () => {
    const { container } = render(<SVGIcon src={SVG_SRC} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
  })

  it('should set rotate to 0 by default', async () => {
    const { container } = render(<SVGIcon src={SVG_SRC} />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('rotate', '0')
  })

  it('should allow rotate prop to be overridden', async () => {
    const { container } = render(<SVGIcon rotate="90" src={SVG_SRC} />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('rotate', '90')
  })

  it('should set size', async () => {
    const { container, rerender } = render(
      <SVGIcon size="large" src={SVG_SRC} />
    )
    const svg = container.querySelector('svg')
    const largeFontSize = window.getComputedStyle(svg!).fontSize

    // set prop: size
    rerender(<SVGIcon size="small" src={SVG_SRC} />)
    const svgUpdated = container.querySelector('svg')
    const smallFontSize = window.getComputedStyle(svgUpdated!).fontSize

    expect(smallFontSize).not.toEqual(largeFontSize)
  })

  describe('with generated examples', () => {
    it('should be accessible', async () => {
      const { container } = render(<SVGIcon src={SVG_SRC} />)
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })

    const generatedComponents = generateA11yTests(SVGIcon, SVGIconExamples)
    it.each(generatedComponents)(
      'should be accessible with example: $description',
      async ({ content }) => {
        const { container } = render(content)
        const axeCheck = await runAxeCheck(container)
        expect(axeCheck).toBe(true)
      }
    )
  })
})
