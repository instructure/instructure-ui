import {
  registerThemeGenerator,
  generateTheme,
  setDefaultTheme,
  generateComponentTheme,
  registerTheme
} from '../registry'

describe('registry', function () {
  const brandVariables = {
    'ic-brand-primary': 'pink',
    'ic-brand-button--primary-bgd': 'cyan',
    'ic-brand-button--primary-text': 'white',
    'ic-link-color': 'turquoise'
  }

  registerTheme('bar', { red: 'magenta' })

  setDefaultTheme({
    red: 'red',
    blue: 'blue',
    green: 'green',
    purple: 'purple'
  })

  const KEY = Symbol('ThemedComponent')

  const generator = function (vars) {
    return {
      color: vars.red,
      linkColor: vars.blue,
      buttonPrimaryColor: vars.green,
      buttonPrimaryBackground: vars.purple
    }
  }

  generator.bar = function (vars) {
    return {
      color: vars['ic-brand-primary']
    }
  }

  beforeEach(function () {
    registerThemeGenerator(KEY, generator)
  })

  describe('#generateTheme', function () {
    it('should generate a theme using the brand variables', function () {
      const theme = generateTheme('bar', brandVariables)

      expect(theme[KEY].color).to.equal(brandVariables['ic-brand-primary'])
    })
  })

  describe('#generateComponentTheme', function () {
    it('should generate a component theme using brand variables', function () {
      const theme = generateComponentTheme(KEY, 'bar', brandVariables)

      expect(theme.color).to.equal(brandVariables['ic-brand-primary'])
    })
  })
})
