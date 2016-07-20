import CssTransformer from '../CssTransformer'

describe('CssTransformer', function () {
  it('scopes css text', function () {
    const cssText = `
      .Component__root {
        color: var(--Component-textColor);
      }
      .Component__background {
        background-color: var(--Component-backgroundColor);
      }
    `
    const transformedCss = CssTransformer.scopeStyles(cssText, '[data-foo="bar"]')

    const scopedCss = `
      .Component__root[data-foo="bar"] {
        color: var(--Component-textColor);
      }

      .Component__background[data-foo="bar"] {
        background-color: var(--Component-backgroundColor);
      }
    `

    expect(transformedCss.replace(/\s/g, '')).to.eq(scopedCss.replace(/\s/g, ''))
  })

  it('applies variables', function () {
    const cssText = `.Component__root {
        color: var(--Component-textColor);
        background-color: var(--Component-backgroundColor);
      }`
    const variables = {
      '--Component-textColor': 'blue',
      '--Component-backgroundColor': 'yellow'
    }

    const transformedCss = CssTransformer.applyVariables(cssText, variables)

    const expectedCss = `.Component__root {
        color: blue;
        background-color: yellow;
      }`

    expect(transformedCss.replace(/\s/g, '')).to.eq(expectedCss.replace(/\s/g, ''))
  })
})
