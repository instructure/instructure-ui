import { contrast } from '@instructure/ui-themeable/lib/utils/color'

import Badge from '../index'

describe('Badge.theme', () => {
  describe('with the default theme', () => {
    const variables = Badge.generateTheme()

    it('should have a default background and text colors that meet 3:1 contrast', () => {
      expect(contrast(variables.colorPrimary, variables.color)).to.be.above(3)
    })
    it('should have a success variant background and text colors that meet 3:1 contrast', () => {
      expect(contrast(variables.colorSuccess, variables.color)).to.be.above(3)
    })
    it('should have a danger variant background and text colors that meet 3:1 contrast', () => {
      expect(contrast(variables.colorDanger, variables.color)).to.be.above(3)
    })
  })

  describe('with the high contrast canvas theme', () => {
    const variables = Badge.generateTheme('canvas-high-contrast')

    it('should have a default background and text colors that meet 3:1 contrast', () => {
      expect(contrast(variables.colorPrimary, variables.color)).to.be.above(4.5)
    })
    it('should have a success variant background and text colors that meet 3:1 contrast', () => {
      expect(contrast(variables.colorSuccess, variables.color)).to.be.above(4.5)
    })
    it('should have a danger variant background and text colors that meet 3:1 contrast', () => {
      expect(contrast(variables.colorDanger, variables.color)).to.be.above(4.5)
    })
  })
})
