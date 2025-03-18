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
import { useState } from 'react'

import { expect, mount, stub, within } from '@instructure/ui-test-utils'
import { jsx, InstUISettingsProvider, WithStyleProps, useStyle } from '../index'

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

describe('useStyle', async () => {
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
      <div css={styles!.exampleComponent}>
        <p>Hello World</p>
        <button onClick={handleClick}>Button</button>
      </div>
    )
  }

  describe('with theme provided by InstUISettingsProvider', async () => {
    it('should add css class suffixed with label', async () => {
      const subject = await mount(
        <InstUISettingsProvider theme={exampleTheme}>
          <ThemedComponent />
        </InstUISettingsProvider>
      )
      const emotionClassRegex = new RegExp(/^css-.+-exampleComponent$/)

      expect(subject.getDOMNode().classList[0]).to.match(emotionClassRegex)
    })

    it('should apply correct css props', async () => {
      const subject = await mount(
        <InstUISettingsProvider theme={exampleTheme}>
          <ThemedComponent />
        </InstUISettingsProvider>
      )
      const component = subject.getDOMNode()
      const computedStyle = getComputedStyle(component)

      expect(computedStyle.color).to.equal('rgb(0, 128, 0)')
      expect(computedStyle.backgroundColor).to.equal('rgb(255, 255, 0)')
    })

    describe('should allow configuration through the themeOverride prop', async () => {
      it('when it is an object', async () => {
        const subject = await mount(
          <InstUISettingsProvider theme={exampleTheme}>
            <ThemedComponent
              themeOverride={{
                textColor: 'rgb(128, 0, 128)'
              }}
            />
          </InstUISettingsProvider>
        )
        const component = subject.getDOMNode()
        const computedStyle = getComputedStyle(component)

        expect(computedStyle.color).to.equal('rgb(128, 0, 128)')
        expect(computedStyle.backgroundColor).to.equal('rgb(255, 255, 0)')
      })

      it('when it is a function', async () => {
        const subject = await mount(
          <InstUISettingsProvider theme={exampleTheme}>
            <ThemedComponent
              themeOverride={(componentTheme) => ({
                textColor: componentTheme.backgroundColor
              })}
            />
          </InstUISettingsProvider>
        )
        const component = subject.getDOMNode()
        const computedStyle = getComputedStyle(component)

        expect(computedStyle.color).to.equal('rgb(255, 255, 0)')
        expect(computedStyle.backgroundColor).to.equal('rgb(255, 255, 0)')
      })
    })

    it('should ignore empty themeOverride props', async () => {
      const subject = await mount(
        <InstUISettingsProvider theme={exampleTheme}>
          <ThemedComponent themeOverride={{}} />
        </InstUISettingsProvider>
      )
      const component = subject.getDOMNode()
      const computedStyle = getComputedStyle(component)

      expect(computedStyle.color).to.equal('rgb(0, 128, 0)')
      expect(computedStyle.backgroundColor).to.equal('rgb(255, 255, 0)')
    })
  })

  describe('should update css props', async () => {
    it('when props are updated', async () => {
      // `setProps` can be called on the outer component,
      // so have to add the theme ad themeOverride here, and suppress the error
      stub(console, 'warn') // suppress "no theme provided error"

      const subject = await mount(
        <ThemedComponent
          inverse={false}
          themeOverride={{
            textColor: grey1111,
            textColorInverse: blue4570,
            backgroundColor: green4570
          }}
        />
      )
      const component = subject.getDOMNode()

      expect(getComputedStyle(component).color).to.equal(grey1111)

      await subject.setProps({ inverse: true })

      expect(getComputedStyle(component).color).to.equal(blue4570)
    })

    it('when state is updated', async () => {
      const subject = await mount(
        <InstUISettingsProvider theme={exampleTheme}>
          <ThemedComponent />
        </InstUISettingsProvider>
      )
      const main = within(subject.getDOMNode())
      const clearBackgroundButton = await main.find('button')
      const component = main.getDOMNode()

      expect(getComputedStyle(component).backgroundColor).to.equal(
        'rgb(255, 255, 0)'
      )

      await clearBackgroundButton.click()

      expect(getComputedStyle(component).backgroundColor).to.equal(
        'rgba(0, 0, 0, 0)'
      )
    })
  })

  describe('should apply bi-directional polyfill on styles object', async () => {
    it('in default "ltr" mode', async () => {
      const subject = await mount(
        <InstUISettingsProvider theme={exampleTheme}>
          <ThemedComponent />
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
        <InstUISettingsProvider theme={exampleTheme} dir="rtl">
          <ThemedComponent />
        </InstUISettingsProvider>
      )
      const component = subject.getDOMNode().firstElementChild
      const computedStyle = getComputedStyle(component!)

      // `inset-inline-start` should be transformed to 'right' in 'rtl' mode
      expect(computedStyle.left).to.equal('auto')
      expect(computedStyle.right).to.equal('8px')
    })
  })
})
