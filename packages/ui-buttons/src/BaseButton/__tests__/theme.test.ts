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

import { canvas, canvasHighContrast } from '@instructure/ui-themes'
import generateComponentTheme from '../theme'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('BaseButton.theme', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('with the default theme', () => {
    const variables = generateComponentTheme(canvas)

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('primary', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should have a background and text colors that meet 3:1 contrast', () => {
        expect(
          contrast(variables.primaryBackground, variables.primaryColor)
        ).to.be.above(3)
        expect(
          contrast(variables.primaryHoverBackground, variables.primaryColor)
        ).to.be.above(3)
        expect(
          contrast(variables.primaryActiveBackground, variables.primaryColor)
        ).to.be.above(3)
        expect(
          contrast(variables.primaryActiveBackground, variables.primaryColor)
        ).to.be.above(3)
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('secondary', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should have a background and text colors that meet 3:1 contrast', () => {
        expect(
          contrast(variables.secondaryBackground, variables.secondaryColor)
        ).to.be.above(3)
        expect(
          contrast(variables.secondaryHoverBackground, variables.secondaryColor)
        ).to.be.above(3)
        expect(
          contrast(
            variables.secondaryActiveBackground,
            variables.secondaryColor
          )
        ).to.be.above(3)
        expect(
          contrast(
            variables.secondaryActiveBackground,
            variables.secondaryColor
          )
        ).to.be.above(3)
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('success', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should have a background and text colors that meet 3:1 contrast', () => {
        expect(
          contrast(variables.successBackground, variables.successColor)
        ).to.be.above(3)
        expect(
          contrast(variables.successHoverBackground, variables.successColor)
        ).to.be.above(3)
        expect(
          contrast(variables.successActiveBackground, variables.successColor)
        ).to.be.above(3)
        expect(
          contrast(variables.successActiveBackground, variables.successColor)
        ).to.be.above(3)
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('danger', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should have a background and text colors that meet 3:1 contrast', () => {
        expect(
          contrast(variables.dangerBackground, variables.dangerColor)
        ).to.be.above(3)
        expect(
          contrast(variables.dangerHoverBackground, variables.dangerColor)
        ).to.be.above(3)
        expect(
          contrast(variables.dangerActiveBackground, variables.dangerColor)
        ).to.be.above(3)
        expect(
          contrast(variables.dangerActiveBackground, variables.dangerColor)
        ).to.be.above(3)
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('primary-inverse', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should have a background and text colors that meet 3:1 contrast', () => {
        expect(
          contrast(
            variables.primaryInverseBackground,
            variables.primaryInverseColor
          )
        ).to.be.above(3)
        expect(
          contrast(
            variables.primaryInverseHoverBackground,
            variables.primaryInverseColor
          )
        ).to.be.above(3)
        expect(
          contrast(
            variables.primaryInverseActiveBackground,
            variables.primaryInverseColor
          )
        ).to.be.above(3)
        expect(
          contrast(
            variables.primaryInverseActiveBackground,
            variables.primaryInverseColor
          )
        ).to.be.above(3)
      })
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('with the "canvas-high-contrast" theme', () => {
    const variables = generateComponentTheme(canvasHighContrast)

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('primary', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should have a background and text colors that meet 4.5:1 contrast', () => {
        expect(
          contrast(variables.primaryBackground, variables.primaryColor)
        ).to.be.above(4.5)
        expect(
          contrast(variables.primaryHoverBackground, variables.primaryColor)
        ).to.be.above(4.5)
        expect(
          contrast(variables.primaryActiveBackground, variables.primaryColor)
        ).to.be.above(4.5)
        expect(
          contrast(variables.primaryActiveBackground, variables.primaryColor)
        ).to.be.above(4.5)
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('secondary', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should have a background and text colors that meet 4.5:1 contrast', () => {
        expect(
          contrast(variables.secondaryBackground, variables.secondaryColor)
        ).to.be.above(4.5)
        expect(
          contrast(variables.secondaryHoverBackground, variables.secondaryColor)
        ).to.be.above(4.5)
        expect(
          contrast(
            variables.secondaryActiveBackground,
            variables.secondaryColor
          )
        ).to.be.above(4.5)
        expect(
          contrast(
            variables.secondaryActiveBackground,
            variables.secondaryColor
          )
        ).to.be.above(4.5)
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('success', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should have a background and text colors that meet 4.5:1 contrast', () => {
        expect(
          contrast(variables.successBackground, variables.successColor)
        ).to.be.above(4.5)
        expect(
          contrast(variables.successHoverBackground, variables.successColor)
        ).to.be.above(4.5)
        expect(
          contrast(variables.successActiveBackground, variables.successColor)
        ).to.be.above(4.5)
        expect(
          contrast(variables.successActiveBackground, variables.successColor)
        ).to.be.above(4.5)
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('danger', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should have a background and text colors that meet 4.5:1 contrast', () => {
        expect(
          contrast(variables.dangerBackground, variables.dangerColor)
        ).to.be.above(4.5)
        expect(
          contrast(variables.dangerHoverBackground, variables.dangerColor)
        ).to.be.above(4.5)
        expect(
          contrast(variables.dangerActiveBackground, variables.dangerColor)
        ).to.be.above(4.5)
        expect(
          contrast(variables.dangerActiveBackground, variables.dangerColor)
        ).to.be.above(4.5)
      })
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('primary-inverse', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should have a background and text colors that meet 4.5:1 contrast', () => {
        expect(
          contrast(
            variables.primaryInverseBackground,
            variables.primaryInverseColor
          )
        ).to.be.above(4.5)
        expect(
          contrast(
            variables.primaryInverseHoverBackground,
            variables.primaryInverseColor
          )
        ).to.be.above(4.5)
        expect(
          contrast(
            variables.primaryInverseActiveBackground,
            variables.primaryInverseColor
          )
        ).to.be.above(4.5)
        expect(
          contrast(
            variables.primaryInverseActiveBackground,
            variables.primaryInverseColor
          )
        ).to.be.above(4.5)
      })
    })
  })
})
