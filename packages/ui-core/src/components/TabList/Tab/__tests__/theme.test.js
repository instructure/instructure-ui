import { contrast } from '@instructure/ui-themeable/lib/utils/color'
import Tab from '../index'

describe('Tab.theme', () => {
  describe('with the default theme', () => {
    const variables = Tab.generateTheme()

    describe('simple variant', () => {
      it('should ensure text and tab background meet 3:1 contrast', () => {
        expect(contrast(variables.simpleSelectedColor, variables.simpleSelectedBackground))
          .to.be.above(3)
      })
    })

    describe('accordion variant', () => {
      it('should ensure text and tab background meet 3:1 contrast', () => {
        expect(contrast(variables.accordionColor, variables.accordionBackground))
          .to.be.above(3)
        expect(contrast(variables.accordionColor, variables.accordionHoverBackground))
          .to.be.above(3)
        expect(contrast(variables.accordionSelectedColor, variables.accordionSelectedBackground))
          .to.be.above(3)
      })
    })
  })

  describe('with the "canvas-high-contrast" theme', () => {
    const variables = Tab.generateTheme('canvas-high-contrast')

    describe('simple variant', () => {
      it('should ensure text and tab background meet 4.5:1 contrast', () => {
        expect(contrast(variables.simpleSelectedColor, variables.simpleSelectedBackground))
          .to.be.above(4.5)
      })
    })

    describe('accordion variant', () => {
      it('should ensure text and tab background meet 4.5:1 contrast', () => {
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
