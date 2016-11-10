import { contrast } from '../../../util/color'
import Button from '../index'

describe('Button.theme', function () {
  describe('with the default theme', function () {
    const variables = Button.generateTheme()

    describe('default', function () {
      it('should have a background and text colors that meet 3:1 contrast', function () {
        expect(contrast(variables.defaultBackground, variables.defaultColor))
          .to.be.above(3)
        expect(contrast(variables.defaultHoverBackground, variables.defaultColor))
          .to.be.above(3)
      })
    })

    describe('primary', function () {
      it('should have a background and text colors that meet 3:1 contrast', function () {
        expect(contrast(variables.primaryBackground, variables.primaryColor))
          .to.be.above(3)
        expect(contrast(variables.primaryHoverBackground, variables.primaryColor))
          .to.be.above(3)
      })
    })

    describe('success', function () {
      it('should have a background and text colors that meet 3:1 contrast', function () {
        expect(contrast(variables.successBackground, variables.successColor))
          .to.be.above(3)
        expect(contrast(variables.successHoverBackground, variables.successColor))
          .to.be.above(3)
      })
    })

    describe('light', function () {
      it('should have a background and text colors that meet 3:1 contrast', function () {
        expect(contrast(variables.lightBackground, variables.lightColor))
          .to.be.above(3)
        expect(contrast(variables.lightHoverBackground, variables.lightColor))
          .to.be.above(3)
      })
    })
  })

  describe('with the high contrast theme', function () {
    const variables = Button.generateTheme('a11y')

    describe('default', function () {
      it('should have a background and text colors that meet 4.5:1 contrast', function () {
        expect(contrast(variables.defaultBackground, variables.defaultColor))
          .to.be.above(4.5)
        expect(contrast(variables.defaultHoverBackground, variables.defaultColor))
          .to.be.above(4.5)
      })
    })

    describe('primary', function () {
      it('should have a background and text colors that meet 4.5:1 contrast', function () {
        expect(contrast(variables.primaryBackground, variables.primaryColor))
          .to.be.above(4.5)
        expect(contrast(variables.primaryHoverBackground, variables.primaryColor))
          .to.be.above(4.5)
      })
    })

    describe('success', function () {
      it('should have a background and text colors that meet 4.5:1 contrast', function () {
        expect(contrast(variables.successBackground, variables.successColor))
          .to.be.above(4.5)
        expect(contrast(variables.successHoverBackground, variables.successColor))
          .to.be.above(4.5)
      })
    })

    describe('light', function () {
      it('should have a background and text colors that meet 4.5:1 contrast', function () {
        expect(contrast(variables.lightBackground, variables.lightColor))
          .to.be.above(4.5)
        expect(contrast(variables.lightHoverBackground, variables.lightColor))
          .to.be.above(4.5)
      })
    })
  })
})
