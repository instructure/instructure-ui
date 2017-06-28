import { contrast } from '../../../util/color'
import Table from '../index'

describe('Table.theme', () => {
  describe('with the default theme', () => {
    const variables = Table.generateTheme()

    describe('default', () => {
      it('should ensure text color and background color meet 3:1 contrast', () => {
        expect(contrast(variables.color, variables.background))
          .to.be.above(3)
      })
    })
  })

  describe('with the "canvas-a11y" theme', () => {
    const variables = Table.generateTheme('canvas-a11y')

    describe('default', () => {
      it('should ensure text color and background color meet 3:1 contrast', () => {
        expect(contrast(variables.color, variables.background))
          .to.be.above(4.5)
      })
    })
  })
})
