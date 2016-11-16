import { contrast } from '../../../util/color'
import Avatar from '../index'

describe('Avatar.theme', function () {
  describe('with the default theme', function () {
    const variables = Avatar.generateTheme()

    describe('default', function () {
      it('should ensure background color and text color meet 3:1 contrast', function () {
        expect(contrast(variables.background, variables.color))
          .to.be.above(3)
      })
    })
  })

  describe('with the high contrast theme', function () {
    const variables = Avatar.generateTheme('a11y')

    describe('default', function () {
      it('should ensure background color and text color meet 4.5:1 contrast', function () {
        expect(contrast(variables.background, variables.color))
          .to.be.above(4.5)
      })
    })
  })
})
