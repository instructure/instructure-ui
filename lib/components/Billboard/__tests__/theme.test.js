import Billboard from '../index'
import { contrast } from '../../../util/color'

describe('Billboard.theme', function () {
  describe('with the canvas theme', function () {
    const variables = Billboard.generateTheme()

    it('should have message text color that meets 3:1 contrast with the background color', function () {
      expect(contrast(variables.messageColor, variables.backgroundColor)).to.be.above(3)
      expect(contrast(variables.messageColorClickable, variables.backgroundColor)).to.be.above(3)
    })
  })

  describe('with the accessible canvas theme', function () {
    const variables = Billboard.generateTheme('canvas-a11y')

    it('should have message text color that meets 4.5:1 contrast with the background color', function () {
      expect(contrast(variables.messageColor, variables.backgroundColor)).to.be.above(4.5)
      expect(contrast(variables.messageColorClickable, variables.backgroundColor)).to.be.above(4.5)
    })
  })
})
