import { contrast } from '@instructure/ui-themeable/lib/utils/color'

import AutocompleteField from '../index'

describe('AutocompleteField.theme', () => {
  describe('with the canvas theme', () => {
    const variables = AutocompleteField.generateTheme()

    it('should have a background and text colors that meet 3:1 contrast', () => {
      expect(contrast(variables.background, variables.color)).to.be.above(3)
    })

    it('should have a background and icon colors that meet 3:1 contrast', () => {
      expect(contrast(variables.background, variables.iconColor)).to.be.above(3)
    })
  })

  describe('with the accessible canvas theme', () => {
    const variables = AutocompleteField.generateTheme('canvas-high-contrast')

    it('should have a background and text colors that meet 4.5:1 contrast', () => {
      expect(contrast(variables.background, variables.color)).to.be.above(4.5)
    })

    it('should have a background and icon colors that meet 4.5:1 contrast', () => {
      expect(contrast(variables.background, variables.iconColor)).to.be.above(4.5)
    })
  })
})
