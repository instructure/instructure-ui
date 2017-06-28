import { contrast } from '../../../../util/color'
import TabPanel from '../index'

describe('TabPanel.theme', () => {
  describe('with the default theme', () => {
    const variables = TabPanel.generateTheme()

    describe('simple variant', () => {
      it('should ensure text and tab panel background meet 3:1 contrast', () => {
        expect(contrast(variables.color, variables.background))
          .to.be.above(3)
      })
    })
  })

  describe('with the "canvas-a11y" theme', () => {
    const variables = TabPanel.generateTheme('canvas-a11y')

    describe('simple variant', () => {
      it('should ensure text and tab panel background meet 4.5:1 contrast', () => {
        expect(contrast(variables.color, variables.background))
          .to.be.above(4.5)
      })
    })
  })
})
