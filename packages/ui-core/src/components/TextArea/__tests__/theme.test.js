import { contrast } from '../../../util/color'
import TextArea from '../index'

describe('TextArea.theme', () => {
  describe('with the default theme', () => {
    const variables = TextArea.generateTheme()

    describe('default', () => {
      it('should ensure focus color and background color meet 3:1 contrast', () => {
        expect(contrast(variables.background, variables.focus))
          .to.be.above(3)
      })

      it('should ensure text color and background color meet 3:1 contrast', () => {
        expect(contrast(variables.color, variables.background))
          .to.be.above(3)
      })
    })
  })

  describe('with the accessible canvas theme', () => {
    const variables = TextArea.generateTheme('canvas-a11y')

    describe('default', () => {
      it('should ensure focus color and background color meet 4.5:1 contrast', () => {
        expect(contrast(variables.background, variables.focus))
          .to.be.above(4.5)
      })

      it('should ensure text color and background color meet 3:1 contrast', () => {
        expect(contrast(variables.color, variables.background))
          .to.be.above(4.5)
      })
    })
  })
})
