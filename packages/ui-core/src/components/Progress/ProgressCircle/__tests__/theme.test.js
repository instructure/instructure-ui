import { contrast } from '@instructure/ui-themeable/lib/utils/color'
import ProgressCircle from '../index'

describe('ProgressCircle.theme', () => {
  describe('with the default theme', () => {
    const variables = ProgressCircle.generateTheme()

    describe('default', () => {
      it('should ensure meter color and track color meet 3:1 contrast', () => {
        expect(contrast(variables.meterColor, variables.trackColor))
          .to.be.above(3)
      })
    })
  })

  describe('with the "canvas-a11y" theme', () => {
    const variables = ProgressCircle.generateTheme('canvas-a11y')

    describe('default', () => {
      it('should ensure meter color and track color meet 4.5:1 contrast', () => {
        expect(contrast(variables.meterColor, variables.trackColor))
          .to.be.above(4.5)
      })
    })
  })
})
