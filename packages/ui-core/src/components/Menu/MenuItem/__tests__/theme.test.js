import { contrast } from '@instructure/ui-themeable/lib/utils/color'
import MenuItem from '../index'

describe('MenuItem.theme', () => {
  describe('with the default theme', () => {
    const variables = MenuItem.generateTheme()

    it('should ensure label color and icon color meet 3:1 contrast with background', () => {
      expect(contrast(variables.background, variables.labelColor))
        .to.be.above(3)
      expect(contrast(variables.background, variables.iconColor))
        .to.be.above(3)
    })
    it('should ensure label and icon active colors meet 3:1 contrast with active background', () => {
      expect(contrast(variables.activeBackground, variables.activeLabelColor))
        .to.be.above(3)
      expect(contrast(variables.activeBackground, variables.activeIconColor))
        .to.be.above(3)
    })
  })

  describe('with the "canvas-a11y" theme', () => {
    const variables = MenuItem.generateTheme('canvas-a11y')

    it('should ensure label color and icon color meet 4.5:1 contrast with background', () => {
      expect(contrast(variables.background, variables.labelColor))
        .to.be.above(4.5)
      expect(contrast(variables.background, variables.iconColor))
        .to.be.above(4.5)
    })
    it('should ensure label and icon active colors meet 4.5:1 contrast with active background', () => {
      expect(contrast(variables.activeBackground, variables.activeLabelColor))
        .to.be.above(4.5)
      expect(contrast(variables.activeBackground, variables.activeIconColor))
        .to.be.above(4.5)
    })
  })
})
