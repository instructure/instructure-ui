import { contrast } from '../../../../util/color'
import ProgressCircle from '../index'

describe('ProgressCircle.theme', function () {
  describe('with the default theme', function () {
    const variables = ProgressCircle.generateTheme()

    describe('default', function () {
      it('should ensure meter color and track color meet 3:1 contrast', function () {
        expect(contrast(variables.meterColor, variables.trackColor))
          .to.be.above(3)
      })
    })
  })

  describe('with the high contrast theme', function () {
    const variables = ProgressCircle.generateTheme('a11y')

    describe('default', function () {
      it('should ensure meter color and track color meet 4.5:1 contrast', function () {
        expect(contrast(variables.meterColor, variables.trackColor))
          .to.be.above(4.5)
      })
    })
  })
})
