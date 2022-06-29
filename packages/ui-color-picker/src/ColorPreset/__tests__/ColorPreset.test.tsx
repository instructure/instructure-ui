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
  // generateA11yTests,
  mount,
  stub
} from '@instructure/ui-test-utils'

import { ColorPreset } from '../'
import { ColorPresetLocator } from '../ColorPresetLocator'
// import ColorPresetExamples from '../__examples__/ColorPreset.examples'

const testValue = {
  colors: [
    '#ffffff',
    '#0CBF94',
    '#0C89BF00',
    '#BF0C6D',
    '#BF8D0C',
    '#ff0000',
    '#576A66',
    '#35423A',
    '#35423F'
  ],
  selected: ''
}

describe('<ColorPreset />', () => {
  describe('elementRef prop', () => {
    it('should provide ref', async () => {
      const elementRef = stub()
      await mount(
        <ColorPreset {...testValue} onSelect={stub()} elementRef={elementRef} />
      )

      const component = await ColorPresetLocator.find()

      expect(elementRef).to.have.been.calledWith(component.getDOMNode())
    })
  })

  // TODO: this block throws a ton of errors, we should investigate
  // describe('should be accessible', () => {
  //   generateA11yTests(ColorPreset, ColorPresetExamples)
  //   it('a11y', async () => {
  //     await mount(<ColorPreset {...testValue} onSelect={stub()} />)
  //     const subject = await ColorPresetLocator.find()
  //
  //     expect(await subject.accessible()).to.be.true()
  //   })
  // })
})
