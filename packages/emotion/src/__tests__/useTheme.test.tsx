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
import { render } from '@testing-library/react'
import { vi } from 'vitest'
import type { MockInstance } from 'vitest'
import { canvas, canvasHighContrast } from '@instructure/ui-themes'
import '@testing-library/jest-dom'

import { useTheme } from '../useTheme'
import { InstUISettingsProvider } from '../InstUISettingsProvider'
import type { ThemeOrOverride } from '../EmotionTypes'

type Props = {
  callback(theme: ThemeOrOverride): void
}

const ExampleComponent = (props: Props) => {
  const theme = useTheme()

  props.callback(theme)

  return null
}

describe('useTheme hook', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
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

  describe('with using InstUISettingsProvider', () => {
    it('should use default canvas theme when no "theme" is provided', async () => {
      const callback = vi.fn()
      render(
        <InstUISettingsProvider>
          <ExampleComponent callback={callback}></ExampleComponent>
        </InstUISettingsProvider>
      )

      expect(callback).toHaveBeenCalledWith(canvas)
    })

    it('should default to canvas theme when no theme is provided', async () => {
      const callback = vi.fn()
      render(
        <InstUISettingsProvider>
          <ExampleComponent callback={callback}></ExampleComponent>
        </InstUISettingsProvider>
      )
      expect(callback).toHaveBeenCalledWith(canvas)
    })

    it('should use provided theme when theme is provided', async () => {
      const callback = vi.fn()
      render(
        <InstUISettingsProvider theme={canvasHighContrast}>
          <ExampleComponent callback={callback}></ExampleComponent>
        </InstUISettingsProvider>
      )
      expect(callback).toHaveBeenCalledWith(canvasHighContrast)
    })

    it('should override the default theme when no other theme is available', async () => {
      const callback = vi.fn()
      render(
        <InstUISettingsProvider
          theme={{
            colors: {
              primitives: {
                white: 'red'
              }
            }
          }}
        >
          <ExampleComponent callback={callback}></ExampleComponent>
        </InstUISettingsProvider>
      )

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          colors: expect.objectContaining({
            primitives: expect.objectContaining({
              white: 'red'
            })
          })
        })
      )
    })

    it('should override the theme from context when provided', async () => {
      const callback = vi.fn()

      render(
        <InstUISettingsProvider theme={canvasHighContrast}>
          <InstUISettingsProvider
            theme={{
              themeOverrides: {
                colors: {
                  primitives: {
                    white: 'red'
                  }
                }
              }
            }}
          >
            <ExampleComponent callback={callback}></ExampleComponent>
          </InstUISettingsProvider>
        </InstUISettingsProvider>
      )

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          ...canvasHighContrast,
          colors: expect.objectContaining({
            primitives: expect.objectContaining({
              white: 'red'
            })
          })
        })
      )
    })

    it('should use theme overrides correctly', async () => {
      const callback = vi.fn()
      render(
        <InstUISettingsProvider theme={canvas}>
          <InstUISettingsProvider
            theme={{
              themeOverrides: {
                colors: {
                  primitives: {
                    white: 'red'
                  }
                }
              }
            }}
          >
            <ExampleComponent callback={callback}></ExampleComponent>
          </InstUISettingsProvider>
        </InstUISettingsProvider>
      )

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          ...canvas,
          colors: expect.objectContaining({
            primitives: expect.objectContaining({
              white: 'red'
            })
          })
        })
      )
    })
  })

  describe('without using InstUISettingsProvider', () => {
    it('should use default "canvas" theme when no theme is provided', async () => {
      const callback = vi.fn()
      render(<ExampleComponent callback={callback}></ExampleComponent>)
      expect(callback).toHaveBeenCalledWith(canvas)
    })
  })

  describe('with InstUISettingsProvider', () => {
    it('theme overrides should work correctly', async () => {
      const [cb2, cb4] = Array(2)
        .fill(0)
        .map(() => vi.fn())
      render(
        <>
          <InstUISettingsProvider theme={canvas}>
            {/* theme provided -> canvas */}
            <ExampleComponent callback={cb2}></ExampleComponent>
            <InstUISettingsProvider
              theme={{
                colors: {
                  primitives: {
                    red12: 'orange'
                  }
                },
                themeOverrides: {
                  colors: {
                    primitives: {
                      green12: 'olive'
                    }
                  }
                }
              }}
            >
              {/* theme provided -> canvas theme with overrides */}
              <ExampleComponent callback={cb4}></ExampleComponent>
            </InstUISettingsProvider>
          </InstUISettingsProvider>
        </>
      )

      expect(cb2).toHaveBeenCalledWith(canvas)
      expect(cb4).toHaveBeenCalledWith(
        expect.objectContaining({
          ...canvas,
          colors: expect.objectContaining({
            primitives: expect.objectContaining({
              red12: 'orange',
              green12: 'olive'
            })
          })
        })
      )
    })
  })
})
