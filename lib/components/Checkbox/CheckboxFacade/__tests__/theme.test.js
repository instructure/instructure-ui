import { contrast } from '../../../../util/color'
import CheckboxFacade from '../index'

describe('CheckboxFacade.theme', function () {
  describe('with the default theme', function () {
    const variables = CheckboxFacade.generateTheme()

    it('should ensure checkbox meets 3:1 contrast', function () {
      expect(contrast(variables.color, variables.checkedBackground))
        .to.be.above(3)
    })
  })

  describe('with the modern theme', function () {
    const variables = CheckboxFacade.generateTheme('modern')

    it('should ensure checkbox meets 3:1 contrast', function () {
      expect(contrast(variables.color, variables.checkedBackground))
        .to.be.above(3)
      expect(contrast(variables.labelColor, variables.background))
        .to.be.above(3)
      expect(contrast(variables.checkedLabelColor, variables.background))
        .to.be.above(3)
    })
  })

  describe('with the "canvas-a11y" theme', function () {
    const variables = CheckboxFacade.generateTheme('canvas-a11y')

    it('should ensure checkbox meets 4.5:1 contrast', function () {
      expect(contrast(variables.color, variables.checkedBackground))
        .to.be.above(4.5)
    })
  })
})
