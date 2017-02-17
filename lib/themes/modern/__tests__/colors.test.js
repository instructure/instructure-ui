import colors from '../colors'
import { contrast } from '../../../util/color'

describe('modern.colors', function () {
  describe('brand', function () {
    it('should meet 3:1 contrast as a background color with `porcelain` text', function () {
      expect(contrast(colors.brand, colors.porcelain)).to.be.above(3)
    })
    it('should meet 3:1 contrast as a background color with `lightest` text', function () {
      expect(contrast(colors.brand, colors.lightest)).to.be.above(3)
    })
  })

  describe('shamrock', function () {
    it('should meet 3:1 contrast as a background color with `lightest` text', function () {
      expect(contrast(colors.shamrock, colors.lightest)).to.be.above(3)
    })
  })

  describe('barney', function () {
    it('should meet 3:1 contrast as a background color with `lightest` text', function () {
      expect(contrast(colors.barney, colors.lightest)).to.be.above(3)
    })
  })

  describe('crimson', function () {
    it('should meet 3:1 contrast as a background color with `lightest` text', function () {
      expect(contrast(colors.crimson, colors.lightest)).to.be.above(3)
    })
  })

  describe('fire', function () {
    it('should meet 3:1 contrast as a background color with `lightest` text', function () {
      expect(contrast(colors.fire, colors.lightest)).to.be.above(3)
    })
  })

  describe('licorice', function () {
    it('should meet 3:1 contrast as a background color with `porcelain` text', function () {
      expect(contrast(colors.licorice, colors.porcelain)).to.be.above(3)
    })
    it('should meet 3:1 contrast as a background color with `lightest` text', function () {
      expect(contrast(colors.licorice, colors.lightest)).to.be.above(3)
    })
  })

  describe('oxford', function () {
    it('should meet 3:1 contrast as a background color with `porcelain` text', function () {
      expect(contrast(colors.oxford, colors.porcelain)).to.be.above(3)
    })
    it('should meet 3:1 contrast as a background color with `lightest` text', function () {
      expect(contrast(colors.oxford, colors.lightest)).to.be.above(3)
    })
  })

  describe('slate', function () {
    it('should meet 3:1 contrast as a background color with `porcelain` text', function () {
      expect(contrast(colors.slate, colors.porcelain)).to.be.above(3)
    })
    it('should meet 3:1 contrast as a background color with `lightest` text', function () {
      expect(contrast(colors.slate, colors.lightest)).to.be.above(3)
    })
  })

  describe('ash', function () {
    it('should meet 3:1 contrast as a background color with `lightest` text', function () {
      expect(contrast(colors.ash, colors.lightest)).to.be.above(3)
    })
  })

  describe('porcelain', function () {
    it('should meet 3:1 contrast as a background color with `licorice` text', function () {
      expect(contrast(colors.porcelain, colors.licorice)).to.be.above(3)
    })
    it('should meet 3:1 contrast as a background color with `oxford` text', function () {
      expect(contrast(colors.porcelain, colors.oxford)).to.be.above(3)
    })
  })

  describe('lightest', function () {
    it('should meet 3:1 contrast as a background color with `licorice` text', function () {
      expect(contrast(colors.lightest, colors.licorice)).to.be.above(3)
    })
    it('should meet 3:1 contrast as a background color with `oxford` text', function () {
      expect(contrast(colors.lightest, colors.oxford)).to.be.above(3)
    })
  })
})
