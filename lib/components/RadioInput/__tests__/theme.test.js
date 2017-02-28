import { contrast } from '../../../util/color'
import RadioInput from '../index'

describe('RadioInput.theme', function () {
  describe('with the default theme', function () {
    const variables = RadioInput.generateTheme()

    it('should ensure toggle text meets 3:1 contrast with success-state background', function () {
      expect(contrast(variables.toggleBackgroundSuccess, variables.toggleHandleText))
        .to.be.above(3)
    })
    it('should ensure toggle text meets 3:1 contrast with off-state background', function () {
      expect(contrast(variables.toggleBackgroundOff, variables.toggleHandleText))
        .to.be.above(3)
    })
    it('should ensure toggle text meets 3:1 contrast with warning-state background', function () {
      expect(contrast(variables.toggleBackgroundWarning, variables.toggleHandleText))
        .to.be.above(3)
    })
    it('should ensure toggle text meets 3:1 contrast with danger-state background', function () {
      expect(contrast(variables.toggleBackgroundDanger, variables.toggleHandleText))
        .to.be.above(3)
    })
  })

  describe('with the a11y theme', function () {
    const variables = RadioInput.generateTheme('a11y')

    it('should ensure toggle text meets 4.5:1 contrast with success-state background', function () {
      expect(contrast(variables.toggleBackgroundSuccess, variables.toggleHandleText))
        .to.be.above(4.5)
    })
    it('should ensure toggle text meets 4.5:1 contrast with off-state background', function () {
      expect(contrast(variables.toggleBackgroundOff, variables.toggleHandleText))
        .to.be.above(4.5)
    })
    it('should ensure toggle text meets 4.5:1 contrast with warning-state background', function () {
      expect(contrast(variables.toggleBackgroundWarning, variables.toggleHandleText))
        .to.be.above(4.5)
    })
    it('should ensure toggle text meets 4.5:1 contrast with danger-state background', function () {
      expect(contrast(variables.toggleBackgroundDanger, variables.toggleHandleText))
        .to.be.above(4.5)
    })
  })
})
