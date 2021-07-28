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
import { ThemeProvider } from '@emotion/react'
import { merge, cloneDeep } from 'lodash'

/**
 * ---
 * category: components/utilities
 * ---
 * Wrapper for the [ThemeProvider](https://emotion.sh/docs/theming#themeprovider-reactcomponenttype) of emotion js.
 *
 * Applies the given theme. It handles either a full theme, or an overrides object.
 *
 * ```js
 * import { canvas, instructure } from '@instructure/ui-themes'
 * import { EmotionThemeProvider } from '@instructure/emotion'
 *
 * @example
 * <EmotionThemeProvider theme={canvas}>
 *   <div>Canvas themed part</div>
 *
 *   <EmotionThemeProvider
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
 *   </EmotionThemeProvider>
 *
 *   <EmotionThemeProvider theme={instructure}>
 *     <div>Instructure themed part</div>
 *   </EmotionThemeProvider>
 * </EmotionThemeProvider>
 * ```
 *
 * @param {object} theme - A full theme or an override object
 */
function EmotionThemeProvider({ children, theme = {} }: any) {
  return <ThemeProvider theme={getTheme(theme)}>{children}</ThemeProvider>
}

/**
 * Gives back the theme object for the the provider.
 *
 * If a full theme is given (has `key` prop), it just returns the theme.
 *
 * If an override object is given, it returns the ancestor theme and
 * the overrides merged together.
 *
 * @param {object} theme - A full theme or an override object
 * @returns {function} A function that returns with the theme object for the [ThemeProvider](https://emotion.sh/docs/theming#themeprovider-reactcomponenttype)
 */
const getTheme = (theme: any) => (ancestorTheme = {}) => {
  // themeable themes have a 'key' property (= name of the theme),
  // so without it it's just an overrides objects
  const overrides = !theme.key ? theme : null

  if (!overrides) {
    return theme
  }

  // we need to clone the ancestor theme not to override it
  const currentTheme = cloneDeep(ancestorTheme)

  // @ts-expect-error solved in another ticket
  const themeName = currentTheme.key

  // we pick the overrides for the current theme from the override object
  const currentThemeOverrides = overrides?.themeOverrides?.[themeName] || {}

  // saving any other overrides
  const { themes, ...otherOverrides } = overrides

  return merge(currentTheme, merge(otherOverrides, currentThemeOverrides))
}

export default EmotionThemeProvider
export { EmotionThemeProvider }
