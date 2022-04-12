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
import React from 'react'
import { canvas, canvasHighContrast, instructure } from '@instructure/ui-themes'
import { expect, mount, spy } from '@instructure/ui-test-utils'
import { ThemeRegistry } from '@instructure/theme-registry'

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
  beforeEach(() => {
    ThemeRegistry.clearRegistry()
  })
  afterEach(() => {
    //this is needed to not mess up the global Theme Registry
    ThemeRegistry.setRegistry(defaultRegistry)
  })
  describe('with using InstUISettingsProvider', () => {
    it('should use default canvas theme no "theme" is provided', async () => {
      const callback = spy()
      await mount(
        <InstUISettingsProvider>
          <ExampleComponent callback={callback}></ExampleComponent>
        </InstUISettingsProvider>
      )

      expect(callback).to.have.been.calledWith(canvas)
    })
    it('should use global theme when no "theme" is provided', async () => {
      const callback = spy()
      const theme = ThemeRegistry.registerTheme(instructure)
      theme.use()

      await mount(
        <InstUISettingsProvider>
          <ExampleComponent callback={callback}></ExampleComponent>
        </InstUISettingsProvider>
      )

      expect(callback).to.have.been.calledWith(theme)
    })
    it('should default to canvas theme when no global theme is available and no theme is provided', async () => {
      const callback = spy()

      await mount(
        <InstUISettingsProvider>
          <ExampleComponent callback={callback}></ExampleComponent>
        </InstUISettingsProvider>
      )

      expect(callback).to.have.been.calledWith(canvas)
    })
    it('should use provided theme when theme is provided', async () => {
      const callback = spy()
      const theme = ThemeRegistry.registerTheme(instructure)
      theme.use()

      await mount(
        <InstUISettingsProvider theme={canvasHighContrast}>
          <ExampleComponent callback={callback}></ExampleComponent>
        </InstUISettingsProvider>
      )

      expect(callback).to.have.been.calledWith(canvasHighContrast)
    })
    it('should override the default theme when no other theme is available', async () => {
      const callback = spy()
      await mount(
        <InstUISettingsProvider theme={{ colors: { brand: 'red' } }}>
          <ExampleComponent callback={callback}></ExampleComponent>
        </InstUISettingsProvider>
      )

      expect(callback).to.have.been.calledWithMatch({
        ...canvas,
        colors: { brand: 'red' }
      })
    })
    it('should override the global theme if that is the only theme available', async () => {
      const callback = spy()
      const theme = ThemeRegistry.registerTheme(instructure)
      theme.use()

      await mount(
        <InstUISettingsProvider theme={{ colors: { brand: 'red' } }}>
          <ExampleComponent callback={callback}></ExampleComponent>
        </InstUISettingsProvider>
      )

      expect(callback).to.have.been.calledWithMatch({
        ...theme,
        colors: { brand: 'red' }
      })
    })
    it('should override the global theme if that is the only theme available 2', async () => {
      const callback = spy()
      const theme = ThemeRegistry.registerTheme(instructure)
      theme.use()

      await mount(
        <InstUISettingsProvider
          theme={{ themeOverrides: { colors: { brand: 'red' } } }}
        >
          <ExampleComponent callback={callback}></ExampleComponent>
        </InstUISettingsProvider>
      )

      expect(callback).to.have.been.calledWithMatch({
        ...theme,
        colors: { brand: 'red' }
      })
    })
    it('shuold override the theme from context when provided', async () => {
      const callback = spy()
      const theme = ThemeRegistry.registerTheme(instructure)
      theme.use()

      await mount(
        <InstUISettingsProvider theme={canvasHighContrast}>
          <InstUISettingsProvider
            theme={{ themeOverrides: { colors: { brand: 'red' } } }}
          >
            <ExampleComponent callback={callback}></ExampleComponent>
          </InstUISettingsProvider>
        </InstUISettingsProvider>
      )

      expect(callback).to.have.been.calledWithMatch({
        ...canvasHighContrast,
        colors: { brand: 'red' }
      })
    })
  })
  describe('without using InstUISettingsProvider', () => {
    it('should use theme from global ThemeRegistry', async () => {
      const callback = spy()
      const theme = ThemeRegistry.registerTheme(instructure)
      theme.use()

      await mount(<ExampleComponent callback={callback}></ExampleComponent>)

      expect(callback).to.have.been.calledWith(theme)
    })
    it('should use default "canvas" theme when no theme is used from ThemeRegistry', async () => {
      const callback = spy()
      await mount(<ExampleComponent callback={callback}></ExampleComponent>)

      expect(callback).to.have.been.calledWith(canvas)
    })
  })
  describe('with InstUISettingsProvider and global theme', () => {
    it('overrides should work correctly', async () => {
      const [cb1, cb2, cb3, cb4, cb5, cb6] = Array(6)
        .fill(0)
        .map(() => spy())

      const theme = ThemeRegistry.registerTheme(instructure)
      theme.use({
        overrides: {
          colors: {
            backgroundLight: 'red',
            borderLight: 'yellow',
            textDarkest: 'magenta'
          }
        }
      })

      await mount(
        <>
          {/* no provider -> instructure theme */}
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
                    backgroundLight: 'orange'
                  },
                  themeOverrides: {
                    colors: {
                      borderLight: 'olive'
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
            {/* no theme provided -> instructure theme */}
            <ExampleComponent callback={cb5}></ExampleComponent>
            <InstUISettingsProvider
              theme={{
                colors: {
                  backgroundLight: 'brown'
                },
                themeOverrides: {
                  colors: {
                    borderLight: 'pink'
                  }
                }
              }}
            >
              {/* no theme provided -> instructure theme with overrides */}
              <ExampleComponent callback={cb6}></ExampleComponent>
            </InstUISettingsProvider>
          </InstUISettingsProvider>
        </>
      )

      expect(cb1).to.have.been.calledWithMatch({
        ...theme,
        colors: {
          backgroundLight: 'red',
          borderLight: 'yellow',
          textDarkest: 'magenta'
        }
      })
      expect(cb2).to.have.been.calledWith(canvasHighContrast)
      expect(cb3).to.have.been.calledWith(canvas)
      expect(cb4).to.have.been.calledWithMatch({
        ...canvas,
        colors: {
          backgroundLight: 'orange',
          borderLight: 'olive'
        }
      })
      expect(cb5).to.have.been.calledWithMatch({
        ...theme,
        colors: {
          backgroundLight: 'red',
          borderLight: 'yellow',
          textDarkest: 'magenta'
        }
      })
      expect(cb6).to.have.been.calledWithMatch({
        ...theme,
        colors: {
          backgroundLight: 'brown',
          borderLight: 'pink',
          textDarkest: 'magenta'
        }
      })
    })
  })
  it('should work correctly when multiple React trees is used', async () => {
    const callback1 = spy()
    const callback2 = spy()

    const theme = ThemeRegistry.registerTheme(instructure)
    theme.use()

    //first react tree
    await mount(<ExampleComponent callback={callback1}></ExampleComponent>)

    //second react tree
    await mount(<ExampleComponent callback={callback2}></ExampleComponent>)

    expect(callback1).to.have.been.calledWith(theme)
    expect(callback2).to.have.been.calledWith(theme)
  })
  it('should work correctly when multiple React trees is used together with InstUISettingsProvider', async () => {
    const callback1 = spy()
    const callback2 = spy()
    const callback3 = spy()

    const theme = ThemeRegistry.registerTheme(instructure)
    theme.use()

    //first react tree
    await mount(<ExampleComponent callback={callback1}></ExampleComponent>)

    //second react tree
    await mount(
      <InstUISettingsProvider>
        <ExampleComponent callback={callback2}></ExampleComponent>
      </InstUISettingsProvider>
    )

    //third react tree
    await mount(
      <InstUISettingsProvider theme={canvasHighContrast}>
        <ExampleComponent callback={callback3}></ExampleComponent>
      </InstUISettingsProvider>
    )

    expect(callback1).to.have.been.calledWith(theme)
    expect(callback2).to.have.been.calledWith(theme)
    expect(callback3).to.have.been.calledWith(canvasHighContrast)
  })
})
