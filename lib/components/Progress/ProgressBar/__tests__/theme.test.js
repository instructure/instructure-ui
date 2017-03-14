import { contrast } from '../../../../util/color'
import ProgressBar from '../index'

describe('ProgressBar.theme', function () {
  describe('with the default theme', function () {
    const variables = ProgressBar.generateTheme()

    describe('default', function () {
      it('should ensure meter gradient color and track color meet 3:1 contrast', function () {
        expect(contrast(variables.meterColorStart, variables.trackColor))
          .to.be.above(3)
      })
    })
  })

  describe('with the "canvas-a11y" theme', function () {
    const variables = ProgressBar.generateTheme('canvas-a11y')

    describe('default', function () {
      it('should ensure meter gradient color and track color meet 4.5:1 contrast', function () {
        expect(contrast(variables.meterColorStart, variables.trackColor))
          .to.be.above(4.5)
      })
    })
  })
})
