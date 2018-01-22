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

import { contrast } from '@instructure/ui-themeable/lib/utils/color'
import Button from '../index'

describe('Button.theme', () => {
  describe('with the default theme', () => {
    const variables = Button.generateTheme()

    describe('default', () => {
      it('should have a background and text colors that meet 3:1 contrast', () => {
        expect(contrast(variables.defaultBackground, variables.defaultColor))
          .to.be.above(3)
        expect(contrast(variables.defaultHoverBackground, variables.defaultColor))
          .to.be.above(3)
      })
    })

    describe('primary', () => {
      it('should have a background and text colors that meet 3:1 contrast', () => {
        expect(contrast(variables.primaryBackground, variables.primaryColor))
          .to.be.above(3)
        expect(contrast(variables.primaryHoverBackground, variables.primaryColor))
          .to.be.above(3)
      })
    })

    describe('success', () => {
      it('should have a background and text colors that meet 3:1 contrast', () => {
        expect(contrast(variables.successBackground, variables.successColor))
          .to.be.above(3)
        expect(contrast(variables.successHoverBackground, variables.successColor))
          .to.be.above(3)
      })
    })

    describe('danger', () => {
      it('should have a background and text colors that meet 3:1 contrast', () => {
        expect(contrast(variables.dangerBackground, variables.dangerColor))
          .to.be.above(3)
        expect(contrast(variables.dangerHoverBackground, variables.dangerColor))
          .to.be.above(3)
      })
    })

    describe('light', () => {
      it('should have a background and text colors that meet 3:1 contrast', () => {
        expect(contrast(variables.lightBackground, variables.lightColor))
          .to.be.above(3)
        expect(contrast(variables.lightHoverBackground, variables.lightColor))
          .to.be.above(3)
      })
    })
  })

  describe('with the "canvas-high-contrast" theme', () => {
    const variables = Button.generateTheme('canvas-high-contrast')

    describe('default', () => {
      it('should have a background and text colors that meet 4.5:1 contrast', () => {
        expect(contrast(variables.defaultBackground, variables.defaultColor))
          .to.be.above(4.5)
        expect(contrast(variables.defaultHoverBackground, variables.defaultColor))
          .to.be.above(4.5)
      })
    })

    describe('primary', () => {
      it('should have a background and text colors that meet 4.5:1 contrast', () => {
        expect(contrast(variables.primaryBackground, variables.primaryColor))
          .to.be.above(4.5)
        expect(contrast(variables.primaryHoverBackground, variables.primaryColor))
          .to.be.above(4.5)
      })
    })

    describe('success', () => {
      it('should have a background and text colors that meet 4.5:1 contrast', () => {
        expect(contrast(variables.successBackground, variables.successColor))
          .to.be.above(4.5)
        expect(contrast(variables.successHoverBackground, variables.successColor))
          .to.be.above(4.5)
      })
    })

    describe('danger', () => {
      it('should have a background and text colors that meet 4.5:1 contrast', () => {
        expect(contrast(variables.dangerBackground, variables.dangerColor))
          .to.be.above(4.5)
        expect(contrast(variables.dangerHoverBackground, variables.dangerColor))
          .to.be.above(4.5)
      })
    })

    describe('light', () => {
      it('should have a background and text colors that meet 4.5:1 contrast', () => {
        expect(contrast(variables.lightBackground, variables.lightColor))
          .to.be.above(4.5)
        expect(contrast(variables.lightHoverBackground, variables.lightColor))
          .to.be.above(4.5)
      })
    })
  })
})
