import applyCustomMediaToCss from '../applyCustomMediaToCss'

describe('applyCustomMediaToCss', function () {
  it('applies custom media values to css text', function () {
    const cssText = `
      @media screen and (--Component-desktopMin) {
        .Component__root {
          color: blue;
          background-color: var(--Component-backgroundColor);
        }
      }`

    const variables = {
      '--Component-textColor': 'blue',
      '--Component-backgroundColor': 'yellow',
      '--Component-desktopMin': 'min-width: 56rem'
    }

    const transformedCss = applyCustomMediaToCss(cssText, variables)

    const expectedCss = `
      @media screen and (min-width: 56rem) {
        .Component__root {
          color: blue;
          background-color: var(--Component-backgroundColor);
        }
      }`

    expect(transformedCss).to.equalIgnoreSpaces(expectedCss)
  })
})
