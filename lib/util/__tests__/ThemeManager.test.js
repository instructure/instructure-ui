import ThemeManager from '../ThemeManager'

describe('ThemeManager', function () {
  const brandVariables = {
    'ic-brand-primary': 'pink',
    'ic-brand-button--primary-bgd': 'cyan',
    'ic-brand-button--primary-text': 'white',
    'ic-link-color': 'turquoise'
  }

  const themeManager = new ThemeManager({
    'foo': {
      red: 'red',
      blue: 'blue',
      green: 'green',
      purple: 'purple'
    },
    'bar': {
      red: 'magenta'
    }
  }, 'foo')

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
    themeManager.registerThemeGenerator(KEY, generator)
  })

  describe('#generateTheme', function () {
    it('should generate a theme using the brand variables', function () {
      const theme = themeManager.generateTheme('bar', brandVariables)

      expect(theme[KEY].color).to.equal(brandVariables['ic-brand-primary'])
    })
  })

  describe('#generateComponentTheme', function () {
    it('should generate a component theme using brand variables', function () {
      const theme = themeManager.generateComponentTheme(KEY, 'bar', brandVariables)

      expect(theme.color).to.equal(brandVariables['ic-brand-primary'])
    })
  })
})

