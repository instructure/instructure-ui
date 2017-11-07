import { contrast } from '@instructure/ui-themeable/lib/utils/color'
import Select from '../index'

describe('Select.theme', () => {
  describe('with the default theme', () => {
    const variables = Select.generateTheme()
    it('should ensure font color 3:1 contrast with background', () => {
      expect(contrast(variables.color, variables.background))
        .to.be.above(3)
    })
    it('should ensure focus border meets 3:1 contrast with background', () => {
      expect(contrast(variables.focusBorderColor, variables.background))
        .to.be.above(3)
    })
    it('should ensure focus outline meets 3:1 contrast with background', () => {
      expect(contrast(variables.focusOutlineColor, variables.background))
        .to.be.above(3)
    })
  })

  describe('with the "canvas-high-contrast" theme', () => {
    const variables = Select.generateTheme('canvas-high-contrast')
    it('should ensure font color 4.5:1 contrast with background', () => {
      expect(contrast(variables.color, variables.background))
        .to.be.above(4.5)
    })
    it('should ensure focus border meets 4.5:1 contrast with background', () => {
      expect(contrast(variables.focusBorderColor, variables.background))
        .to.be.above(4.5)
    })
    it('should ensure focus outline meets 4.5:1 contrast with background', () => {
      expect(contrast(variables.focusOutlineColor, variables.background))
        .to.be.above(4.5)
    })
  })
})
