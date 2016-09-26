import { contrast } from '../../../util/color'
import Button from '../index'

describe('Button.theme', function () {
  describe('with the default theme', function () {
    const variables = Button.generateTheme()

    describe('default', function () {
      it('should have a background and text colors that meet 3:1 contrast', function () {
        expect(contrast(variables.default.background, variables.default.color))
          .to.be.above(3)
      })
    })

    describe('primary', function () {
      it('should have a background and text colors that meet 3:1 contrast', function () {
        expect(contrast(variables.primary.background, variables.primary.color))
          .to.be.above(3)
      })
    })

    describe('success', function () {
      it('should have a background and text colors that meet 3:1 contrast', function () {
        expect(contrast(variables.success.background, variables.success.color))
          .to.be.above(3)
      })
    })
  })

  describe('with the high contrast theme', function () {
    const variables = Button.generateTheme('a11y')

    describe('default', function () {
      it('should have a background and text colors that meet 4.5:1 contrast', function () {
        expect(contrast(variables.default.background, variables.default.color))
          .to.be.above(4.5)
      })
    })

    describe('primary', function () {
      it('should have a background and text colors that meet 4.5:1 contrast', function () {
        expect(contrast(variables.primary.background, variables.primary.color))
          .to.be.above(4.5)
      })
    })

    describe('success', function () {
      it('should have a background and text colors that meet 4.5:1 contrast', function () {
        expect(contrast(variables.success.background, variables.success.color))
          .to.be.above(4.5)
      })
    })
  })
})
