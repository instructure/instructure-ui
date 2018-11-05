/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { expect, stub } from '@instructure/ui-test-utils'
import {
  registerComponentTheme,
  generateTheme,
  generateComponentTheme,
  registerTheme,
  getRegistry,
  clearRegistry,
  setRegistry
} from '../registry'

describe('registry', async () => {
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

  let defaultTheme

  beforeEach(() => {
    clearRegistry()

    registerComponentTheme(KEY, generator)

    registerTheme(baz)

    defaultTheme = registerTheme({
      key: 'bar', variables: { red: 'magenta', brand: 'turquoise' },
      a11y: registerTheme(accessible)
    })

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
      console.error = stub()

      defaultTheme.use({ accessible: true })

      // eslint-disable-next-line no-undefined
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
      console.error = stub()

      defaultTheme.use({ accessible: true })

      // eslint-disable-next-line no-undefined
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
        color: undefined, // eslint-disable-line no-undefined
        linkColor: undefined, // eslint-disable-line no-undefined
        buttonPrimaryColor: undefined, // eslint-disable-line no-undefined
        buttonPrimaryBackground: undefined // eslint-disable-line no-undefined
      })
    })
  })
})
