import { contrast } from '../../../../util/color'
import CheckboxFacade from '../index'

describe('CheckboxFacade.theme', function () {
  describe('with the default theme', function () {
    const variables = CheckboxFacade.generateTheme()

    it('should ensure checkbox meets 3:1 contrast', function () {
      expect(contrast(variables.color, variables.checked.background))
        .to.be.above(3)
    })
  })

  describe('with the a11y theme', function () {
    const variables = CheckboxFacade.generateTheme('a11y')

    it('should ensure checkbox meets 4.5:1 contrast', function () {
      expect(contrast(variables.color, variables.checked.background))
        .to.be.above(4.5)
    })
  })
})
