import { contrast } from '../../../../util/color'
import MenuItem from '../index'

describe('MenuItem.theme', function () {
  describe('with the default theme', function () {
    const variables = MenuItem.generateTheme()

    describe('default', function () {
      it('should ensure hover color and text color meet 3:1 contrast', function () {
        expect(contrast(variables.hover.background, variables.hover.color))
          .to.be.above(3)
      })
    })
  })

  describe('with the high contrast theme', function () {
    const variables = MenuItem.generateTheme('a11y')

    describe('default', function () {
      it('should ensure hover color and text color meet 4.5:1 contrast', function () {
        expect(contrast(variables.hover.background, variables.hover.color))
          .to.be.above(4.5)
      })
    })
  })
})
