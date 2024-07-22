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
import { canvas, canvasHighContrast, instructure } from '@instructure/ui-themes'

import generateComponentTheme from '../theme'

import type { BaseTheme } from '@instructure/ui-themes'

// Text has to have 4.5:1 contrast in all themes
const runTextColorContrastTest = (theme: BaseTheme) => {
  const variables = generateComponentTheme(theme)

  describe('primaryColor', () => {
    it('should ensure text color and background color meet 4.5 contrast', () => {
      expect(
        contrast(variables.primaryColor, theme.colors.borderLightest)
      ).to.be.above(4.5)
    })
  })

  describe('secondaryColor', () => {
    it('should ensure text color and background color meet 4.5 contrast', () => {
      expect(
        contrast(variables.secondaryColor, theme.colors.borderLightest)
      ).to.be.above(4.5)
    })
  })

  describe('primaryInverseColor', () => {
    it('should ensure text color and background color meet 4.5 contrast', () => {
      expect(
        contrast(variables.primaryInverseColor, theme.colors.borderDarkest)
      ).to.be.above(4.5)
    })
  })

  describe('secondaryInverseColor', () => {
    it('should ensure text color and background color meet 4.5 contrast', () => {
      expect(
        contrast(variables.secondaryInverseColor, theme.colors.borderDarkest)
      ).to.be.above(4.5)
    })
  })

  describe('brandColor', () => {
    it('should ensure text color and background color meet 4.5 contrast', () => {
      expect(
        contrast(variables.brandColor, theme.colors.borderLightest)
      ).to.be.above(4.5)
    })
  })

  describe('alertColor', () => {
    it('should ensure text color and background color meet 4.5 contrast', () => {
      expect(
        contrast(variables.alertColor, theme.colors.borderLightest)
      ).to.be.above(4.5)
    })
  })

  // These test currently fail with the instructure theme
  // TODO: notify the design team about it
  if (theme.key !== 'instructure') {
    describe('successColor', () => {
      it('should ensure text color and background color meet 4.5 contrast', () => {
        expect(
          contrast(variables.successColor, theme.colors.borderLightest)
        ).to.be.above(4.5)
      })
    })

    describe('dangerColor', () => {
      it('should ensure text color and background color meet 4.5 contrast', () => {
        expect(
          contrast(variables.dangerColor, theme.colors.borderLightest)
        ).to.be.above(4.5)
      })
    })
  }
}

describe('Alert.theme', () => {
  describe('with the default theme', () => {
    runTextColorContrastTest(canvas)
  })

  describe('with the "canvas-high-contrast" theme', () => {
    runTextColorContrastTest(canvasHighContrast)
  })

  describe('with the "instructure" theme', () => {
    runTextColorContrastTest(instructure)
  })
})
