import { contrast } from '../../../../util/color'
import ProgressBar from '../index'

describe('ProgressBar.theme', function () {
  describe('with the default theme', function () {
    const variables = ProgressBar.generateTheme()

    describe('default', function () {
      it('should ensure meter gradient color and track color meet 3:1 contrast', function () {
        expect(contrast(variables.meter.colorStart, variables.track.color))
          .to.be.above(3)
      })
    })
  })

  describe('with the high contrast theme', function () {
    const variables = ProgressBar.generateTheme('a11y')

    describe('default', function () {
      it('should ensure meter gradient color and track color meet 4.5:1 contrast', function () {
        expect(contrast(variables.meter.colorStart, variables.track.color))
          .to.be.above(4.5)
      })
    })
  })
})
