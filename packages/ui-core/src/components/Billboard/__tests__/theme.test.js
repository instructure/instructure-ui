import { contrast } from '@instructure/ui-themeable/lib/utils/color'

import Billboard from '../index'

describe('Billboard.theme', () => {
  describe('with the canvas theme', () => {
    const variables = Billboard.generateTheme()

    it('should have message text color that meets 3:1 contrast with the background color', () => {
      expect(contrast(variables.messageColor, variables.backgroundColor)).to.be.above(3)
      expect(contrast(variables.messageColorClickable, variables.backgroundColor)).to.be.above(3)
    })
  })

  describe('with the high contrast canvas theme', () => {
    const variables = Billboard.generateTheme('canvas-high-contrast')

    it('should have message text color that meets 4.5:1 contrast with the background color', () => {
      expect(contrast(variables.messageColor, variables.backgroundColor)).to.be.above(4.5)
      expect(contrast(variables.messageColorClickable, variables.backgroundColor)).to.be.above(4.5)
    })
  })
})
