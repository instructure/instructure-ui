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
import { merge, cloneDeep } from 'lodash'
import { ThemeProvider } from '@emotion/react'

import { canvas } from '@instructure/ui-themes'

import type {
  BaseTheme,
  BaseThemeVariableKeys
} from '@instructure/shared-types'
import type {
  Overrides,
  ThemeOrOverride,
  SpecificThemeOverride
} from '../EmotionTypes'

type ThemeProviderProps = {
  theme?: ThemeOrOverride
}

const baseThemeProps: BaseThemeVariableKeys = [
  'borders',
  'breakpoints',
  'colors',
  'forms',
  'media',
  'shadows',
  'spacing',
  'stacking',
  'transitions',
  'typography'
]

/**
 * ---
 * category: components/utilities
 * ---
 *
 * #### DEPRECATED Please use [InstUISettingsProvider](#InstUISettingsProvider)
 * instead. It has the same functionality and adds a text direction context.
 *
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
 * @param {object} children
 * @param {object} theme - A full theme or an override object
 * @module EmotionThemeProvider
 */
function EmotionThemeProvider({
  children,
  theme = {}
}: React.PropsWithChildren<ThemeProviderProps>) {
  return <ThemeProvider theme={getTheme(theme)}>{children}</ThemeProvider>
}
EmotionThemeProvider.defaultProps = { theme: {} }

/**
 * Gives back the theme object for the the provider.
 *
 * If a valid InstUI theme is given, it just returns the theme.
 *
 * If an override object is given, it returns the ancestor theme and
 * the overrides merged together.
 *
 * @param {object} themeOrOverride - A full theme or an override object
 * @returns {function} A function that returns with the theme object for the [ThemeProvider](https://emotion.sh/docs/theming#themeprovider-reactcomponenttype)
 * @module getTheme
 */
const getTheme = (themeOrOverride: ThemeOrOverride) => (
  ancestorTheme = {} as BaseTheme
) => {
  try {
    // If a valid InstUI theme is given, it just returns the theme.
    if (isBaseTheme(themeOrOverride)) {
      return themeOrOverride
    }
  } catch {
    // If the prop passed is not an Object, it will throw an error.
    // We are using this fail-safe here for the non-TS users,
    // because the whole page can break without a theme.
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        'The `theme` property provided to EmotionThemeProvider is not a valid InstUI theme object.\ntheme: ',
        themeOrOverride
      )
    }
    // eslint-disable-next-line no-param-reassign
    themeOrOverride = {}
  }

  // we need to clone the ancestor theme not to override it
  let currentTheme

  if (Object.keys(ancestorTheme).length === 0) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        'No theme provided for [EmotionThemeProvider], using default `canvas` theme.'
      )
    }
    currentTheme = cloneDeep(canvas)
  } else {
    currentTheme = cloneDeep(ancestorTheme)
  }

  const themeName = currentTheme.key

  // we pick the overrides for the current theme from the override object
  const currentThemeOverrides =
    ((themeOrOverride as Overrides)?.themeOverrides as SpecificThemeOverride)?.[
      themeName
    ] || {}

  return merge(
    {},
    currentTheme,
    merge({}, themeOrOverride, currentThemeOverrides)
  )
}

const isBaseTheme = (theme: ThemeOrOverride): theme is BaseTheme => {
  if (Array.isArray(theme) || typeof theme === 'function') {
    throw new Error()
  }

  try {
    return (
      'key' in (theme as BaseTheme) &&
      baseThemeProps.every((prop) => prop in theme)
    )
  } catch {
    throw new Error()
  }
}

export default EmotionThemeProvider
export { EmotionThemeProvider, getTheme }
