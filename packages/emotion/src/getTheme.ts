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
import canvas from '@instructure/ui-themes'
import { ThemeRegistry } from '@instructure/theme-registry'
import { isBaseTheme, mergeDeep } from '@instructure/ui-utils'

import type { BaseTheme } from '@instructure/shared-types'

import type {
  Overrides,
  ThemeOrOverride,
  SpecificThemeOverride
} from './EmotionTypes'

/**
 * ---
 * private: true
 * ---
 * Gives back the theme object for the provider.
 *
 * If a valid InstUI theme is given, it just returns the theme.
 *
 * If an override object is given, it returns the ancestor theme and
 * the overrides merged together.
 *
 * @param themeOrOverride - A full theme or an override object
 * @returns A function that returns with the theme object for the [ThemeProvider](https://emotion.sh/docs/theming#themeprovider-reactcomponenttype)
 *    This function is called by Emotion on theme provider creation, where
 *    `ancestorTheme` is a theme object from an ancestor `ThemeProvider`
 */
const getTheme =
  (themeOrOverride: ThemeOrOverride) =>
  (ancestorTheme = {} as BaseTheme) => {
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
          'The `theme` property provided to InstUISettingsProvider is not a valid InstUI theme object.\ntheme: ',
          themeOrOverride
        )
      }
      // eslint-disable-next-line no-param-reassign
      themeOrOverride = {}
    }

    // we need to clone the ancestor theme not to override it
    let currentTheme
    if (Object.keys(ancestorTheme).length === 0) {
      const globalTheme = ThemeRegistry.getCurrentTheme()

      if (process.env.NODE_ENV !== 'production' && !globalTheme) {
        console.warn(
          'No theme provided for [InstUISettingsProvider], using default `canvas` theme.'
        )
      }
      currentTheme = globalTheme || canvas
    } else {
      currentTheme = ancestorTheme
    }

    const themeName = currentTheme.key

    // we pick the overrides for the current theme from the override object
    const currentThemeOverrides =
      (
        (themeOrOverride as Overrides)?.themeOverrides as SpecificThemeOverride
      )?.[themeName] ||
      (themeOrOverride as Overrides).themeOverrides ||
      {}

    return mergeDeep(currentTheme, themeOrOverride, currentThemeOverrides)
  }

export default getTheme
export { getTheme }
