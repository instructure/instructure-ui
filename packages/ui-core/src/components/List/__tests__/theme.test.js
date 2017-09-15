import List from '../index'
import { contrast } from '../../../util/color'

describe('List.theme', () => {
  describe('with the default theme', () => {
    const variables = List.generateTheme()

    it('should have a background and default text colors that meet 3:1 contrast', () => {
      expect(contrast(variables.background, variables.color)).to.be.above(3)
    })

    it('should have a background and pipe variant text colors that meet 3:1 contrast', () => {
      expect(contrast(variables.background, variables.pipeColor)).to.be.above(3)
    })
  })

  describe('with the accessible canvas theme', () => {
    const variables = List.generateTheme('canvas-a11y')

    it('should have a background and default text colors that meet 4.5:1 contrast', () => {
      expect(contrast(variables.background, variables.color)).to.be.above(4.5)
    })

    it('should have a background and pipe variant text colors that meet 4.5:1 contrast', () => {
      expect(contrast(variables.background, variables.pipeColor)).to.be.above(4.5)
    })
  })
})
