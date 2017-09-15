import { getCssTextWithPolyfill, getCssTextWithVariables } from '../getCssText'

describe('getCssText', () => {
  const prefix = 'ThemeableComponent'

  describe('#getCssTextWithVariables', () => {
    it('namespaces variable names and appends the defaults', () => {
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
    it('replaces custom media with values', () => {
      const template = function (theme) {
        return `
          .ThemeableComponent__root {
            @media screen and (--largeMin) {
              width: 100%;
            }
          }

          @media screen and (--largeMin) {
            .ThemeableComponent__root {
              width: 100%;
            }
          }
        `
      }
      const variables = { largeMin: 'min-width: 62em' }
      expect(getCssTextWithVariables(template, variables, prefix))
        .to.equalIgnoreSpaces(`
          .ThemeableComponent__root {
            @media screen and (min-width: 62em) {
              width: 100%;
            }
          }

          @media screen and (min-width: 62em) {
            .ThemeableComponent__root {
              width: 100%;
            }
          }

          :root {
            --ThemeableComponent-largeMin: min-width: 62em;
          }
        `)
    })
  })

  describe('#getCssTextWithPolyfill', () => {
    it('inserts default values', () => {
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
    it('replaces custom media with values', () => {
      const template = function (theme) {
        return `
          .ThemeableComponent__root {
            @media screen and (--largeMin) {
              width: 100%;
            }
          }
        `
      }
      const variables = { largeMin: 'min-width: 62em' }
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
