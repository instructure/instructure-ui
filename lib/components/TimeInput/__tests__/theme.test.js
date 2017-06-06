import TimeInput from '../index'
import { contrast } from '../../../util/color'

describe('TimeInput.theme', function () {
  describe('with the default theme', function () {
    const variables = TimeInput.generateTheme()

    it('should have a background and text colors that meet 3:1 contrast', function () {
      expect(contrast(variables.background, variables.color)).to.be.above(3)
    })
  })

  describe('with the accessible canvas theme', function () {
    const variables = TimeInput.generateTheme('canvas-a11y')

    it('should have a background and text colors that meet 4.5:1 contrast', function () {
      expect(contrast(variables.background, variables.color)).to.be.above(4.5)
    })
  })
})
