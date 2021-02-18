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
import { expect, mount, stub, spy } from '@instructure/ui-test-utils'
import { ApplyTextDirection } from '@instructure/ui-i18n'

import { withStyle, jsx, EmotionThemeProvider } from '../index'

describe('@withStyle', async () => {
  const textBrand = 'rgb(0, 128, 0)'
  const textDark = 'rgb(10, 10, 10)'
  const backgroundLight = 'rgb(255, 255, 0)'
  const exampleTheme = {
    key: 'exampleTheme',
    colors: {
      textBrand,
      textDark,
      backgroundLight
    }
  }

  const generateComponentTheme = function (theme) {
    const { colors } = theme
    return {
      textColor: colors.textBrand,
      textColorInverse: colors.textDark,
      backgroundColor: colors.backgroundLight
    }
  }

  const generateStyle = function (componentTheme, props) {
    const { inverse } = props

    return {
      exampleComponent: {
        label: 'exampleComponent',
        color: componentTheme.textColor,
        background: componentTheme.backgroundColor,
        insetInlineStart: '8px',
        ...(inverse && { color: componentTheme.textColorInverse })
      }
    }
  }

  @withStyle(generateStyle, generateComponentTheme)
  class ThemeableComponent extends React.Component {
    static propTypes = {
      // eslint-disable-next-line react/require-default-props
      makeStyles: PropTypes.func,
      // eslint-disable-next-line react/require-default-props
      styles: PropTypes.object,
      inverse: PropTypes.bool
    }

    static defaultTypes = {
      inverse: false
    }

    componentDidMount() {
      this.props.makeStyles()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      this.props.makeStyles()
    }

    render() {
      const { styles } = this.props
      return <div css={styles.exampleComponent}>Hello World</div>
    }
  }

  describe('with theme provided by EmotionThemeProvider', async () => {
    it('should add css class suffixed with label', async () => {
      const subject = await mount(
        <EmotionThemeProvider theme={exampleTheme}>
          <ThemeableComponent />
        </EmotionThemeProvider>
      )
      const emotionClassRegex = new RegExp(/^css-.+-exampleComponent$/)

      expect(subject.getDOMNode().classList[0]).to.match(emotionClassRegex)
    })

    it('should apply correct css props', async () => {
      const subject = await mount(
        <EmotionThemeProvider theme={exampleTheme}>
          <ThemeableComponent />
        </EmotionThemeProvider>
      )
      const component = subject.getDOMNode()
      const computedStyle = getComputedStyle(component)

      expect(computedStyle.color).to.equal(textBrand)
      expect(computedStyle.backgroundColor).to.equal(backgroundLight)
    })

    it('should allow configuration through props', async () => {
      const subject = await mount(
        <EmotionThemeProvider theme={exampleTheme}>
          <ThemeableComponent
            themeOverride={{
              textColor: 'rgb(128, 0, 128)'
            }}
          />
        </EmotionThemeProvider>
      )
      const component = subject.getDOMNode()
      const computedStyle = getComputedStyle(component)

      expect(computedStyle.color).to.equal('rgb(128, 0, 128)')
      expect(computedStyle.backgroundColor).to.equal(backgroundLight)
    })

    it('should ignore empty themeOverride props', async () => {
      const subject = await mount(
        <EmotionThemeProvider theme={exampleTheme}>
          <ThemeableComponent themeOverride={{}} />
        </EmotionThemeProvider>
      )
      const component = subject.getDOMNode()
      const computedStyle = getComputedStyle(component)

      expect(computedStyle.color).to.equal(textBrand)
      expect(computedStyle.backgroundColor).to.equal(backgroundLight)
    })

    it('should allow configuration through theme provider', async () => {
      const theme = {
        ...exampleTheme,
        componentOverrides: {
          ThemeableComponent: {
            textColor: 'rgb(128, 0, 0)'
          }
        }
      }
      const subject = await mount(
        <EmotionThemeProvider theme={theme}>
          <ThemeableComponent />
        </EmotionThemeProvider>
      )
      const component = subject.getDOMNode()
      const computedStyle = getComputedStyle(component)

      expect(computedStyle.color).to.equal('rgb(128, 0, 0)')
      expect(computedStyle.backgroundColor).to.equal(backgroundLight)
    })
  })

  describe('without theme provided by EmotionThemeProvider', async () => {
    it('should throw warning', async () => {
      const consoleWarning = spy(console, 'warn')
      const warning =
        'No theme provided for [EmotionThemeProvider], using default <canvas> theme.'
      await mount(<ThemeableComponent />)

      await expect(consoleWarning).to.have.been.calledWith(warning)
    })

    it('should fall back to the default "canvas" theme', async () => {
      const subject = await mount(<ThemeableComponent />)
      const component = subject.getDOMNode()
      const computedStyle = getComputedStyle(component)

      expect(computedStyle.color).to.equal('rgb(0, 142, 226)') // canvas textBrand color
      expect(computedStyle.backgroundColor).to.equal('rgb(245, 245, 245)') // canvas backgroundLight color
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

    it('when theme is updated', async () => {
      const newTheme = {
        key: 'exampleTheme2',
        colors: {
          textBrand: 'rgb(32, 139, 167)',
          backgroundLight: 'rgb(236, 249, 252)'
        }
      }

      const subject = await mount(
        <EmotionThemeProvider theme={exampleTheme}>
          <ThemeableComponent />
        </EmotionThemeProvider>
      )
      const component = subject.getDOMNode()

      expect(getComputedStyle(component).color).to.equal(textBrand)
      expect(getComputedStyle(component).backgroundColor).to.equal(
        backgroundLight
      )

      await subject.setProps({ theme: newTheme })

      expect(getComputedStyle(component).color).to.equal('rgb(32, 139, 167)')
      expect(getComputedStyle(component).backgroundColor).to.equal(
        'rgb(236, 249, 252)'
      )
    })
  })

  describe('should apply bi-directional polyfill on styles object', async () => {
    it('in default "ltr" mode', async () => {
      const subject = await mount(
        <EmotionThemeProvider theme={exampleTheme}>
          <ThemeableComponent />
        </EmotionThemeProvider>
      )
      const component = subject.getDOMNode()
      const computedStyle = getComputedStyle(component)

      // `inset-inline-start` should be transformed to 'left' in 'ltr' mode
      expect(computedStyle.left).to.equal('8px')
      expect(computedStyle.right).to.equal('auto')
    })

    it('in "rtl" mode', async () => {
      const subject = await mount(
        <ApplyTextDirection dir="rtl">
          <EmotionThemeProvider theme={exampleTheme}>
            <ThemeableComponent />
          </EmotionThemeProvider>
        </ApplyTextDirection>
      )
      const component = subject
        .getDOMNode()
        .querySelector('[class$=-exampleComponent]')
      const computedStyle = getComputedStyle(component)

      // `inset-inline-start` should be transformed to 'right' in 'rtl' mode
      expect(computedStyle.left).to.equal('auto')
      expect(computedStyle.right).to.equal('8px')
    })
  })
})
