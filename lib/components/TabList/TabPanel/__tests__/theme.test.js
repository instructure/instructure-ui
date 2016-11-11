import { contrast } from '../../../../util/color'
import TabPanel from '../index'

describe('TabPanel.theme', function () {
  describe('with the default theme', function () {
    const variables = TabPanel.generateTheme()

    describe('simple variant', function () {
      it('should ensure text and tab panel background meet 3:1 contrast', function () {
        expect(contrast(variables.color, variables.background))
          .to.be.above(3)
      })
    })
  })

  describe('with the a11y theme', function () {
    const variables = TabPanel.generateTheme('a11y')

    describe('simple variant', function () {
      it('should ensure text and tab panel background meet 4.5:1 contrast', function () {
        expect(contrast(variables.color, variables.background))
          .to.be.above(4.5)
      })
    })
  })
})
