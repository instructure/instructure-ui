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
import { isBaseTheme, mergeDeep } from '@instructure/ui-utils'

import type { BaseTheme } from '@instructure/shared-types'

import type {
  Overrides,
  ThemeOrLegacyOverride,
  SpecificThemeOverride
} from './EmotionTypes'
declare const process: Record<string, any> | undefined

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
 * @param themeOrLegacyOverride - A full theme or an override object
 * @param themeOverride - if provided, it means it's a new theming-system override. This will be merged into theme.themeOverride and will be treated separately from the old way of applying overrides. This override will be applied in the withStyle.ts decorator
 * @returns A function that returns with the theme object for the [ThemeProvider](https://emotion.sh/docs/theming#themeprovider-reactcomponenttype)
 *    This function is called by Emotion on theme provider creation, where
 *    `ancestorTheme` is a theme object from an ancestor `ThemeProvider`
 */
const getTheme =
  (themeOrLegacyOverride: ThemeOrLegacyOverride, themeOverride?: any) =>
  (ancestorTheme = {} as BaseTheme) => {
    // we need to clone the ancestor theme not to override it
    let currentTheme
    if (Object.keys(ancestorTheme).length === 0) {
      if (
        typeof process !== 'undefined' &&
        (process?.env?.NODE_ENV !== 'production' ||
          process?.env?.GITHUB_PULL_REQUEST_PREVIEW === 'true')
      ) {
        console.warn(
          'No theme provided for [InstUISettingsProvider], using default `canvas` theme.'
        )
      }
      currentTheme = canvas
    } else {
      currentTheme = ancestorTheme
    }

    const resolvedThemeOverride =
      typeof themeOverride === 'function'
        ? themeOverride(currentTheme)
        : themeOverride

    let resolvedLegacyThemeOrOverride =
      typeof themeOrLegacyOverride === 'function'
        ? themeOrLegacyOverride(currentTheme)
        : themeOrLegacyOverride

    try {
      // If a valid InstUI theme is given, it just returns the theme.
      // in case of the legacy pattern, it's just a simple replacement, in the new system, overrides should be merged into the new theme. Old overrides will be removed because they may make no sense for a different theme
      if (isBaseTheme(resolvedLegacyThemeOrOverride)) {
        return {
          ...resolvedLegacyThemeOrOverride,
          ...(resolvedThemeOverride
            ? { themeOverride: resolvedThemeOverride }
            : {})
        }
      }
    } catch {
      // If the prop passed is not an Object, it will throw an error.
      // We are using this fail-safe here for the non-TS users,
      // because the whole page can break without a theme.
      if (
        typeof process !== 'undefined' &&
        (process?.env?.NODE_ENV !== 'production' ||
          process?.env?.GITHUB_PULL_REQUEST_PREVIEW === 'true')
      ) {
        console.warn(
          'The `theme` property provided to InstUISettingsProvider is not a valid InstUI theme object.\ntheme: ',
          resolvedLegacyThemeOrOverride
        )
      }
      resolvedLegacyThemeOrOverride = {}
    }

    const themeName = currentTheme.key

    // legacy: we pick the overrides for the current theme from the override object
    const specificOverrides = (resolvedLegacyThemeOrOverride as Overrides)
      ?.themeOverrides
    const currentThemeOverrides =
      (specificOverrides as SpecificThemeOverride)?.[themeName] ||
      specificOverrides ||
      {}

    return mergeDeep(
      currentTheme,
      resolvedLegacyThemeOrOverride,
      currentThemeOverrides,
      ...(resolvedThemeOverride
        ? [{ themeOverride: resolvedThemeOverride }]
        : [])
    )
  }

export default getTheme
export { getTheme }
