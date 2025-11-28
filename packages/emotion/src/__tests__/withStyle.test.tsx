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

import { Component } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import type { MockInstance } from 'vitest'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import {
  withStyleRework as withStyle,
  InstUISettingsProvider,
  WithStyleProps
} from '../index'

type Props = {
  inverse?: boolean
} & WithStyleProps<ComponentTheme>

type State = { clearBackground?: boolean }

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

describe('@withStyle', () => {
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

  const generateStyle = function (
    componentTheme: ComponentTheme,
    props: Props,
    state: State
  ) {
    const { inverse } = props
    const { clearBackground } = state

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

  @withStyle(generateStyle, generateComponentTheme)
  class ThemeableComponent extends Component<Props, State> {
    static defaultTypes = {
      inverse: false
    }

    state = {
      clearBackground: false
    }

    componentDidMount() {
      this.props.makeStyles!({ clearBackground: this.state.clearBackground })
    }

    componentDidUpdate() {
      this.props.makeStyles!({ clearBackground: this.state.clearBackground })
    }

    handleClick = () => {
      this.setState({
        clearBackground: true
      })
    }

    render() {
      const { styles } = this.props
      return (
        <div data-testId="testComp" css={styles!.exampleComponent}>
          <p>Hello World</p>
          <button onClick={this.handleClick}>Button</button>
        </div>
      )
    }
  }

  class WrapperComponent extends Component {
    render() {
      return (
        <div>
          <ThemeableComponent />
        </div>
      )
    }
  }

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

  it('should render ThemeableComponent correctly', async () => {
    render(<WrapperComponent />)

    const foundComponent = screen.getByTestId('testComp')
    expect(foundComponent).toBeTruthy()
  })

  describe('with theme provided by InstUISettingsProvider', () => {
    it('should add css class suffixed with label', async () => {
      render(
        <InstUISettingsProvider theme={exampleTheme}>
          <ThemeableComponent />
        </InstUISettingsProvider>
      )
      const emotionClassRegex = new RegExp(/^css-.+-exampleComponent$/)
      const themeableComponent = screen.getAllByTestId('testComp')[0]!
      expect(themeableComponent.classList[0]).toMatch(emotionClassRegex)
    })

    it('should apply correct css props', async () => {
      render(
        <InstUISettingsProvider theme={exampleTheme}>
          <ThemeableComponent />
        </InstUISettingsProvider>
      )
      const component = screen.getAllByTestId('testComp')[0]!
      const computedStyle = getComputedStyle(component)

      expect(computedStyle.color).toEqual('rgb(0, 128, 0)')
      expect(computedStyle.backgroundColor).toEqual('rgb(255, 255, 0)')
    })

    describe('should allow configuration through the themeOverride prop', () => {
      it('when it is an object', async () => {
        render(
          <InstUISettingsProvider theme={exampleTheme}>
            <ThemeableComponent
              themeOverride={{
                textColor: 'rgb(128, 0, 128)'
              }}
            />
          </InstUISettingsProvider>
        )
        const component = screen.getAllByTestId('testComp')[0]!
        const computedStyle = getComputedStyle(component)

        expect(computedStyle.color).toEqual('rgb(128, 0, 128)')
        expect(computedStyle.backgroundColor).toEqual('rgb(255, 255, 0)')
      })

      it('when it is a function', async () => {
        render(
          <InstUISettingsProvider theme={exampleTheme}>
            <ThemeableComponent
              themeOverride={(componentTheme) => ({
                textColor: componentTheme.backgroundColor
              })}
            />
          </InstUISettingsProvider>
        )
        const component = screen.getAllByTestId('testComp')[0]!
        const computedStyle = getComputedStyle(component)

        expect(computedStyle.color).toEqual('rgb(255, 255, 0)')
        expect(computedStyle.backgroundColor).toEqual('rgb(255, 255, 0)')
      })
    })

    it('should ignore empty themeOverride props', async () => {
      render(
        <InstUISettingsProvider theme={exampleTheme}>
          <ThemeableComponent themeOverride={{}} />
        </InstUISettingsProvider>
      )
      const component = screen.getAllByTestId('testComp')[0]!
      const computedStyle = getComputedStyle(component)

      expect(computedStyle.color).toEqual('rgb(0, 128, 0)')
      expect(computedStyle.backgroundColor).toEqual('rgb(255, 255, 0)')
    })
  })

  describe('should update css props', () => {
    it('when props are updated', async () => {
      const { rerender } = render(
        <ThemeableComponent
          inverse={false}
          themeOverride={{
            textColor: grey1111,
            textColorInverse: blue4570,
            backgroundColor: green4570
          }}
        />
      )
      const component = screen.getAllByTestId('testComp')[0]!
      expect(getComputedStyle(component).color).toEqual(grey1111)

      // Set prop: inverse
      rerender(
        <ThemeableComponent
          inverse={true}
          themeOverride={{
            textColor: grey1111,
            textColorInverse: blue4570,
            backgroundColor: green4570
          }}
        />
      )
      const updatedComponent = screen.getAllByTestId('testComp')[0]!
      expect(getComputedStyle(updatedComponent).color).toEqual(blue4570)
    })

    it('when state is updated', async () => {
      render(
        <InstUISettingsProvider theme={exampleTheme}>
          <ThemeableComponent />
        </InstUISettingsProvider>
      )
      const component = screen.getAllByTestId('testComp')[0]!
      const clearBackgroundButton = screen.getAllByText('Button')[0]

      expect(getComputedStyle(component).backgroundColor).toEqual(
        'rgb(255, 255, 0)'
      )

      await userEvent.click(clearBackgroundButton)

      await waitFor(() => {
        expect(getComputedStyle(component).backgroundColor).toEqual(
          'rgba(0, 0, 0, 0)'
        )
      })
    })
  })

  describe('should not allow manually passing prop', () => {
    it('styles', async () => {
      render(
        <InstUISettingsProvider theme={exampleTheme}>
          <ThemeableComponent styles={{ exampleComponent: { color: 'red' } }} />
        </InstUISettingsProvider>
      )
      const component = screen.getAllByTestId('testComp')[0]!
      const computedStyle = getComputedStyle(component)

      expect(computedStyle.color).toEqual(grey1111)
    })

    it('makeStyles', async () => {
      const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

      render(
        <InstUISettingsProvider theme={exampleTheme}>
          <ThemeableComponent
            makeStyles={() => {
              // eslint-disable-next-line no-console
              console.log('Make it!')
              return { exampleComponent: { color: 'red' } }
            }}
          />
        </InstUISettingsProvider>
      )
      const component = screen.getAllByTestId('testComp')[0]!
      const computedStyle = getComputedStyle(component)

      expect(computedStyle.color).toEqual(grey1111)
      expect(consoleLog).not.toHaveBeenCalled()

      vi.restoreAllMocks()
    })
  })

  describe('should throw warning when manually passing prop', () => {
    it('styles', async () => {
      render(
        <InstUISettingsProvider theme={exampleTheme}>
          <ThemeableComponent styles={{ exampleComponent: { color: 'red' } }} />
        </InstUISettingsProvider>
      )

      const expectedWarningMessage = `Warning: Manually passing the "styles" property is not allowed on the ThemeableComponent component. Using the default styles calculated by the @withStyle decorator instead.`

      expect(consoleWarningMock).toHaveBeenCalledWith(
        expect.stringContaining(expectedWarningMessage),
        expect.any(Object),
        expect.any(String)
      )
    })

    it('makeStyles', async () => {
      render(
        <InstUISettingsProvider theme={exampleTheme}>
          <ThemeableComponent
            makeStyles={() => {
              // eslint-disable-next-line no-console
              console.log('Make it!')
              return { exampleComponent: { color: 'red' } }
            }}
          />
        </InstUISettingsProvider>
      )

      const expectedWarningMessage = `Manually passing the "makeStyles" property is not allowed on the ThemeableComponent component. Styles are calculated by the @withStyle decorator.`

      expect(consoleWarningMock).toHaveBeenCalledWith(
        expect.stringContaining(expectedWarningMessage),
        expect.any(String)
      )
    })
  })
})
