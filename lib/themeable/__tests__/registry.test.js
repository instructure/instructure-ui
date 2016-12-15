import {
  registerThemeGenerator,
  generateTheme,
  setDefaultTheme,
  generateComponentTheme,
  registerTheme
} from '../registry'

describe('registry', function () {
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
      linkColor: vars.brand
    }
  }

  registerTheme('bar', { red: 'magenta', brand: 'turquoise' })
  registerTheme('baz', { red: 'pink' })

  beforeEach(function () {
    setDefaultTheme('bar', {
      red: 'red',
      blue: 'blue',
      green: 'green',
      purple: 'purple'
    })

    registerThemeGenerator(KEY, generator)
  })

  describe('#generateTheme', function () {
    it('should preserve the default theme overrides when no theme key is specified', function () {
      const theme = generateTheme()

      expect(theme[KEY].color).to.equal('red')
    })
    it('should ignore the default theme overrides when a theme key is specified', function () {
      const theme = generateTheme('bar')

      expect(theme[KEY].color).to.equal('magenta')
    })
    it('should allow setting a non-default theme', function () {
      const theme = generateTheme('baz')

      expect(theme[KEY].color).to.equal('pink')
    })
    it('should use the theme specific generator function', function () {
      const theme = generateTheme('bar')

      expect(theme[KEY].linkColor).to.equal('turquoise')
    })
    it('should allow overriding the default theme', function () {
      const theme = generateTheme(null, {
        brand: 'yellow'
      })

      expect(theme[KEY].linkColor).to.equal('yellow')
    })
    it('should allow overriding a non-default theme', function () {
      const theme = generateTheme('baz', {
        red: 'maroon'
      })

      expect(theme[KEY].color).to.equal('maroon')
    })
  })

  describe('#generateComponentTheme', function () {
    it('should preserve the default theme overrides when no theme key is specified', function () {
      const theme = generateComponentTheme(KEY)

      expect(theme.color).to.equal('red')
    })
    it('should ignore the default theme overrides when a theme key is specified', function () {
      const theme = generateComponentTheme(KEY, 'bar')

      expect(theme.color).to.equal('magenta')
    })
    it('should allow setting a non-default theme', function () {
      const theme = generateComponentTheme(KEY, 'baz')

      expect(theme.color).to.equal('pink')
    })
    it('should use the theme specific generator function', function () {
      const theme = generateComponentTheme(KEY, 'bar')

      expect(theme.linkColor).to.equal('turquoise')
    })
    it('should use the theme specific generator function for the default theme', function () {
      const theme = generateComponentTheme(KEY)

      expect(theme.linkColor).to.equal('turquoise')
    })
    it('should allow overriding the default theme', function () {
      const theme = generateComponentTheme(KEY, null, {
        brand: 'yellow'
      })

      expect(theme.linkColor).to.equal('yellow')
    })
    it('should allow overriding a non-default theme', function () {
      const theme = generateComponentTheme(KEY, 'baz', {
        red: 'maroon'
      })

      expect(theme.color).to.equal('maroon')
    })
  })
})
