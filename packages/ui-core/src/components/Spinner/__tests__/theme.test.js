import { contrast } from '@instructure/ui-themeable/lib/utils/color'
import Spinner from '../index'

describe('Spinner.theme', () => {
  describe('with the default theme', () => {
    const variables = Spinner.generateTheme()

    describe('default', () => {
      it('should ensure meter color and track color meet 3:1 contrast', () => {
        expect(contrast(variables.color, variables.trackColor))
          .to.be.above(3)
      })
    })

    describe('inverse', () => {
      it('should ensure meter color and track color meet 3:1 contrast', () => {
        expect(contrast(variables.color, variables.trackColor))
          .to.be.above(3)
      })
    })
  })

  describe('with the "canvas-high-contrast" theme', () => {
    const variables = Spinner.generateTheme('canvas-high-contrast')

    describe('default', () => {
      it('should ensure meter color and track color meet 4.5:1 contrast', () => {
        expect(contrast(variables.color, variables.trackColor))
          .to.be.above(4.5)
      })
    })

    describe('inverse', () => {
      it('should ensure meter color and track color meet 4.5:1 contrast', () => {
        expect(contrast(variables.color, variables.trackColor))
          .to.be.above(4.5)
      })
    })
  })
})
