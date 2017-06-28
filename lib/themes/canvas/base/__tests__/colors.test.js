import colors from '../colors'
import { contrast } from '../../../../util/color'

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
