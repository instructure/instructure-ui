import { contrast } from '../../../util/color'
import TextArea from '../index'

describe('TextArea.theme', function () {
  describe('with the default theme', function () {
    const variables = TextArea.generateTheme()

    describe('default', function () {
      it('should ensure focus color and background color meet 3:1 contrast', function () {
        expect(contrast(variables.background, variables.focus))
          .to.be.above(3)
      })

      it('should ensure text color and background color meet 3:1 contrast', function () {
        expect(contrast(variables.color, variables.background))
          .to.be.above(3)
      })
    })
  })

  describe('with the accessible canvas theme', function () {
    const variables = TextArea.generateTheme('canvas-a11y')

    describe('default', function () {
      it('should ensure focus color and background color meet 4.5:1 contrast', function () {
        expect(contrast(variables.background, variables.focus))
          .to.be.above(4.5)
      })

      it('should ensure text color and background color meet 3:1 contrast', function () {
        expect(contrast(variables.color, variables.background))
          .to.be.above(4.5)
      })
    })
  })
})
