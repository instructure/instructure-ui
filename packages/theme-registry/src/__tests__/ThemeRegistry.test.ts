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
import { BaseTheme } from '@instructure/shared-types'
import { expect } from '@instructure/ui-test-utils'
import { ThemeRegistry } from '../ThemeRegistry'

describe('ThemeRegistry', () => {
  it('should instantiate registry correctly', async () => {
    const registry = ThemeRegistry.getRegistry()

    expect(registry).to.not.be.empty()
    expect(registry).to.eql({
      currentThemeKey: null,
      themes: {},
      registered: []
    })
  })

  it('should be able to register themes', async () => {
    const theme = {
      key: 'test_theme',
      colors: {
        brand: 'red',
        other: 'magenta'
      }
    }
    ThemeRegistry.registerTheme(theme as unknown as BaseTheme)
    const registry = ThemeRegistry.getRegistry()

    expect(registry.registered).to.contain(theme.key)
    expect(registry.themes).to.have.key(theme.key)
    expect(registry.themes[theme.key]).to.not.be.empty()
    expect(registry.themes[theme.key].colors.brand).to.be.eq('red')
  })

  it('should be able to get the current theme', async () => {
    const theme = {
      key: 'test_theme',
      colors: {
        brand: 'red',
        other: 'magenta'
      }
    }
    const registeredTheme = ThemeRegistry.registerTheme(
      theme as unknown as BaseTheme
    )
    registeredTheme.use()

    const registry = ThemeRegistry.getRegistry()

    expect(registry.currentThemeKey).to.be.eq(theme.key)
    expect(ThemeRegistry.getCurrentTheme()).to.be.eql(registeredTheme)
  })
  it('should be able to override themes with ".use()"', async () => {
    const theme = {
      key: 'test_theme',
      colors: {
        brand: 'red',
        other: 'magenta'
      }
    }
    const registeredTheme = ThemeRegistry.registerTheme(
      theme as unknown as BaseTheme
    )
    registeredTheme.use({
      overrides: {
        colors: {
          brand: 'blue'
        }
      }
    })
    expect(ThemeRegistry.getCurrentTheme()?.colors.brand).to.be.eq('blue')
  })
})
