import { contrast } from '@instructure/ui-themeable/lib/utils/color'
import Alert from '../index'

describe('Alert.theme', () => {
  describe('with the default theme', () => {
    const variables = Alert.generateTheme()

    describe('default', () => {
      it('should ensure text color and background color meet 3:1 contrast', () => {
        expect(contrast(variables.color, variables.background))
          .to.be.above(3)
      })
    })
  })

  describe('with the "canvas-a11y" theme', () => {
    const variables = Alert.generateTheme('canvas-a11y')

    describe('default', () => {
      it('should ensure text color and background color meet 3:1 contrast', () => {
        expect(contrast(variables.color, variables.background))
          .to.be.above(4.5)
      })
    })
  })
})
