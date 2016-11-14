import { contrast } from '../../../util/color'
import TextInput from '../index'

describe('TextInput.theme', function () {
  describe('with the default theme', function () {
    const variables = TextInput.generateTheme()

    describe('default', function () {
      it('should ensure focus color and background color meet 3:1 contrast', function () {
        expect(contrast(variables.background, variables.focus))
          .to.be.above(3)
      })
    })
  })

  describe('with the high contrast theme', function () {
    const variables = TextInput.generateTheme('a11y')

    describe('default', function () {
      it('should ensure focus color and background color meet 4.5:1 contrast', function () {
        expect(contrast(variables.background, variables.focus))
          .to.be.above(4.5)
      })
    })
  })
})
