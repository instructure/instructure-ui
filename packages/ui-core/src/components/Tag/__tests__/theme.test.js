import { contrast } from '@instructure/ui-themeable/lib/utils/color'

import Tag from '../index'

describe('Tag.theme', () => {
  const variants = ['default', 'inline']

  context('with the default theme', () => {
    const variables = Tag.generateTheme()

    variants.forEach((variant) => {
      context(`with the ${variant} variant`, () => {
        it('should have a background and text colors that meet 3:1 contrast', () => {
          expect(contrast(
            variables[`${variant}Background`],
            variables[`${variant}TextColor`]
          )).to.be.above(3)
        })
      })
    })
  })

  describe('with the accessible canvas theme', () => {
    const variables = Tag.generateTheme('canvas-a11y')

    variants.forEach((variant) => {
      context(`with the ${variant} variant`, () => {
        it('should have a background and text colors that meet 4.5:1 contrast', () => {
          expect(contrast(
            variables[`${variant}Background`],
            variables[`${variant}TextColor`]
          )).to.be.above(4.5)
        })
      })
    })
  })
})
