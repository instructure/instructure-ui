import { contrast } from '../../../util/color'
import Select from '../index'

describe('Select.theme', function () {
  describe('with the default theme', function () {
    const variables = Select.generateTheme()
    it('should ensure font color 3:1 contrast with background', function () {
      expect(contrast(variables.color, variables.background))
        .to.be.above(3)
    })
    it('should ensure focus border meets 3:1 contrast with background', function () {
      expect(contrast(variables.focus.borderColor, variables.background))
        .to.be.above(3)
    })
    it('should ensure focus outline meets 3:1 contrast with background', function () {
      expect(contrast(variables.focus.outlineColor, variables.background))
        .to.be.above(3)
    })
  })

  describe('with the a11y theme', function () {
    const variables = Select.generateTheme('a11y')
    it('should ensure font color 4.5:1 contrast with background', function () {
      expect(contrast(variables.color, variables.background))
        .to.be.above(4.5)
    })
    it('should ensure focus border meets 4.5:1 contrast with background', function () {
      expect(contrast(variables.focus.borderColor, variables.background))
        .to.be.above(4.5)
    })
    it('should ensure focus outline meets 4.5:1 contrast with background', function () {
      expect(contrast(variables.focus.outlineColor, variables.background))
        .to.be.above(4.5)
    })
  })
})
