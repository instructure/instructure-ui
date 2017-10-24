import {
  registerComponentTheme,
  generateTheme,
  generateComponentTheme,
  registerTheme,
  getRegistry,
  clearRegistry,
  setRegistry,
  makeTheme
} from '../registry'

describe('registry', () => {
  const testbed = new Testbed()

  const KEY = Symbol('ThemedComponent')
  const registry = getRegistry()

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

  const bar = { key: 'bar', variables: { red: 'magenta', brand: 'turquoise' } }
  const baz = { key: 'baz', variables: { red: 'pink' } }
  const accessible = {
    key: 'accessible',
    variables: { red: 'salmon', brand: 'purple' },
    immutable: true
  }

  const overrides = {
    red: 'red',
    blue: 'blue',
    green: 'green',
    purple: 'purple'
  }

  const defaultTheme = makeTheme({
    theme: bar,
    a11y: accessible
  })

  beforeEach(() => {
    clearRegistry()

    registerComponentTheme(KEY, generator)

    registerTheme(bar)
    registerTheme(baz)
    registerTheme(accessible)

    defaultTheme.use({ overrides })
  })

  afterEach(() => {
    setRegistry(registry)
  })

  describe('#makeUsable', () => {
    it('should allow configuring an accessible theme and provide a way to set it as the default', () => {
      defaultTheme.use({
        accessible: true
      })

      const theme = generateTheme()

      expect(theme[KEY].color).to.equal('salmon')
    })
  })

  describe('#generateTheme', () => {
    it('should preserve the default theme overrides when no theme key is specified', () => {
      const theme = generateTheme()

      expect(theme[KEY].color).to.equal('red')
    })
    it('should ignore the default theme overrides when a theme key is specified', () => {
      const theme = generateTheme('bar')

      expect(theme[KEY].color).to.equal('magenta')
    })
    it('should allow setting a non-default theme', () => {
      const theme = generateTheme('baz')

      expect(theme[KEY].color).to.equal('pink')
    })
    it('should use the theme specific generator function', () => {
      const theme = generateTheme('bar')

      expect(theme[KEY].linkColor).to.equal('turquoise')
    })
    it('should allow overriding the default theme', () => {
      const theme = generateTheme(null, {
        brand: 'yellow'
      })

      expect(theme[KEY].linkColor).to.equal('yellow')
    })
    it('should allow overriding a non-default theme', () => {
      const theme = generateTheme('baz', {
        red: 'maroon'
      })

      expect(theme[KEY].color).to.equal('maroon')
    })
    it('should NOT allow overriding an accessible theme', () => {
      console.error = testbed.stub()

      defaultTheme.use({ accessible: true })

      const theme = generateTheme(undefined, {
        red: 'maroon'
      })

      expect(theme[KEY].color).to.equal('salmon')
    })
  })

  describe('#generateComponentTheme', () => {
    it('should preserve the default theme overrides when no theme key is specified', () => {
      const theme = generateComponentTheme(KEY)

      expect(theme.color).to.equal('red')
    })
    it('should ignore the default theme overrides when a theme key is specified', () => {
      const theme = generateComponentTheme(KEY, 'bar')

      expect(theme.color).to.equal('magenta')
    })
    it('should allow setting a non-default theme', () => {
      const theme = generateComponentTheme(KEY, 'baz')

      expect(theme.color).to.equal('pink')
    })
    it('should use the theme specific generator function', () => {
      const theme = generateComponentTheme(KEY, 'bar')

      expect(theme.linkColor).to.equal('turquoise')
    })
    it('should use the theme specific generator function for the default theme', () => {
      const theme = generateComponentTheme(KEY)

      expect(theme.linkColor).to.equal('turquoise')
    })
    it('should allow overriding the default theme', () => {
      const theme = generateComponentTheme(KEY, null, {
        linkColor: 'yellow'
      })

      expect(theme.linkColor).to.equal('yellow')
    })
    it('should allow overriding a non-default theme', () => {
      const theme = generateComponentTheme(KEY, 'baz', {
        color: 'maroon'
      })

      expect(theme.color).to.equal('maroon')
    })
    it('should NOT allow overriding an accessible theme', () => {
      console.error = testbed.stub()

      defaultTheme.use({ accessible: true })

      const theme = generateComponentTheme(KEY, undefined, {
        color: 'maroon'
      })

      expect(theme.color).to.equal('salmon')
    })
    it('should generate a component theme when no themes are registered', () => {
      clearRegistry()

      registerComponentTheme(KEY, generator)

      const theme = generateComponentTheme(KEY)

      expect(theme).to.deep.equal({
        color: undefined,
        linkColor: undefined,
        buttonPrimaryColor: undefined,
        buttonPrimaryBackground: undefined
      })
    })
  })
})
