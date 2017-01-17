import { contrast } from '../../../../util/color'
import MenuItem from '../index'

describe('MenuItem.theme', function () {
  describe('with the default theme', function () {
    const variables = MenuItem.generateTheme()

    it('should ensure label color and icon color meet 3:1 contrast with background', function () {
      expect(contrast(variables.background, variables.labelColor))
        .to.be.above(3)
      expect(contrast(variables.background, variables.iconColor))
        .to.be.above(3)
    })
    it('should ensure label and icon active colors meet 3:1 contrast with active background', function () {
      expect(contrast(variables.activeBackground, variables.activeLabelColor))
        .to.be.above(3)
      expect(contrast(variables.activeBackground, variables.activeIconColor))
        .to.be.above(3)
    })
  })

  describe('with the high contrast theme', function () {
    const variables = MenuItem.generateTheme('a11y')

    it('should ensure label color and icon color meet 4.5:1 contrast with background', function () {
      expect(contrast(variables.background, variables.labelColor))
        .to.be.above(4.5)
      expect(contrast(variables.background, variables.iconColor))
        .to.be.above(4.5)
    })
    it('should ensure label and icon active colors meet 4.5:1 contrast with active background', function () {
      expect(contrast(variables.activeBackground, variables.activeLabelColor))
        .to.be.above(4.5)
      expect(contrast(variables.activeBackground, variables.activeIconColor))
        .to.be.above(4.5)
    })
  })
})
