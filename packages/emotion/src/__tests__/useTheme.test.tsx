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
    it('should not use global theme when no "theme is provided"', async () => {
      const callback = spy()
      const theme = ThemeRegistry.registerTheme(instructure)
      theme.use()

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
      const warn = spy(console, 'warn')
      await mount(<ExampleComponent callback={callback}></ExampleComponent>)

      expect(callback).to.have.been.calledWith(canvas)
      expect(warn).to.have.been.calledWith(
        'No theme provided for [InstUISettingsProvider], using default <canvas> theme.'
      )
    })
  })
})
