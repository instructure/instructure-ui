import { contrast } from '../../../../util/color'
import ToggleFacade from '../index'

describe('ToggleFacade.theme', function () {
  describe('with the default theme', function () {
    const variables = ToggleFacade.generateTheme()

    it('should ensure handle meets 3:1 contrast', function () {
      expect(contrast(variables.handle.background, variables.background))
        .to.be.above(3)
    })

    it('should ensure handle meets 3:1 contrast when checked', function () {
      expect(contrast(variables.handle.background, variables.checked.background))
        .to.be.above(3)
    })

    it('should ensure icon meets 3:1 contrast', function () {
      expect(contrast(variables.color, variables.background))
        .to.be.above(3)
    })

    it('should ensure icon meets 3:1 contrast when checked', function () {
      expect(contrast(variables.color, variables.checked.background))
        .to.be.above(3)
    })
  })

  describe('with the a11y theme', function () {
    const variables = ToggleFacade.generateTheme('a11y')

    it('should ensure handle meets 4.5:1 contrast', function () {
      expect(contrast(variables.handle.background, variables.background))
        .to.be.above(4.5)
    })

    it('should ensure handle meets 4.5:1 contrast when checked', function () {
      expect(contrast(variables.handle.background, variables.checked.background))
        .to.be.above(4.5)
    })

    it('should ensure icon meets 4.5:1 contrast', function () {
      expect(contrast(variables.color, variables.background))
        .to.be.above(4.5)
    })

    it('should ensure icon meets 4.5:1 contrast when checked', function () {
      expect(contrast(variables.color, variables.checked.background))
        .to.be.above(4.5)
    })
  })
})
