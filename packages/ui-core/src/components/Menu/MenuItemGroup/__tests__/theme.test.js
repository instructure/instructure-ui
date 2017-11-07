import { contrast } from '@instructure/ui-themeable/lib/utils/color'

import MenuItemGroup from '../index'

describe('MenuItemGroup.theme', () => {
  describe('with the canvas theme', () => {
    const variables = MenuItemGroup.generateTheme()

    it('should have a background and text colors that meet 3:1 contrast', () => {
      expect(contrast(variables.background, variables.color)).to.be.above(3)
    })
  })

  describe('with the high contrast canvas theme', () => {
    const variables = MenuItemGroup.generateTheme('canvas-high-contrast')

    it('should have a background and text colors that meet 4.5:1 contrast', () => {
      expect(contrast(variables.background, variables.color)).to.be.above(4.5)
    })
  })
})
