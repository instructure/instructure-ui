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

import { expect } from '@instructure/ui-test-utils'
import { contrast } from '@instructure/ui-color-utils'
import TextArea from '../index'


describe('TextArea.theme', () => {
  describe('with the default theme', () => {
    const variables = TextArea.generateTheme()

    describe('default', () => {
      it('should ensure focus color and background color meet 3:1 contrast', () => {
        expect(contrast(variables.background, variables.focus))
          .to.be.above(3)
      })

      it('should ensure text color and background color meet 3:1 contrast', () => {
        expect(contrast(variables.color, variables.background))
          .to.be.above(3)
      })
    })
  })

  describe('with the high contrast canvas theme', () => {
    const variables = TextArea.generateTheme('canvas-high-contrast')

    describe('default', () => {
      it('should ensure focus color and background color meet 4.5:1 contrast', () => {
        expect(contrast(variables.background, variables.focus))
          .to.be.above(4.5)
      })

      it('should ensure text color and background color meet 3:1 contrast', () => {
        expect(contrast(variables.color, variables.background))
          .to.be.above(4.5)
      })
    })
  })
})

