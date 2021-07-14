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
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { merge, cloneDeep } from 'lodash'
import { BaseTheme } from '@instructure/ui-theme-tokens'
import { ComponentThemeMap } from '@instructure/ui-prop-types'
type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

type PartialTheme = DeepPartial<Exclude<BaseTheme, 'key'>>

type T =
  | PartialTheme
  | (PartialTheme & {
      [key: string]:
        | PartialTheme
        | { componentOverrides?: Partial<ComponentThemeMap> }
    })
type OverridableTheme = {
  themeOverrides?: T
  componentOverrides?: Partial<ComponentThemeMap>
}

// const t: OverridableTheme = {
//   componentOverrides: {
//     Avatar: {
//       fontWeight: 1
//     }
//   },
//   themeOverrides: {
//     colors: {
//       ash: '#saasd'
//     },
//     canvas: {
//       componentOverrides: {}
//     }
//   }
// }

type ThemeProviderProps = {
  theme: BaseTheme | OverridableTheme | DeepPartial<BaseTheme>
}

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
function EmotionThemeProvider({
  children,
  theme
}: React.PropsWithChildren<ThemeProviderProps>) {
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
 * @param {object} themeOrOverride - A full theme or an override object
 * @returns {function} A function that returns with the theme object for the [ThemeProvider](https://emotion.sh/docs/theming#themeprovider-reactcomponenttype)
 */
const getTheme = (
  themeOrOverride: BaseTheme | OverridableTheme | DeepPartial<BaseTheme>
) => (ancestorTheme: BaseTheme) => {
  // themeable themes have a 'key' property (= name of the theme),
  // so without it it's just an overrides objects
  if (isBaseTheme(themeOrOverride)) {
    return themeOrOverride
  }

  // we need to clone the ancestor theme not to override it
  const currentTheme: BaseTheme = cloneDeep(ancestorTheme)

  const themeName = currentTheme.key

  // we pick the overrides for the current theme from the override object
  //@ts-expect-error FIX
  const currentThemeOverrides = themeOrOverride.themeOverrides[themeName]

  // saving any other overrides
  //@ts-expect-error FIX
  const { themes, ...otherOverrides } = overrides

  return merge(currentTheme, merge(otherOverrides, currentThemeOverrides))
}

const isBaseTheme = (
  theme: BaseTheme | OverridableTheme | DeepPartial<BaseTheme>
): theme is BaseTheme => !!(theme as BaseTheme).key

export default EmotionThemeProvider
export { EmotionThemeProvider }
