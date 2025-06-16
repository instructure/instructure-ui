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
import { vi, expect } from 'vitest'
import type { MockInstance } from 'vitest'
import type { BaseTheme } from '@instructure/shared-types'
import { ThemeRegistry } from '../ThemeRegistry'
const defaultRegistry = ThemeRegistry.getRegistry()

const baseTheme = {
  borders: {},
  breakpoints: {},
  colors: {},
  forms: {},
  media: {},
  shadows: {},
  spacing: {},
  stacking: {},
  transitions: {},
  typography: {}
}

describe('ThemeRegistry', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    ThemeRegistry.clearRegistry()

    // Mocking console to prevent test output pollution
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as MockInstance
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    ThemeRegistry.setRegistry(defaultRegistry)

    consoleWarningMock.mockRestore()
    consoleErrorMock.mockRestore()
  })

  it('should instantiate registry correctly', async () => {
    const registry = ThemeRegistry.getRegistry()

    expect(registry).not.toEqual({})
    expect(registry).toEqual({
      currentThemeKey: null,
      themes: {},
      registered: []
    })
  })

  it('should be able to register themes', async () => {
    const theme = {
      ...baseTheme,
      key: 'test_theme',
      colors: {
        brand: 'red',
        other: 'magenta'
      }
    }
    ThemeRegistry.registerTheme(theme as unknown as BaseTheme)
    const registry = ThemeRegistry.getRegistry()

    expect(registry.registered).toContain(theme.key)
    expect(Object.keys(registry.themes)).toContain(theme.key)
    expect(registry.themes[theme.key]).not.toEqual({})
  })

  it('should be able to get the current theme', async () => {
    const theme = {
      ...baseTheme,
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

    expect(registry.currentThemeKey).toBe(theme.key)
    expect(ThemeRegistry.getCurrentTheme()).toEqual(registeredTheme)
  })

  it('should be able to override themes with ".use()"', async () => {
    const theme = {
      ...baseTheme,
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
          primitives: {
            white: 'blue'
          }
        }
      }
    })
    expect(ThemeRegistry.getCurrentTheme()?.colors?.primitives?.white).toBe(
      'blue'
    )
  })

  it('should throw an error when not a valid theme is registered', async () => {
    const theme = {
      key: 'my-theme'
    }

    expect(() => {
      const registeredTheme = ThemeRegistry.registerTheme(
        theme as unknown as BaseTheme
      )
      registeredTheme.use()
    }).toThrow(Error)
  })
})
