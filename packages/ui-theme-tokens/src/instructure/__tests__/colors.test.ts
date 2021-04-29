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

import { colors } from '../colors'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('colors', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('textDarkest', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a text color with `backgroundLightest` background', () => {
      expect(
        contrast(colors.textDarkest, colors.backgroundLightest)
      ).to.be.above(3)
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a text color with `backgroundLight` background', () => {
      expect(contrast(colors.textDarkest, colors.backgroundLight)).to.be.above(
        3
      )
    })
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('textDark', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a text color with `backgroundLightest` background', () => {
      expect(contrast(colors.textDark, colors.backgroundLightest)).to.be.above(
        3
      )
    })
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('textLight', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a text color with `backgroundDarkest` background', () => {
      expect(contrast(colors.textLight, colors.backgroundDarkest)).to.be.above(
        3
      )
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a text color with `backgroundBrandSecondary` background', () => {
      expect(
        contrast(colors.textLight, colors.backgroundBrandSecondary)
      ).to.be.above(3)
    })
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('textLightest', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a text color with `backgroundDarkest` background', () => {
      expect(
        contrast(colors.textLightest, colors.backgroundDarkest)
      ).to.be.above(3)
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a text color with `backgroundDark` background', () => {
      expect(contrast(colors.textLightest, colors.backgroundDark)).to.be.above(
        3
      )
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a text color with `backgroundBrand` background', () => {
      expect(contrast(colors.textLightest, colors.backgroundBrand)).to.be.above(
        3
      )
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a text color with `backgroundAlert` background', () => {
      expect(contrast(colors.textLightest, colors.backgroundAlert)).to.be.above(
        3
      )
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a text color with `backgroundInfo` background', () => {
      expect(contrast(colors.textLightest, colors.backgroundInfo)).to.be.above(
        3
      )
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a text color with `backgroundSuccess` background', () => {
      expect(
        contrast(colors.textLightest, colors.backgroundSuccess)
      ).to.be.above(3)
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a text color with `backgroundWarning` background', () => {
      expect(
        contrast(colors.textLightest, colors.backgroundWarning)
      ).to.be.above(3)
    })
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('textBrand', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a text color with `backgroundLightest` background', () => {
      expect(contrast(colors.textBrand, colors.backgroundLightest)).to.be.above(
        3
      )
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a text color with `backgroundLight` background', () => {
      expect(contrast(colors.textBrand, colors.backgroundLight)).to.be.above(3)
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a text color with `backgroundDarkest` background', () => {
      expect(contrast(colors.textBrand, colors.backgroundDarkest)).to.be.above(
        3
      )
    })
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('textAlert', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a text color with `backgroundLightest` background', () => {
      expect(contrast(colors.textAlert, colors.backgroundLightest)).to.be.above(
        3
      )
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a text color with `backgroundLight` background', () => {
      expect(contrast(colors.textAlert, colors.backgroundLight)).to.be.above(3)
    })
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('textInfo', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a text color with `backgroundLightest` background', () => {
      expect(contrast(colors.textInfo, colors.backgroundLightest)).to.be.above(
        3
      )
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a text color with `backgroundDarkest` background', () => {
      expect(contrast(colors.textInfo, colors.backgroundDarkest)).to.be.above(3)
    })
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('textSuccess', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a text color with `backgroundLightest` background', () => {
      expect(
        contrast(colors.textSuccess, colors.backgroundLightest)
      ).to.be.above(3)
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a text color with `backgroundDarkest` background', () => {
      expect(
        contrast(colors.textSuccess, colors.backgroundDarkest)
      ).to.be.above(3)
    })
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('textWarning', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a text color with `backgroundLightest` background', () => {
      expect(
        contrast(colors.textWarning, colors.backgroundLightest)
      ).to.be.above(3)
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a text color with `backgroundDarkest` background', () => {
      expect(
        contrast(colors.textWarning, colors.backgroundDarkest)
      ).to.be.above(3)
    })
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('textDanger', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a text color with `backgroundLightest` background', () => {
      expect(
        contrast(colors.textDanger, colors.backgroundLightest)
      ).to.be.above(3)
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('borderLight', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a border color with `backgroundDark` background', () => {
      expect(
        contrast(colors.borderLight, colors.backgroundDarkest)
      ).to.be.above(3)
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a border color with `backgroundDarkest` background', () => {
      expect(
        contrast(colors.borderLight, colors.backgroundDarkest)
      ).to.be.above(3)
    })
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('borderDark', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a border color with `backgroundLightest` background', () => {
      expect(
        contrast(colors.borderDark, colors.backgroundLightest)
      ).to.be.above(3)
    })
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('borderBrand', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a border color with `backgroundLightest` background', () => {
      expect(
        contrast(colors.borderBrand, colors.backgroundLightest)
      ).to.be.above(3)
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a border color with `backgroundLight` background', () => {
      expect(contrast(colors.borderBrand, colors.backgroundLight)).to.be.above(
        3
      )
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a border color with `backgroundDark` background', () => {
      expect(
        contrast(colors.borderBrand, colors.backgroundDarkest)
      ).to.be.above(3)
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a border color with `backgroundDarkest` background', () => {
      expect(
        contrast(colors.borderBrand, colors.backgroundDarkest)
      ).to.be.above(3)
    })
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('borderAlert', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a border color with `backgroundLightest` background', () => {
      expect(
        contrast(colors.borderAlert, colors.backgroundLightest)
      ).to.be.above(3)
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a border color with `backgroundLight` background', () => {
      expect(contrast(colors.borderAlert, colors.backgroundLight)).to.be.above(
        3
      )
    })
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('borderInfo', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a border color with `backgroundLightest` background', () => {
      expect(
        contrast(colors.borderInfo, colors.backgroundLightest)
      ).to.be.above(3)
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a border color with `backgroundLight` background', () => {
      expect(contrast(colors.borderInfo, colors.backgroundLight)).to.be.above(3)
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a border color with `backgroundDark` background', () => {
      expect(contrast(colors.borderInfo, colors.backgroundDarkest)).to.be.above(
        3
      )
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a border color with `backgroundDarkest` background', () => {
      expect(contrast(colors.borderInfo, colors.backgroundDarkest)).to.be.above(
        3
      )
    })
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('borderSuccess', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a border color with `backgroundLightest` background', () => {
      expect(
        contrast(colors.borderSuccess, colors.backgroundLightest)
      ).to.be.above(3)
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a border color with `backgroundDark` background', () => {
      expect(
        contrast(colors.borderSuccess, colors.backgroundDarkest)
      ).to.be.above(3)
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a border color with `backgroundDarkest` background', () => {
      expect(
        contrast(colors.borderSuccess, colors.backgroundDarkest)
      ).to.be.above(3)
    })
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('borderWarning', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a border color with `backgroundLightest` background', () => {
      expect(
        contrast(colors.borderWarning, colors.backgroundLightest)
      ).to.be.above(3)
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a border color with `backgroundDark` background', () => {
      expect(
        contrast(colors.borderWarning, colors.backgroundDarkest)
      ).to.be.above(3)
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a border color with `backgroundDarkest` background', () => {
      expect(
        contrast(colors.borderWarning, colors.backgroundDarkest)
      ).to.be.above(3)
    })
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('borderDanger', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet 3:1 contrast as a border color with `backgroundLightest` background', () => {
      expect(
        contrast(colors.borderDanger, colors.backgroundLightest)
      ).to.be.above(3)
    })
  })
})
