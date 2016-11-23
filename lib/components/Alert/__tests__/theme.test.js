import { contrast } from '../../../util/color'
import Alert from '../index'

describe('Alert.theme', function () {
  describe('with the default theme', function () {
    const variables = Alert.generateTheme()

    describe('default', function () {
      it('should ensure text color and background color meet 3:1 contrast', function () {
        expect(contrast(variables.color, variables.background))
          .to.be.above(3)
      })
    })
  })

  describe('with the high contrast theme', function () {
    const variables = Alert.generateTheme('a11y')

    describe('default', function () {
      it('should ensure text color and background color meet 3:1 contrast', function () {
        expect(contrast(variables.color, variables.background))
          .to.be.above(4.5)
      })
    })
  })
})
