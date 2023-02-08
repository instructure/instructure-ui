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
import {
  expect,
  generateA11yTests,
  mount,
  stub
} from '@instructure/ui-test-utils'
import { colorToHex8, colorToRGB } from '@instructure/ui-color-utils'

import { ColorIndicator } from '../'
import { ColorIndicatorLocator } from '../ColorIndicatorLocator'
import ColorIndicatorExamples from '../__examples__/ColorIndicator.examples'

describe('<ColorIndicator />', () => {
  describe('color prop', () => {
    it('should display empty by default', async () => {
      await mount(<ColorIndicator />)

      const indicator = await ColorIndicatorLocator.find()
      const currentColor = indicator.getColorRGBA()

      expect(currentColor).to.equal('none')
    })

    const colorTestCases = {
      '3 digit hex': '#069',
      '6 digit hex': '#01659a',
      rgb: 'rgb(100, 0, 200)',
      rgba: 'rgba(100, 0, 200, .5)',
      named: 'white',
      hsl: 'hsl(30, 100%, 50%)',
      hsla: 'hsla(30, 100%, 50%, .35)'
    }

    Object.entries(colorTestCases).forEach(([testCase, color]) => {
      it(`should display ${testCase} color`, async () => {
        await mount(<ColorIndicator color={color} />)

        const indicator = await ColorIndicatorLocator.find()
        const currentColor = indicator.getColorRGBA()

        expect(currentColor).to.eql(colorToRGB(color))
      })
    })

    // needs to be checked separately, the alpha is rounded different
    it('should display 8 digit hexa color', async () => {
      const color = '#06AD8580'
      await mount(<ColorIndicator color={color} />)

      const indicator = await ColorIndicatorLocator.find()
      const currentColor = indicator.getColorRGBA()

      expect(colorToHex8(currentColor)).to.eql(color)
    })
  })

  describe('shape prop', () => {
    it('should display circle by default', async () => {
      await mount(<ColorIndicator />)

      const indicator = await ColorIndicatorLocator.find()
      const { borderRadius, width, height } = indicator.getComputedStyle()

      expect(width).to.equal(height)
      expect(borderRadius).to.equal(width)
    })

    it('should display rectangle version', async () => {
      await mount(<ColorIndicator shape="rectangle" />)

      const indicator = await ColorIndicatorLocator.find()
      const { borderRadius, width, height } = indicator.getComputedStyle()

      expect(width).to.equal(height)
      expect(borderRadius).to.equal('6px')
    })
  })

  describe('elementRef prop', () => {
    it('should provide ref', async () => {
      const elementRef = stub()
      await mount(<ColorIndicator elementRef={elementRef} />)

      const indicator = await ColorIndicatorLocator.find()

      expect(elementRef).to.have.been.calledWith(indicator.getDOMNode())
    })
  })

  describe('should be accessible', () => {
    generateA11yTests(ColorIndicator, ColorIndicatorExamples, ['button-name'])
    it('a11y', async () => {
      await mount(<ColorIndicator />)
      const subject = await ColorIndicatorLocator.find()

      expect(
        await subject.accessible({ ignores: ['button-name'] })
      ).to.be.true()
    })
  })
})
