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

import { vi } from 'vitest'
import type { MockInstance } from 'vitest'
import canvas from '@instructure/ui-themes'
import { getComponentThemeOverride } from '../getComponentThemeOverride'

const componentName = 'ExampleComponent'
const componentId = 'Example.Component'

describe('@getComponentThemeOverride', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as MockInstance
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    consoleWarningMock.mockRestore()
    consoleErrorMock.mockRestore()
  })

  describe('should return empty object', () => {
    it('if there is no theme set', async () => {
      const override = getComponentThemeOverride(
        {},
        componentName,
        componentId,
        {}
      )
      expect(override).toEqual({})
    })

    it('if there is no override set', async () => {
      const override = getComponentThemeOverride(
        canvas,
        componentName,
        componentId,
        {}
      )

      expect(override).toEqual({})
    })
  })

  describe('should return the correct override', () => {
    it('if there is `themeOverride` set on the props', async () => {
      const componentOverride = {
        componentColor: 'rgb(150, 0, 0)'
      }
      const override = getComponentThemeOverride(
        canvas,
        componentName,
        componentId,
        {
          themeOverride: componentOverride
        }
      )

      expect(override).toEqual(componentOverride)
    })

    it('if the `themeOverride` prop is a function', async () => {
      const theme = {
        backgroundGreen: 'rgb(0, 150, 0)',
        backgroundBlue: 'rgb(0, 0, 150)',
        backgroundDark: 'rgb(0, 0, 0)'
      }

      const override = getComponentThemeOverride(
        canvas,
        componentName,
        componentId,
        {
          themeOverride: (componentTheme, currentTheme) => ({
            backgroundBlue: componentTheme.backgroundGreen,
            backgroundDark: currentTheme.colors.contrasts.white1010
          })
        },
        theme
      )

      expect(override).toEqual({
        backgroundBlue: 'rgb(0, 150, 0)',
        backgroundDark: '#FFFFFF'
      })
    })

    it('if `themeOverride` and `componentOverrides` are both set', async () => {
      const override = getComponentThemeOverride(
        {
          ...canvas,
          componentOverrides: {
            [componentName]: {
              componentColor: 'rgb(0, 0, 150)'
            }
          }
        },
        componentName,
        componentId,
        {
          themeOverride: {
            componentColor: 'rgb(0, 150, 0)'
          }
        }
      )

      expect(override).toEqual({
        componentColor: 'rgb(0, 150, 0)'
      })
    })

    describe('if there is `componentOverrides` set on the theme', () => {
      it('with the displayName', async () => {
        const componentOverride = {
          componentColor: 'rgb(0, 0, 150)'
        }
        const override = getComponentThemeOverride(
          {
            ...canvas,
            componentOverrides: {
              [componentName]: componentOverride
            }
          },
          componentName,
          componentId,
          {}
        )

        expect(override).toEqual(componentOverride)
      })

      it('with the componentId', async () => {
        const componentOverride = {
          componentColor: 'rgb(0, 150, 150)'
        }
        const override = getComponentThemeOverride(
          {
            ...canvas,
            componentOverrides: {
              [componentId]: componentOverride
            }
          },
          componentName,
          componentId,
          {}
        )

        expect(override).toEqual(componentOverride)
      })

      it('with both the displayName and componentId (displayName takes precedence)', async () => {
        const override = getComponentThemeOverride(
          {
            ...canvas,
            componentOverrides: {
              [componentName]: { componentColor: 'rgb(150, 150, 150)' },
              [componentId]: { componentColor: 'rgb(150, 150, 0)' }
            }
          },
          componentName,
          componentId,
          {}
        )

        expect(override).toEqual({ componentColor: 'rgb(150, 150, 150)' })
      })
    })
  })
})
