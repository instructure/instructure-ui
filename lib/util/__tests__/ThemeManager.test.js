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
    'canvas': brandVariables
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

  generator.canvas = function (vars) {
    return {
      color: vars['ic-brand-primary'],
      linkColor: vars['ic-link-color'],
      buttonPrimaryColor: vars['ic-brand-button--primary-text'],
      buttonPrimaryBackground: vars['ic-brand-button--primary-bgd']
    }
  }

  beforeEach(function () {
    themeManager.registerThemeGenerator(KEY, generator)
  })

  describe('#generateTheme', function () {
    it('should generate a theme using the brand variables', function () {
      const theme = themeManager.generateTheme('canvas', brandVariables)

      expect(theme[KEY].color).to.equal(brandVariables['ic-brand-primary'])
      expect(theme[KEY].linkColor).to.equal(brandVariables['ic-link-color'])
      expect(theme[KEY].buttonPrimaryColor).to.equal(brandVariables['ic-brand-button--primary-text'])
      expect(theme[KEY].buttonPrimaryBackground).to.equal(brandVariables['ic-brand-button--primary-bgd'])
    })
  })

  describe('#generateComponentTheme', function () {
    it('should generate a component theme using brand variables', function () {
      const theme = themeManager.generateComponentTheme(KEY, 'canvas', brandVariables)

      expect(theme.color).to.equal(brandVariables['ic-brand-primary'])
      expect(theme.linkColor).to.equal(brandVariables['ic-link-color'])
      expect(theme.buttonPrimaryColor).to.equal(brandVariables['ic-brand-button--primary-text'])
      expect(theme.buttonPrimaryBackground).to.equal(brandVariables['ic-brand-button--primary-bgd'])
    })
  })
})

