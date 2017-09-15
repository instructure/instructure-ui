import { contrast } from '@instructure/ui-themeable/lib/utils/color'
import ProgressBar from '../index'

describe('ProgressBar.theme', () => {
  describe('with the default theme', () => {
    const variables = ProgressBar.generateTheme()

    describe('default', () => {
      it('should ensure meter gradient color and track color meet 3:1 contrast', () => {
        expect(contrast(variables.meterColorStart, variables.trackColor))
          .to.be.above(3)
      })
    })
  })

  describe('with the "canvas-a11y" theme', () => {
    const variables = ProgressBar.generateTheme('canvas-a11y')

    describe('default', () => {
      it('should ensure meter gradient color and track color meet 4.5:1 contrast', () => {
        expect(contrast(variables.meterColorStart, variables.trackColor))
          .to.be.above(4.5)
      })
    })
  })
})
