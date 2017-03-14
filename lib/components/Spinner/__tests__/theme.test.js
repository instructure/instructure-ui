import { contrast } from '../../../util/color'
import Spinner from '../index'

describe('Spinner.theme', function () {
  describe('with the default theme', function () {
    const variables = Spinner.generateTheme()

    describe('default', function () {
      it('should ensure meter color and track color meet 3:1 contrast', function () {
        expect(contrast(variables.color, variables.trackColor))
          .to.be.above(3)
      })
    })

    describe('inverse', function () {
      it('should ensure meter color and track color meet 3:1 contrast', function () {
        expect(contrast(variables.color, variables.trackColor))
          .to.be.above(3)
      })
    })
  })

  describe('with the "canvas-a11y" theme', function () {
    const variables = Spinner.generateTheme('canvas-a11y')

    describe('default', function () {
      it('should ensure meter color and track color meet 4.5:1 contrast', function () {
        expect(contrast(variables.color, variables.trackColor))
          .to.be.above(4.5)
      })
    })

    describe('inverse', function () {
      it('should ensure meter color and track color meet 4.5:1 contrast', function () {
        expect(contrast(variables.color, variables.trackColor))
          .to.be.above(4.5)
      })
    })
  })
})
