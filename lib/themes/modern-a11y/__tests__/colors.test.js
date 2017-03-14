import colors from '../colors'
import { contrast } from '../../../util/color'

describe('modern-a11y colors', function () {
  describe('brand', function () {
    it('should meet 4.5:1 contrast as a background color with `porcelain` text', function () {
      expect(contrast(colors.brand, colors.porcelain)).to.be.above(4.5)
    })
    it('should meet 4.5:1 contrast as a background color with `white` text', function () {
      expect(contrast(colors.brand, colors.white)).to.be.above(4.5)
    })
  })

  describe('shamrock', function () {
    it('should meet 4.5:1 contrast as a background color with `white` text', function () {
      expect(contrast(colors.shamrock, colors.white)).to.be.above(4.5)
    })
  })

  describe('barney', function () {
    it('should meet 4.5:1 contrast as a background color with `white` text', function () {
      expect(contrast(colors.barney, colors.white)).to.be.above(4.5)
    })
  })

  describe('crimson', function () {
    it('should meet 4.5:1 contrast as a background color with `white` text', function () {
      expect(contrast(colors.crimson, colors.white)).to.be.above(4.5)
    })
  })

  describe('fire', function () {
    it('should meet 4.5:1 contrast as a background color with `white` text', function () {
      expect(contrast(colors.fire, colors.white)).to.be.above(4.5)
    })
  })

  describe('licorice', function () {
    it('should meet 4.5:1 contrast as a background color with `porcelain` text', function () {
      expect(contrast(colors.licorice, colors.porcelain)).to.be.above(4.5)
    })
    it('should meet 4.5:1 contrast as a background color with `white` text', function () {
      expect(contrast(colors.licorice, colors.white)).to.be.above(4.5)
    })
  })

  describe('oxford', function () {
    it('should meet 4.5:1 contrast as a background color with `porcelain` text', function () {
      expect(contrast(colors.oxford, colors.porcelain)).to.be.above(4.5)
    })
    it('should meet 4.5:1 contrast as a background color with `white` text', function () {
      expect(contrast(colors.oxford, colors.white)).to.be.above(4.5)
    })
  })

  describe('slate', function () {
    it('should meet 4.5:1 contrast as a background color with `porcelain` text', function () {
      expect(contrast(colors.slate, colors.porcelain)).to.be.above(4.5)
    })
    it('should meet 4.5:1 contrast as a background color with `white` text', function () {
      expect(contrast(colors.slate, colors.white)).to.be.above(4.5)
    })
  })

  describe('ash', function () {
    it('should meet 4.5:1 contrast as a background color with `porcelain` text', function () {
      expect(contrast(colors.ash, colors.porcelain)).to.be.above(4.5)
    })
    it('should meet 4.5:1 contrast as a background color with `white` text', function () {
      expect(contrast(colors.ash, colors.white)).to.be.above(4.5)
    })
  })

  describe('porcelain', function () {
    it('should meet 4.5:1 contrast as a background color with `licorice` text', function () {
      expect(contrast(colors.porcelain, colors.licorice)).to.be.above(4.5)
    })
    it('should meet 4.5:1 contrast as a background color with `oxford` text', function () {
      expect(contrast(colors.porcelain, colors.oxford)).to.be.above(4.5)
    })
  })

  describe('white', function () {
    it('should meet 4.5:1 contrast as a background color with `licorice` text', function () {
      expect(contrast(colors.white, colors.licorice)).to.be.above(4.5)
    })
    it('should meet 4.5:1 contrast as a background color with `oxford` text', function () {
      expect(contrast(colors.white, colors.oxford)).to.be.above(4.5)
    })
  })
})
