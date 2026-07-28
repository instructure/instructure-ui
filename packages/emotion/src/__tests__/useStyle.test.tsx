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

import { useState } from 'react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import type { MockInstance } from 'vitest'
import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import {
  InstUISettingsProvider,
  WithStyleProps,
  useStyle,
  useStyleNew
} from '../index.js'

type Props = {
  inverse?: boolean
} & WithStyleProps<ComponentTheme>

type Theme = {
  key: string
  colors: {
    contrasts: {
      grey1111: string
      green4570: string
      blue4570: string
    }
  }
}

type ComponentTheme = {
  textColor: string
  textColorInverse: string
  backgroundColor: string
}

describe('useStyle', () => {
  const grey1111 = 'rgb(0, 128, 0)'
  const green4570 = 'rgb(10, 10, 10)'
  const blue4570 = 'rgb(255, 255, 0)'
  const exampleTheme: Theme = {
    key: 'exampleTheme',
    colors: {
      contrasts: {
        grey1111,
        green4570,
        blue4570
      }
    }
  }

  const generateComponentTheme = function (theme: Theme): ComponentTheme {
    const { colors } = theme
    return {
      textColor: colors.contrasts.grey1111,
      textColorInverse: colors.contrasts.green4570,
      backgroundColor: colors.contrasts.blue4570
    }
  }

  type StyleParams = {
    inverse: boolean
    clearBackground: boolean
    themeOverride: Props['themeOverride']
  }

  const generateStyle = function (
    componentTheme: ComponentTheme,
    params: StyleParams
  ) {
    const { inverse, clearBackground } = params

    return {
      exampleComponent: {
        label: 'exampleComponent',
        color: componentTheme.textColor,
        background: componentTheme.backgroundColor,
        insetInlineStart: '8px',
        ...(inverse && { color: componentTheme.textColorInverse }),
        ...(clearBackground && { background: 'transparent' })
      }
    }
  }

  const ThemedComponent = ({ inverse = false, themeOverride }: Props) => {
    const [clearBackground, setClearBackground] = useState(false)

    const styles = useStyle({
      generateStyle,
      generateComponentTheme,
      componentId: 'ThemedComponent',
      params: { inverse, clearBackground, themeOverride }
    })

    const handleClick = () => {
      setClearBackground(true)
    }

    return (
      <div data-testid="testComp" css={styles!.exampleComponent}>
        <p>Hello World</p>
        <button onClick={handleClick}>Button</button>
      </div>
    )
  }

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

  describe('with theme provided by InstUISettingsProvider', () => {
    it('should add css class suffixed with label', async () => {
      await render(
        <InstUISettingsProvider theme={exampleTheme}>
          <ThemedComponent />
        </InstUISettingsProvider>
      )
      const emotionClassRegex = new RegExp(/^css-.+-exampleComponent$/)

      const themedComponent = page.getByTestId('testComp').element()

      expect(themedComponent.classList[0]).toMatch(emotionClassRegex)
    })

    it('should apply correct css props', async () => {
      await render(
        <InstUISettingsProvider theme={exampleTheme}>
          <ThemedComponent />
        </InstUISettingsProvider>
      )
      const component = page.getByTestId('testComp').element()
      const computedStyle = getComputedStyle(component)

      expect(computedStyle.color).toEqual('rgb(0, 128, 0)')
      expect(computedStyle.backgroundColor).toEqual('rgb(255, 255, 0)')
    })

    describe('should allow configuration through the themeOverride prop', () => {
      it('when it is an object', async () => {
        await render(
          <InstUISettingsProvider theme={exampleTheme}>
            <ThemedComponent
              themeOverride={{
                textColor: 'rgb(128, 0, 128)'
              }}
            />
          </InstUISettingsProvider>
        )
        const component = page.getByTestId('testComp').element()
        const computedStyle = getComputedStyle(component)

        expect(computedStyle.color).toEqual('rgb(128, 0, 128)')
        expect(computedStyle.backgroundColor).toEqual('rgb(255, 255, 0)')
      })

      it('when it is a function', async () => {
        await render(
          <InstUISettingsProvider theme={exampleTheme}>
            <ThemedComponent
              themeOverride={(componentTheme) => ({
                textColor: componentTheme.backgroundColor
              })}
            />
          </InstUISettingsProvider>
        )
        const component = page.getByTestId('testComp').element()
        const computedStyle = getComputedStyle(component)

        expect(computedStyle.color).toEqual('rgb(255, 255, 0)')
        expect(computedStyle.backgroundColor).toEqual('rgb(255, 255, 0)')
      })
    })

    it('should ignore empty themeOverride props', async () => {
      await render(
        <InstUISettingsProvider theme={exampleTheme}>
          <ThemedComponent themeOverride={{}} />
        </InstUISettingsProvider>
      )
      const component = page.getByTestId('testComp').element()
      const computedStyle = getComputedStyle(component)

      expect(computedStyle.color).toEqual('rgb(0, 128, 0)')
      expect(computedStyle.backgroundColor).toEqual('rgb(255, 255, 0)')
    })
  })

  describe('should update css props', () => {
    it('when props are updated', async () => {
      const { rerender } = await render(
        <ThemedComponent
          inverse={false}
          themeOverride={{
            textColor: grey1111,
            textColorInverse: blue4570,
            backgroundColor: green4570
          }}
        />
      )
      const component = page.getByTestId('testComp').element()
      expect(getComputedStyle(component).color).toEqual(grey1111)

      // Set Prop: inverse
      await rerender(
        <ThemedComponent
          inverse={true}
          themeOverride={{
            textColor: grey1111,
            textColorInverse: blue4570,
            backgroundColor: green4570
          }}
        />
      )

      const updatedComponent = page.getByTestId('testComp').element()
      expect(getComputedStyle(updatedComponent).color).toEqual(blue4570)
    })

    it('when state is updated', async () => {
      await render(
        <InstUISettingsProvider theme={exampleTheme}>
          <ThemedComponent />
        </InstUISettingsProvider>
      )
      const component = page.getByTestId('testComp').element()
      const clearBackgroundButton = page.getByText('Button')

      expect(getComputedStyle(component).backgroundColor).toEqual(
        'rgb(255, 255, 0)'
      )

      await userEvent.click(clearBackgroundButton)

      await vi.waitFor(() => {
        expect(getComputedStyle(component).backgroundColor).toEqual(
          'rgba(0, 0, 0, 0)'
        )
      })
    })
  })

  describe('Component tests', () => {
    // `useStyleNew` calls this with `{ primitives, semantics, sharedTokens }` (the
    // new theming system), not the legacy `{ colors: { contrasts } }` shape. This
    // test only asserts the bi-directional polyfill, so the color values are
    // arbitrary — return them statically rather than reading a removed theme shape.
    const generateNewComponentTheme = (): ComponentTheme => ({
      textColor: grey1111,
      textColorInverse: green4570,
      backgroundColor: blue4570
    })

    const ThemedComponentNew = ({ inverse = false, themeOverride }: Props) => {
      const styles = useStyleNew({
        // `useStyleNew` types these against the known component themes; this
        // example component isn't one of them.
        generateStyle: generateStyle as any,
        generateComponentTheme: generateNewComponentTheme as any,
        componentId: 'ThemedComponent',
        params: { inverse, clearBackground: false, themeOverride }
      })

      return (
        <div data-testid="useStyleNew-testComp" css={styles!.exampleComponent}>
          <p>Hello World</p>
        </div>
      )
    }

    describe('useStyleNew should apply bi-directional polyfill on styles object', () => {
      it('in default "ltr" mode', async () => {
        await render(
          <InstUISettingsProvider theme={exampleTheme}>
            <ThemedComponentNew />
          </InstUISettingsProvider>
        )
        const computedStyle = getComputedStyle(
          page.getByTestId('useStyleNew-testComp').element()
        )

        // `inset-inline-start` becomes 'left' in LTR mode
        expect(computedStyle.left).toEqual('8px')
        expect(computedStyle.right).toEqual('auto')
      })

      it('in "rtl" mode', async () => {
        await render(
          <InstUISettingsProvider theme={exampleTheme} dir="rtl">
            <ThemedComponentNew />
          </InstUISettingsProvider>
        )
        const computedStyle = getComputedStyle(
          page.getByTestId('useStyleNew-testComp').element()
        )

        // `inset-inline-start` should be transformed to 'right' in 'rtl' mode
        expect(computedStyle.left).toEqual('auto')
        expect(computedStyle.right).toEqual('8px')
      })
    })
  })
})
