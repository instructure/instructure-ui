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
import {
  canvas,
  canvasHighContrast,
  canvasThemeLocal
} from '@instructure/ui-themes'
import { ThemeRegistry } from '@instructure/theme-registry'
import '@testing-library/jest-dom'

import { useTheme } from '../useTheme'
import { InstUISettingsProvider } from '../InstUISettingsProvider'
import type { ThemeOrOverride } from '../EmotionTypes'

const defaultRegistry = ThemeRegistry.getRegistry()

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
    ThemeRegistry.clearRegistry()

    // Mocking console to prevent test output pollution and expect for messages
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as MockInstance
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    //this is needed to not mess up the global Theme Registry
    ThemeRegistry.setRegistry(defaultRegistry)

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

    it('should use global theme when no "theme" is provided', async () => {
      const callback = vi.fn()
      const theme = ThemeRegistry.registerTheme(canvasHighContrast)
      theme.use()

      render(
        <InstUISettingsProvider>
          <ExampleComponent callback={callback}></ExampleComponent>
        </InstUISettingsProvider>
      )

      expect(callback).toHaveBeenCalledWith(theme)
    })

    it('should default to canvas theme when no global theme is available and no theme is provided', async () => {
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
      const theme = ThemeRegistry.registerTheme(canvas)
      theme.use()

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

    it('should override the global theme if that is the only theme available', async () => {
      const callback = vi.fn()
      const theme = ThemeRegistry.registerTheme(canvasHighContrast)
      theme.use()

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
          ...theme,
          colors: expect.objectContaining({
            primitives: expect.objectContaining({
              white: 'red'
            })
          })
        })
      )
    })

    it('should override the global theme with the "themeOverrides" option if that is the only theme available', async () => {
      const callback = vi.fn()
      const theme = ThemeRegistry.registerTheme(canvasHighContrast)
      theme.use()

      render(
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
      )

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          ...theme,
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
      const theme = ThemeRegistry.registerTheme(canvasHighContrast)
      theme.use()

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

    it('should use local themes correctly', async () => {
      const callback = vi.fn()
      const theme = ThemeRegistry.registerTheme(canvas)
      theme.use()
      render(
        <InstUISettingsProvider theme={canvasThemeLocal}>
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
          ...canvasThemeLocal,
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
    it('should use theme from global ThemeRegistry', async () => {
      const callback = vi.fn()
      const theme = ThemeRegistry.registerTheme(canvasHighContrast)
      theme.use()

      render(<ExampleComponent callback={callback}></ExampleComponent>)

      expect(callback).toHaveBeenCalledWith(theme)
    })

    it('should use default "canvas" theme when no theme is used from ThemeRegistry', async () => {
      const callback = vi.fn()
      render(<ExampleComponent callback={callback}></ExampleComponent>)

      expect(callback).toHaveBeenCalledWith(canvas)
    })
  })

  describe('with InstUISettingsProvider and global theme', () => {
    it('overrides should work correctly', async () => {
      const [cb1, cb2, cb3, cb4, cb5, cb6] = Array(6)
        .fill(0)
        .map(() => vi.fn())

      const theme = ThemeRegistry.registerTheme(canvasHighContrast)
      theme.use({
        overrides: {
          colors: {
            primitives: {
              red12: 'red',
              green12: 'yellow',
              blue12: 'magenta'
            }
          }
        }
      })

      render(
        <>
          {/* no provider -> canvasHighContrast theme */}
          <ExampleComponent callback={cb1}></ExampleComponent>
          <InstUISettingsProvider theme={canvasHighContrast}>
            {/* theme provided -> canvasHighContrast */}
            <ExampleComponent callback={cb2}></ExampleComponent>
            <InstUISettingsProvider theme={canvas}>
              {/* theme provided -> canvas theme */}
              <ExampleComponent callback={cb3}></ExampleComponent>
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
          </InstUISettingsProvider>
          <InstUISettingsProvider>
            {/* no theme provided -> canvasHighContrast theme */}
            <ExampleComponent callback={cb5}></ExampleComponent>
            <InstUISettingsProvider
              theme={{
                colors: {
                  primitives: {
                    red12: 'brown'
                  }
                },
                themeOverrides: {
                  colors: {
                    primitives: {
                      green12: 'pink'
                    }
                  }
                }
              }}
            >
              {/* no theme provided -> canvasHighContrast theme with overrides */}
              <ExampleComponent callback={cb6}></ExampleComponent>
            </InstUISettingsProvider>
          </InstUISettingsProvider>
        </>
      )

      expect(cb1).toHaveBeenCalledWith(
        expect.objectContaining({
          ...theme,
          colors: expect.objectContaining({
            primitives: expect.objectContaining({
              red12: 'red',
              green12: 'yellow',
              blue12: 'magenta'
            })
          })
        })
      )
      expect(cb2).toHaveBeenCalledWith(canvasHighContrast)
      expect(cb3).toHaveBeenCalledWith(canvas)
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
      expect(cb5).toHaveBeenCalledWith(
        expect.objectContaining({
          ...theme,
          colors: expect.objectContaining({
            primitives: expect.objectContaining({
              red12: 'red',
              green12: 'yellow',
              blue12: 'magenta'
            })
          })
        })
      )
      expect(cb6).toHaveBeenCalledWith(
        expect.objectContaining({
          ...theme,
          colors: expect.objectContaining({
            primitives: expect.objectContaining({
              red12: 'brown',
              green12: 'pink',
              blue12: 'magenta'
            })
          })
        })
      )
    })

    it('local themes should work correctly', async () => {
      const [cb1, cb2, cb3, cb4] = Array(6)
        .fill(0)
        .map(() => vi.fn())

      const theme = ThemeRegistry.registerTheme(canvasHighContrast)
      theme.use({
        overrides: {
          colors: {
            primitives: {
              red12: 'red',
              green12: 'yellow',
              blue12: 'magenta'
            }
          }
        }
      })

      render(
        <>
          {/* no provider -> canvasHighContrast theme */}
          <ExampleComponent callback={cb1}></ExampleComponent>
          <InstUISettingsProvider theme={canvas}>
            {/* theme provided -> canvas */}
            <ExampleComponent callback={cb2}></ExampleComponent>
            <InstUISettingsProvider theme={canvasThemeLocal}>
              {/* theme provided -> canvasThemeLocal theme */}
              <ExampleComponent callback={cb3}></ExampleComponent>
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
          </InstUISettingsProvider>
        </>
      )

      expect(cb1).toHaveBeenCalledWith(
        expect.objectContaining({
          ...theme,
          colors: expect.objectContaining({
            primitives: expect.objectContaining({
              red12: 'red',
              green12: 'yellow',
              blue12: 'magenta'
            })
          })
        })
      )

      expect(cb2).toHaveBeenCalledWith(canvas)
      expect(cb3).toHaveBeenCalledWith(canvasThemeLocal)
      expect(cb4).toHaveBeenCalledWith(
        expect.objectContaining({
          ...canvasThemeLocal,
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

  it('should work correctly when multiple React trees is used', async () => {
    const callback1 = vi.fn()
    const callback2 = vi.fn()

    const theme = ThemeRegistry.registerTheme(canvasHighContrast)
    theme.use()

    //first react tree
    render(<ExampleComponent callback={callback1}></ExampleComponent>)

    //second react tree
    render(<ExampleComponent callback={callback2}></ExampleComponent>)

    expect(callback1).toHaveBeenCalledWith(theme)
    expect(callback2).toHaveBeenCalledWith(theme)
  })

  it('should work correctly when multiple React trees is used together with InstUISettingsProvider', async () => {
    const callback1 = vi.fn()
    const callback2 = vi.fn()
    const callback3 = vi.fn()

    const theme = ThemeRegistry.registerTheme(canvasHighContrast)
    theme.use()

    //first react tree
    render(<ExampleComponent callback={callback1}></ExampleComponent>)

    //second react tree
    render(
      <InstUISettingsProvider>
        <ExampleComponent callback={callback2}></ExampleComponent>
      </InstUISettingsProvider>
    )

    //third react tree
    render(
      <InstUISettingsProvider theme={canvasHighContrast}>
        <ExampleComponent callback={callback3}></ExampleComponent>
      </InstUISettingsProvider>
    )

    expect(callback1).toHaveBeenCalledWith(theme)
    expect(callback2).toHaveBeenCalledWith(theme)
    expect(callback3).toHaveBeenCalledWith(canvasHighContrast)
  })
})
