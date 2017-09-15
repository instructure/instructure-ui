import DateInput from '../index'
import { contrast } from '../../../util/color'

describe('DateInput.theme', () => {
  describe('with the canvas theme', () => {
    const variables = DateInput.generateTheme()

    it('should have a background and text colors that meet 3:1 contrast', () => {
      expect(contrast(variables.background, variables.color)).to.be.above(3)
    })
  })

  describe('with the accessible canvas theme', () => {
    const variables = DateInput.generateTheme('canvas-a11y')

    it('should have a background and text colors that meet 4.5:1 contrast', () => {
      expect(contrast(variables.background, variables.color)).to.be.above(4.5)
    })
  })
})
