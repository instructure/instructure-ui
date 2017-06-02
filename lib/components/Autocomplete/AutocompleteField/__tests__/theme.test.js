import AutocompleteField from '../index'
import { contrast } from '../../../../util/color'

describe('AutocompleteField.theme', function () {
  describe('with the canvas theme', function () {
    const variables = AutocompleteField.generateTheme()

    it('should have a background and text colors that meet 3:1 contrast', function () {
      expect(contrast(variables.background, variables.color)).to.be.above(3)
    })

    it('should have a background and icon colors that meet 3:1 contrast', function () {
      expect(contrast(variables.background, variables.iconColor)).to.be.above(3)
    })

    it('should have a highlightedBackground and text colors that meet 3:1 contrast', function () {
      expect(contrast(variables.highlightedBackground, variables.activeLabelColor)).to.be.above(3)
    })

    it('should have an activeBackground and text colors that meet 3:1 contrast', function () {
      expect(contrast(variables.activeBackground, variables.activeLabelColor)).to.be.above(3)
    })
  })

  describe('with the accessible canvas theme', function () {
    const variables = AutocompleteField.generateTheme('canvas-a11y')

    it('should have a background and text colors that meet 4.5:1 contrast', function () {
      expect(contrast(variables.background, variables.color)).to.be.above(4.5)
    })

    it('should have a background and icon colors that meet 4.5:1 contrast', function () {
      expect(contrast(variables.background, variables.iconColor)).to.be.above(4.5)
    })

    it('should have a highlightedBackground and text colors that meet 4.5:1 contrast', function () {
      expect(contrast(variables.highlightedBackground, variables.activeLabelColor)).to.be.above(4.5)
    })

    it('should have an activeBackground and text colors that meet 4.5:1 contrast', function () {
      expect(contrast(variables.activeBackground, variables.activeLabelColor)).to.be.above(4.5)
    })
  })
})
