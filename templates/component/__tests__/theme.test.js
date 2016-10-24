import theme from '../theme'
import Brands from '../../../theme/brands'
import { contrast } from '../../../util/color'

describe('${COMPONENT}.theme', function () {

  describe('with the default theme', function () {
    const variables = theme(Brands.inst)

    it('should have a background and text colors that meet 3:1 contrast', function () {
      expect(contrast(variables.background, variables.color)).to.be.above(3)
    })
  })

  describe('with the high contrast theme', function () {
    const variables = theme(Brands.a11y)

    it('should have a background and text colors that meet 4.5:1 contrast', function () {
      expect(contrast(variables.background, variables.color)).to.be.above(4.5)
    })
  })
})
