import Tag from '../index'
import { contrast } from '../../../util/color'

describe('Tag.theme', function () {
  describe('with the default theme', function () {
    const variables = Tag.generateTheme()

    it('should have a background and text colors that meet 3:1 contrast', function () {
      expect(contrast(variables.background, variables.textColor)).to.be.above(3)
    })
  })

  describe('with the accessible canvas theme', function () {
    const variables = Tag.generateTheme('canvas-a11y')

    it('should have a background and text colors that meet 4.5:1 contrast', function () {
      expect(contrast(variables.background, variables.textColor)).to.be.above(4.5)
    })
  })
})
