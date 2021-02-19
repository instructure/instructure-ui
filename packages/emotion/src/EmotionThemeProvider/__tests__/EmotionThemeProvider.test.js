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

import { withStyle, jsx, EmotionThemeProvider } from '../../index'

describe('EmotionThemeProvider', async () => {
  const textBrand = 'rgb(0, 128, 0)'
  const backgroundLight = 'rgb(255, 255, 0)'
  const exampleTheme = {
    key: 'exampleTheme',
    colors: {
      textBrand,
      backgroundLight
    }
  }

  const generateComponentTheme = function (theme) {
    const { colors } = theme
    return {
      textColor: colors.textBrand,
      backgroundColor: colors.backgroundLight
    }
  }

  const generateStyle = function (componentTheme) {
    return {
      exampleComponent: {
        label: 'exampleComponent',
        color: componentTheme.textColor,
        background: componentTheme.backgroundColor
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

  describe('should apply correct theme variables', async () => {
    it('when a whole theme is provided', async () => {
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

    describe('when they are nested:', async () => {
      it('a full child theme should override parent', async () => {
        const subject = await mount(
          <EmotionThemeProvider theme={exampleTheme}>
            <EmotionThemeProvider
              theme={{
                key: 'childTheme',
                colors: {
                  textBrand: 'rgb(0, 0, 20)',
                  backgroundLight: 'rgb(200, 200, 200)'
                }
              }}
            >
              <ThemeableComponent />
            </EmotionThemeProvider>
          </EmotionThemeProvider>
        )
        const component = subject.getDOMNode()
        const computedStyle = getComputedStyle(component)

        expect(computedStyle.color).to.equal('rgb(0, 0, 20)')
        expect(computedStyle.backgroundColor).to.equal('rgb(200, 200, 200)')
      })

      it('a global theme override should merge with parent', async () => {
        const subject = await mount(
          <EmotionThemeProvider theme={exampleTheme}>
            <EmotionThemeProvider
              theme={{
                colors: {
                  textBrand: 'rgb(10, 10, 140)'
                }
              }}
            >
              <ThemeableComponent />
            </EmotionThemeProvider>
          </EmotionThemeProvider>
        )
        const component = subject.getDOMNode()
        const computedStyle = getComputedStyle(component)

        expect(computedStyle.color).to.equal('rgb(10, 10, 140)')
        expect(computedStyle.backgroundColor).to.equal(backgroundLight)
      })
    })

    describe('when overrides are provided:', async () => {
      it('theme specific overrides', async () => {
        const subject = await mount(
          <EmotionThemeProvider theme={exampleTheme}>
            <EmotionThemeProvider
              theme={{
                themeOverrides: {
                  exampleTheme: {
                    colors: {
                      textBrand: 'rgb(40, 50, 60)'
                    }
                  },
                  otherTheme: {
                    colors: {
                      textBrand: 'rgb(20, 30, 70)'
                    }
                  }
                }
              }}
            >
              <ThemeableComponent />
            </EmotionThemeProvider>
          </EmotionThemeProvider>
        )
        const component = subject.getDOMNode()
        const computedStyle = getComputedStyle(component)

        expect(computedStyle.color).to.equal('rgb(40, 50, 60)')
        expect(computedStyle.backgroundColor).to.equal(backgroundLight)
      })

      it('component specific overrides', async () => {
        const subject = await mount(
          <EmotionThemeProvider theme={exampleTheme}>
            <EmotionThemeProvider
              theme={{
                componentOverrides: {
                  ThemeableComponent: {
                    textColor: 'rgb(128, 0, 0)'
                  },
                  OtherComponent: {
                    textColor: 'rgb(50, 50, 50)'
                  }
                }
              }}
            >
              <ThemeableComponent />
            </EmotionThemeProvider>
          </EmotionThemeProvider>
        )
        const component = subject.getDOMNode()
        const computedStyle = getComputedStyle(component)

        expect(computedStyle.color).to.equal('rgb(128, 0, 0)')
        expect(computedStyle.backgroundColor).to.equal(backgroundLight)
      })

      it('combined overrides', async () => {
        const subject = await mount(
          <EmotionThemeProvider theme={exampleTheme}>
            <EmotionThemeProvider
              theme={{
                colors: {
                  backgroundLight: 'rgb(200, 210, 220)'
                },
                componentOverrides: {
                  ThemeableComponent: {
                    textColor: 'rgb(128, 0, 0)'
                  }
                },
                themeOverrides: {
                  exampleTheme: {
                    colors: {
                      textBrand: 'rgb(40, 50, 60)',
                      backgroundLight: 'rgb(220, 220, 220)'
                    }
                  }
                }
              }}
            >
              <ThemeableComponent />
            </EmotionThemeProvider>
          </EmotionThemeProvider>
        )
        const component = subject.getDOMNode()
        const computedStyle = getComputedStyle(component)

        // component override should have higher priority
        expect(computedStyle.color).to.equal('rgb(128, 0, 0)')
        // theme override should have higher priority
        expect(computedStyle.backgroundColor).to.equal('rgb(220, 220, 220)')
      })
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
})
