import { contrast } from '../../../util/color'
import Table from '../index'

describe('Table.theme', function () {
  describe('with the default theme', function () {
    const variables = Table.generateTheme()

    describe('default', function () {
      it('should ensure text color and background color meet 3:1 contrast', function () {
        expect(contrast(variables.color, variables.background))
          .to.be.above(3)
      })
    })
  })

  describe('with the "canvas-a11y" theme', function () {
    const variables = Table.generateTheme('canvas-a11y')

    describe('default', function () {
      it('should ensure text color and background color meet 3:1 contrast', function () {
        expect(contrast(variables.color, variables.background))
          .to.be.above(4.5)
      })
    })
  })
})
