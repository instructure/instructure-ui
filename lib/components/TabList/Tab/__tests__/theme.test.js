import { contrast } from '../../../../util/color'
import Tab from '../index'

describe('Tab.theme', function () {
  describe('with the default theme', function () {
    const variables = Tab.generateTheme()

    describe('simple variant', function () {
      it('should ensure text and tab background meet 3:1 contrast', function () {
        expect(contrast(variables.simpleSelectedColor, variables.simpleSelectedBackground))
          .to.be.above(3)
      })
    })

    describe('accordion variant', function () {
      it('should ensure text and tab background meet 3:1 contrast', function () {
        expect(contrast(variables.accordionColor, variables.accordionBackground))
          .to.be.above(3)
        expect(contrast(variables.accordionColor, variables.accordionHoverBackground))
          .to.be.above(3)
        expect(contrast(variables.accordionSelectedColor, variables.accordionSelectedBackground))
          .to.be.above(3)
      })
    })
  })

  describe('with the a11y theme', function () {
    const variables = Tab.generateTheme('a11y')

    describe('simple variant', function () {
      it('should ensure text and tab background meet 4.5:1 contrast', function () {
        expect(contrast(variables.simpleSelectedColor, variables.simpleSelectedBackground))
          .to.be.above(4.5)
      })
    })

    describe('accordion variant', function () {
      it('should ensure text and tab background meet 4.5:1 contrast', function () {
        expect(contrast(variables.accordionColor, variables.accordionBackground))
          .to.be.above(4.5)
        expect(contrast(variables.accordionColor, variables.accordionHoverBackground))
          .to.be.above(4.5)
        expect(contrast(variables.accordionSelectedColor, variables.accordionSelectedBackground))
          .to.be.above(4.5)
      })
    })
  })
})
