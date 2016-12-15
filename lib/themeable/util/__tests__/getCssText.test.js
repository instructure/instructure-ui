import { getCssTextWithPolyfill, getCssTextWithVariables } from '../getCssText'

describe('getCssText', function () {
  const prefix = 'ThemeableComponent'

  describe('#getCssTextWithVariables', function () {
    it('namespaces variable names and appends the defaults', function () {
      const template = function (theme) {
        return `
          .ThemeableComponent__root {
            color: ${theme.color};
            background: ${theme.background};
          }
        `
      }
      const variables = { color: 'purple', background: 'white' }

      expect(getCssTextWithVariables(template, variables, prefix))
        .to.equalIgnoreSpaces(`
          .ThemeableComponent__root {
            color: var(--ThemeableComponent-color);
            background: var(--ThemeableComponent-background);
          }
          :root {
            --ThemeableComponent-color: purple;
            --ThemeableComponent-background: white;
          }
        `)
    })
    it('replaces custom media with values', function () {
      const template = function (theme) {
        return `
          .ThemeableComponent__root {
            @media screen and (--desktopMin) {
              width: 100%;
            }
          }
        `
      }
      const variables = { desktopMin: 'min-width: 62em' }
      expect(getCssTextWithVariables(template, variables, prefix))
        .to.equalIgnoreSpaces(`
          .ThemeableComponent__root {
            @media screen and (min-width: 62em) {
              width: 100%;
            }
          }


          :root {
            --ThemeableComponent-desktopMin: min-width: 62em;
          }
        `)
    })
  })

  describe('#getCssTextWithPolyfill', function () {
    it('inserts default values', function () {
      const template = function (theme) {
        return `
          .ThemeableComponent__root {
            color: ${theme.color};
            background: ${theme.background};
          }
        `
      }
      const variables = { color: 'purple', background: 'white' }

      expect(getCssTextWithPolyfill(template, variables))
        .to.equalIgnoreSpaces(`
          .ThemeableComponent__root {
            color: purple;
            background: white;
          }
        `)
    })
    it('replaces custom media with values', function () {
      const template = function (theme) {
        return `
          .ThemeableComponent__root {
            @media screen and (--desktopMin) {
              width: 100%;
            }
          }
        `
      }
      const variables = { desktopMin: 'min-width: 62em' }
      expect(getCssTextWithPolyfill(template, variables))
        .to.equalIgnoreSpaces(`
          .ThemeableComponent__root {
            @media screen and (min-width: 62em) {
              width: 100%;
            }
          }
        `)
    })
  })
})
