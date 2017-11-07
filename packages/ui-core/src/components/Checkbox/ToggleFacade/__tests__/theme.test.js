import { contrast } from '@instructure/ui-themeable/lib/utils/color'
import ToggleFacade from '../index'

describe('ToggleFacade.theme', () => {
  describe('with the default theme', () => {
    const variables = ToggleFacade.generateTheme()

    it('should ensure icon meets 3:1 contrast', () => {
      expect(contrast(variables.uncheckedIconColor, variables.toggleBackground))
        .to.be.above(3)
    })

    it('should ensure icon meets 3:1 contrast when checked', () => {
      expect(contrast(variables.checkedIconColor, variables.toggleBackground))
        .to.be.above(3)
    })
  })

  describe('with the "canvas-high-contrast" theme', () => {
    const variables = ToggleFacade.generateTheme('canvas-high-contrast')

    it('should ensure icon meets 4.5:1 contrast', () => {
      expect(contrast(variables.uncheckedIconColor, variables.toggleBackground))
        .to.be.above(4.5)
    })

    it('should ensure icon meets 4.5:1 contrast when checked', () => {
      expect(contrast(variables.checkedIconColor, variables.toggleBackground))
        .to.be.above(4.5)
    })
  })
})
