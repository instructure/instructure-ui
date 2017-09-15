import { contrast } from '@instructure/ui-themeable/lib/utils/color'

import FileDrop from '../index'

describe('FileDrop.theme', () => {
  describe('with the canvas theme', () => {
    const variables = FileDrop.generateTheme()
    it('should have background and hover highlight colors that meet 3:1 contrast', () => {
      expect(contrast(variables.backgroundColor, variables.hoverBorderColor)).to.be.above(3)
    })
    it('should have background and accepted highlight colors that meet 3:1 contrast', () => {
      expect(contrast(variables.backgroundColor, variables.acceptedColor)).to.be.above(3)
    })
    it('should have background and rejected highlight colors that meet 3:1 contrast', () => {
      expect(contrast(variables.backgroundColor, variables.rejectedColor)).to.be.above(3)
    })
  })

  describe('with the accessible canvas theme', () => {
    const variables = FileDrop.generateTheme('canvas-a11y')
    it('should have background and hover highlight colors that meet 4.5:1 contrast', () => {
      expect(contrast(variables.backgroundColor, variables.hoverBorderColor)).to.be.above(4.5)
    })
    it('should have background and accepted highlight colors that meet 4.5:1 contrast', () => {
      expect(contrast(variables.backgroundColor, variables.acceptedColor)).to.be.above(4.5)
    })
    it('should have background and rejected highlight colors that meet 4.5:1 contrast', () => {
      expect(contrast(variables.backgroundColor, variables.rejectedColor)).to.be.above(4.5)
    })
  })
})
