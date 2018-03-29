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
import colors from '../colors'

describe('canvas.colors', () => {
  describe('brand', () => {
    it('should meet 3:1 contrast as a background color with `porcelain` text', () => {
      expect(contrast(colors.brand, colors.porcelain)).to.be.above(3)
    })
    it('should meet 3:1 contrast as a background color with `white` text', () => {
      expect(contrast(colors.brand, colors.white)).to.be.above(3)
    })
  })

  describe('shamrock', () => {
    it('should meet 3:1 contrast as a background color with `white` text', () => {
      expect(contrast(colors.shamrock, colors.white)).to.be.above(3)
    })
  })

  describe('barney', () => {
    it('should meet 3:1 contrast as a background color with `white` text', () => {
      expect(contrast(colors.barney, colors.white)).to.be.above(3)
    })
  })

  describe('crimson', () => {
    it('should meet 3:1 contrast as a background color with `white` text', () => {
      expect(contrast(colors.crimson, colors.white)).to.be.above(3)
    })
  })

  describe('fire', () => {
    it('should meet 3:1 contrast as a background color with `white` text', () => {
      expect(contrast(colors.fire, colors.white)).to.be.above(3)
    })
  })

  describe('licorice', () => {
    it('should meet 3:1 contrast as a background color with `porcelain` text', () => {
      expect(contrast(colors.licorice, colors.porcelain)).to.be.above(3)
    })
    it('should meet 3:1 contrast as a background color with `white` text', () => {
      expect(contrast(colors.licorice, colors.white)).to.be.above(3)
    })
  })

  describe('oxford', () => {
    it('should meet 3:1 contrast as a background color with `porcelain` text', () => {
      expect(contrast(colors.oxford, colors.porcelain)).to.be.above(3)
    })
    it('should meet 3:1 contrast as a background color with `white` text', () => {
      expect(contrast(colors.oxford, colors.white)).to.be.above(3)
    })
  })

  describe('slate', () => {
    it('should meet 3:1 contrast as a background color with `porcelain` text', () => {
      expect(contrast(colors.slate, colors.porcelain)).to.be.above(3)
    })
    it('should meet 3:1 contrast as a background color with `white` text', () => {
      expect(contrast(colors.slate, colors.white)).to.be.above(3)
    })
  })

  describe('ash', () => {
    it('should meet 3:1 contrast as a background color with `white` text', () => {
      expect(contrast(colors.ash, colors.white)).to.be.above(3)
    })
  })

  describe('porcelain', () => {
    it('should meet 3:1 contrast as a background color with `licorice` text', () => {
      expect(contrast(colors.porcelain, colors.licorice)).to.be.above(3)
    })
    it('should meet 3:1 contrast as a background color with `oxford` text', () => {
      expect(contrast(colors.porcelain, colors.oxford)).to.be.above(3)
    })
  })

  describe('white', () => {
    it('should meet 3:1 contrast as a background color with `licorice` text', () => {
      expect(contrast(colors.white, colors.licorice)).to.be.above(3)
    })
    it('should meet 3:1 contrast as a background color with `oxford` text', () => {
      expect(contrast(colors.white, colors.oxford)).to.be.above(3)
    })
  })
})
