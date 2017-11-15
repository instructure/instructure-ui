import { contrast } from '@instructure/ui-themeable/lib/utils/color'

import SelectField from '../index'

describe('SelectField.theme', () => {
  describe('with the canvas theme', () => {
    const variables = SelectField.generateTheme()

    it('should have a background and text colors that meet 3:1 contrast', () => {
      expect(contrast(variables.background, variables.color)).to.be.above(3)
    })

    it('should have a background and icon colors that meet 3:1 contrast', () => {
      expect(contrast(variables.background, variables.iconColor)).to.be.above(3)
    })
  })

  describe('with the accessible canvas theme', () => {
    const variables = SelectField.generateTheme('canvas-high-contrast')

    it('should have a background and text colors that meet 4.5:1 contrast', () => {
      expect(contrast(variables.background, variables.color)).to.be.above(4.5)
    })

    it('should have a background and icon colors that meet 4.5:1 contrast', () => {
      expect(contrast(variables.background, variables.iconColor)).to.be.above(4.5)
    })
  })
})
