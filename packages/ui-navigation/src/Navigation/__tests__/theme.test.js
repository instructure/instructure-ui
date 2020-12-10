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

import { contrast } from '@instructure/ui-color-utils'
import { expect } from '@instructure/ui-test-utils'

import { Navigation } from '../index'

describe('Navigation.theme', () => {
  describe('with the default theme', () => {
    const variables = Navigation.generateTheme()

    it('should have a background and text colors that meet 3:1 contrast', () => {
      expect(
        contrast(variables.backgroundColor, variables.fontColor)
      ).to.be.above(3)
    })
  })

  describe('with the high contrast canvas theme', () => {
    const variables = Navigation.generateTheme('canvas-high-contrast')

    it('should have a background and text colors that meet 4.5:1 contrast', () => {
      expect(
        contrast(variables.backgroundColor, variables.fontColor)
      ).to.be.above(4.5)
    })
  })
})
