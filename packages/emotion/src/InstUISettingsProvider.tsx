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

import React, { useContext } from 'react'
import { TextDirectionContext } from '@instructure/ui-i18n'
import { ThemeProvider } from '@emotion/react'
import { ThemeOrOverride } from './EmotionTypes'
import { getTheme } from './EmotionThemeProvider'

type InstUIProviderProps = {
  theme?: ThemeOrOverride
  dir?: 'ltr' | 'rtl' // TODO allow "auto" too
}
/**
 * ---
 * category: components/utilities
 * ---
 * Wrapper for emotion js's [ThemeProvider](https://emotion.sh/docs/theming#themeprovider-reactcomponenttype).
 *
 * Applies the given theme. It handles either a full theme, or an overrides object.
 * You can also specify the requested text direction for its descendants
 *
 * ```js
 * import { canvas, instructure } from '@instructure/ui-themes'
 * import { InstUISettingsProvider } from '@instructure/emotion'
 *
 * @example
 * <InstUISettingsProvider theme={canvas}>
 *   <div>Canvas themed part</div>
 *
 *   <InstUISettingsProvider
 *     theme={{
 *       themeOverrides: {
 *         canvas: {
 *           colors: {
 *             backgroundLightest: '#fefefe'
 *           },
 *           borders: {
 *             style: 'dashed'
 *           }
 *         }
 *       }
 *     }}
 *   >
 *     <div>Canvas with new 'backgroundLightest'</div>
 *   </InstUISettingsProvider>
 *
 *   <InstUISettingsProvider theme={instructure} dir="rtl">
 *     <div>Instructure themed part</div>
 *   </InstUISettingsProvider>
 * </InstUISettingsProvider>
 * ```
 *
 * @param {object} children
 * @param {object} theme - A full theme or an override object
 * @param {string} dir - The text direction to use in the descendants. If not
 * given it uses the following in this priority order:
 *   - The value given in a parent `TextDirectionContext`
 *   - The `dir` prop of `document.documentElement` or its `direction` CSS prop
 *   - `ltr`
 * @module InstUISettingsProvider
 */
function InstUISettingsProvider({
  children,
  theme = {},
  dir
}: React.PropsWithChildren<InstUIProviderProps>) {
  const finalDir = dir || useContext(TextDirectionContext)
  return (
    <ThemeProvider theme={getTheme(theme)}>
      <TextDirectionContext.Provider value={finalDir}>
        {children}
      </TextDirectionContext.Provider>
    </ThemeProvider>
  )
}

InstUISettingsProvider.defaultProps = {
  theme: {},
  dir: undefined
}
export default InstUISettingsProvider
export { InstUISettingsProvider }
