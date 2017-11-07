import { contrast } from '@instructure/ui-themeable/lib/utils/color'
import RadioInput from '../index'

describe('RadioInput.theme', () => {
  describe('with the default theme', () => {
    const variables = RadioInput.generateTheme()

    it('should ensure toggle text meets 3:1 contrast with success-state background', () => {
      expect(contrast(variables.toggleBackgroundSuccess, variables.toggleHandleText))
        .to.be.above(3)
    })
    it('should ensure toggle text meets 3:1 contrast with off-state background', () => {
      expect(contrast(variables.toggleBackgroundOff, variables.toggleHandleText))
        .to.be.above(3)
    })
    it('should ensure toggle text meets 3:1 contrast with warning-state background', () => {
      expect(contrast(variables.toggleBackgroundWarning, variables.toggleHandleText))
        .to.be.above(3)
    })
    it('should ensure toggle text meets 3:1 contrast with danger-state background', () => {
      expect(contrast(variables.toggleBackgroundDanger, variables.toggleHandleText))
        .to.be.above(3)
    })
  })

  describe('with the "canvas-high-contrast" theme', () => {
    const variables = RadioInput.generateTheme('canvas-high-contrast')

    it('should ensure toggle text meets 4.5:1 contrast with success-state background', () => {
      expect(contrast(variables.toggleBackgroundSuccess, variables.toggleHandleText))
        .to.be.above(4.5)
    })
    it('should ensure toggle text meets 4.5:1 contrast with off-state background', () => {
      expect(contrast(variables.toggleBackgroundOff, variables.toggleHandleText))
        .to.be.above(4.5)
    })
    it('should ensure toggle text meets 4.5:1 contrast with warning-state background', () => {
      expect(contrast(variables.toggleBackgroundWarning, variables.toggleHandleText))
        .to.be.above(4.5)
    })
    it('should ensure toggle text meets 4.5:1 contrast with danger-state background', () => {
      expect(contrast(variables.toggleBackgroundDanger, variables.toggleHandleText))
        .to.be.above(4.5)
    })
  })
})
