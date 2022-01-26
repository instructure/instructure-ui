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

/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'

import { expect, match, mount, stub, within } from '@instructure/ui-test-utils'
import {
  withStyle,
  jsx,
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
    textBrand: string
    textDark: string
    backgroundLight: string
  }
}

type ComponentTheme = {
  textColor: string
  textColorInverse: string
  backgroundColor: string
}

describe('@withStyle', async () => {
  const textBrand = 'rgb(0, 128, 0)'
  const textDark = 'rgb(10, 10, 10)'
  const backgroundLight = 'rgb(255, 255, 0)'
  const exampleTheme: Theme = {
    key: 'exampleTheme',
    colors: {
      textBrand,
      textDark,
      backgroundLight
    }
  }

  const generateComponentTheme = function (theme: Theme): ComponentTheme {
    const { colors } = theme
    return {
      textColor: colors.textBrand,
      textColorInverse: colors.textDark,
      backgroundColor: colors.backgroundLight
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
  class ThemeableComponent extends React.Component<Props, State> {
    static propTypes = {
      inverse: PropTypes.bool
    }

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
        <div css={styles!.exampleComponent}>
          <p>Hello World</p>
          <button onClick={this.handleClick}>Button</button>
        </div>
      )
    }
  }

  describe('with theme provided by InstUISettingsProvider', async () => {
    it('should add css class suffixed with label', async () => {
      const subject = await mount(
        <InstUISettingsProvider theme={exampleTheme}>
          <ThemeableComponent />
        </InstUISettingsProvider>
      )
      const emotionClassRegex = new RegExp(/^css-.+-exampleComponent$/)

      expect(subject.getDOMNode().classList[0]).to.match(emotionClassRegex)
    })

    it('should apply correct css props', async () => {
      const subject = await mount(
        <InstUISettingsProvider theme={exampleTheme}>
          <ThemeableComponent />
        </InstUISettingsProvider>
      )
      const component = subject.getDOMNode()
      const computedStyle = getComputedStyle(component)

      expect(computedStyle.color).to.equal(textBrand)
      expect(computedStyle.backgroundColor).to.equal(backgroundLight)
    })

    describe('should allow configuration through the themeOverride prop', async () => {
      it('when it is an object', async () => {
        const subject = await mount(
          <InstUISettingsProvider theme={exampleTheme}>
            <ThemeableComponent
              themeOverride={{
                textColor: 'rgb(128, 0, 128)'
              }}
            />
          </InstUISettingsProvider>
        )
        const component = subject.getDOMNode()
        const computedStyle = getComputedStyle(component)

        expect(computedStyle.color).to.equal('rgb(128, 0, 128)')
        expect(computedStyle.backgroundColor).to.equal(backgroundLight)
      })

      it('when it is a function', async () => {
        const subject = await mount(
          <InstUISettingsProvider theme={exampleTheme}>
            <ThemeableComponent
              themeOverride={(componentTheme) => ({
                textColor: componentTheme.backgroundColor
              })}
            />
          </InstUISettingsProvider>
        )
        const component = subject.getDOMNode()
        const computedStyle = getComputedStyle(component)

        expect(computedStyle.color).to.equal(backgroundLight)
        expect(computedStyle.backgroundColor).to.equal(backgroundLight)
      })
    })

    it('should ignore empty themeOverride props', async () => {
      const subject = await mount(
        <InstUISettingsProvider theme={exampleTheme}>
          <ThemeableComponent themeOverride={{}} />
        </InstUISettingsProvider>
      )
      const component = subject.getDOMNode()
      const computedStyle = getComputedStyle(component)

      expect(computedStyle.color).to.equal(textBrand)
      expect(computedStyle.backgroundColor).to.equal(backgroundLight)
    })
  })

  describe('should update css props', async () => {
    it('when props are updated', async () => {
      // `setProps` can be called on the outer component,
      // so have to add the theme ad themeOverride here, and suppress the error
      stub(console, 'warn') // suppress "no theme provided error"

      const subject = await mount(
        <ThemeableComponent
          inverse={false}
          themeOverride={{
            textColor: textBrand,
            textColorInverse: textDark,
            backgroundColor: backgroundLight
          }}
        />
      )
      const component = subject.getDOMNode()

      expect(getComputedStyle(component).color).to.equal(textBrand)

      await subject.setProps({ inverse: true })

      expect(getComputedStyle(component).color).to.equal(textDark)
    })

    it('when state is updated', async () => {
      const subject = await mount(
        <InstUISettingsProvider theme={exampleTheme}>
          <ThemeableComponent />
        </InstUISettingsProvider>
      )
      const main = within(subject.getDOMNode())
      const clearBackgroundButton = await main.find('button')
      const component = await main.getDOMNode()

      expect(getComputedStyle(component).backgroundColor).to.equal(
        backgroundLight
      )

      await clearBackgroundButton.click()

      expect(getComputedStyle(component).backgroundColor).to.equal(
        'rgba(0, 0, 0, 0)'
      ) // transparent
    })
  })

  describe('should apply bi-directional polyfill on styles object', async () => {
    it('in default "ltr" mode', async () => {
      const subject = await mount(
        <InstUISettingsProvider theme={exampleTheme}>
          <ThemeableComponent />
        </InstUISettingsProvider>
      )
      const component = subject.getDOMNode()
      const computedStyle = getComputedStyle(component)

      // `inset-inline-start` should be transformed to 'left' in 'ltr' mode
      expect(computedStyle.left).to.equal('8px')
      expect(computedStyle.right).to.equal('auto')
    })

    it('in "rtl" mode', async () => {
      const subject = await mount(
        <div dir="rtl">
          <InstUISettingsProvider theme={exampleTheme}>
            <ThemeableComponent />
          </InstUISettingsProvider>
        </div>
      )
      const component = subject
        .getDOMNode()
        .querySelector('[class$=-exampleComponent]')
      const computedStyle = getComputedStyle(component!)

      // `inset-inline-start` should be transformed to 'right' in 'rtl' mode
      expect(computedStyle.left).to.equal('auto')
      expect(computedStyle.right).to.equal('8px')
    })
  })

  describe('should not allow manually passing prop', async () => {
    it('styles', async () => {
      stub(console, 'warn') // suppress warning

      const subject = await mount(
        <InstUISettingsProvider theme={exampleTheme}>
          <ThemeableComponent styles={{ exampleComponent: { color: 'red' } }} />
        </InstUISettingsProvider>
      )
      const component = subject.getDOMNode()
      const computedStyle = getComputedStyle(component)

      expect(computedStyle.color).to.equal(textBrand)
    })

    it('makeStyles', async () => {
      stub(console, 'warn') // suppress warning
      const consoleLog = stub(console, 'log')

      const subject = await mount(
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
      const component = subject.getDOMNode()
      const computedStyle = getComputedStyle(component)

      expect(computedStyle.color).to.equal(textBrand)
      expect(consoleLog).not.to.have.been.called()
    })
  })

  describe('should throw warning when manually passing prop', async () => {
    it('styles', async () => {
      const consoleWarning = stub(console, 'warn')

      await mount(
        <InstUISettingsProvider theme={exampleTheme}>
          <ThemeableComponent styles={{ exampleComponent: { color: 'red' } }} />
        </InstUISettingsProvider>
      )

      expect(consoleWarning).to.have.been.calledWithMatch(
        `Warning: Manually passing the "styles" property is not allowed on the ThemeableComponent component. Using the default styles calculated by the @withStyle decorator instead.`,
        match.object,
        match.string
      )
    })

    it('makeStyles', async () => {
      const consoleWarning = stub(console, 'warn')

      await mount(
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

      expect(consoleWarning).to.have.been.calledWithMatch(
        `Manually passing the "makeStyles" property is not allowed on the ThemeableComponent component. Styles are calculated by the @withStyle decorator.`,
        match.string
      )
    })
  })
})
