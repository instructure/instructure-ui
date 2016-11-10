import { contrast } from '../../../../util/color'
import RadioInputFacade from '../index'

describe('RadioInputFacade.theme', function () {
  describe('with the default theme', function () {
    const variables = RadioInputFacade.generateTheme()

    it('should ensure focus meets 3:1 contrast with background', function () {
      expect(contrast(variables.background, variables.focus))
        .to.be.above(3)
    })
    it('should ensure toggle handle meets 3:1 contrast with background', function () {
      expect(contrast(variables.toggleHandleBackground, variables.toggleHandleColor))
        .to.be.above(3)
    })
  })

  describe('with the a11y theme', function () {
    const variables = RadioInputFacade.generateTheme('a11y')

    it('should ensure focus meets 4.5:1 contrast with background', function () {
      expect(contrast(variables.background, variables.focus))
        .to.be.above(4.5)
    })
    it('should ensure toggle handle meets 4.5:1 contrast with background', function () {
      expect(contrast(variables.toggleHandleBackground, variables.toggleHandleColor))
        .to.be.above(4.5)
    })
  })
})
