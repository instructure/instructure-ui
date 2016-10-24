import CssTransformer from '../CssTransformer'

describe('CssTransformer', function () {
  describe('#scopeStypes', function () {
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
  })

  describe('#applyVariables', function () {
    it('applies variables to css text', function () {
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

  describe('#removeRulesWithoutVariables', function () {
    it('removes rules without variables from css text', function () {
      const cssText = `.Component__root {
          color: blue;
          background-color: var(--Component-backgroundColor);
        }`

      const transformedCss = CssTransformer.removeRulesWithoutVariables(cssText)

      const expectedCss = `.Component__root {
          background-color: var(--Component-backgroundColor);
        }`

      expect(transformedCss.replace(/\s/g, '')).to.eq(expectedCss.replace(/\s/g, ''))
    })
  })

  describe('#extractVariablesUsed', function () {
    it('extracts the variables used in css text', function () {
      const cssText = `.Component__root {
          color: var(--Component-textColor);
          background-color: var(--Component-backgroundColor);
        }`

      const variables = CssTransformer.extractVariablesUsed(cssText)

      expect(variables[0]).to.eq('--Component-textColor')
      expect(variables[1]).to.eq('--Component-backgroundColor')
    })
  })

  describe('#applyCustomMedia', function () {
    it('removes rules without variables from css text', function () {
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

      const transformedCss = CssTransformer.applyCustomMedia(cssText, variables)

      const expectedCss = `
        @media screen and (min-width: 56rem) {
          .Component__root {
            color: blue;
            background-color: var(--Component-backgroundColor);
          }
        }`

      expect(transformedCss.replace(/\s/g, '')).to.eq(expectedCss.replace(/\s/g, ''))
    })
  })

  describe('#removeVariables', function () {
    it('removes variables from css text', function () {
      const cssText = `
        :root {
          --Component-textColor: blue;
          --Component-backgroundColor: yellow;
        }

        .Component__root {
          color: var(--Component-textColor);
          background-color: var(--Component-backgroundColor);
        }

        .Component__element {
          color: red;
        }`

      const expectedCss = `
        .Component__element {
          color: red;
        }`

      const transformedCss = CssTransformer.removeVariables(cssText)

      expect(transformedCss.replace(/\s/g, '')).to.eq(expectedCss.replace(/\s/g, ''))
    })
  })
})
