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

import { useTheme } from './useTheme'
import { mergeDeep } from '@instructure/ui-utils'
import type {
  SharedTokens,
  NewComponentTypes,
  Theme
} from '@instructure/ui-themes'

// returns the second parameter of a function
type SecondParameter<T extends (...args: any) => any> =
  Parameters<T>[1] extends undefined ? never : Parameters<T>[1]

type GenerateStyleParams =
  | ((componentTheme: any, params: any, sharedTokens: SharedTokens) => any)
  | ((componentTheme: any, params: any) => any)
  | ((componentTheme: any) => any)

/**
 * Type for a theme override
 */
type ThemeOverrideValue =
  | Partial<Theme>
  | ((
    componentTheme: Theme,
    currentTheme: NewComponentTypes[keyof NewComponentTypes]
  ) => Partial<Theme>)

/**
 * new useStyle syntax, use this with v12 themes
 */

// TODO: improve useStyle to handle generateStyle functions that don't
// have a theme.
const useStyle = <P extends GenerateStyleParams>(useStyleParams: {
  generateStyle: P
  params?: SecondParameter<P>
  // needs to be a string too because it might be a child component
  componentId: keyof NewComponentTypes | string
  themeOverride: ThemeOverrideValue | undefined
  displayName?: string
  //in case of a child component needed to use it's parent's tokens, provide parent's name
  useTokensFrom?: keyof NewComponentTypes
}): ReturnType<P> => {
  const { generateStyle, params, componentId, themeOverride } = useStyleParams
  const useTokensFrom = useStyleParams.useTokensFrom
  const themeInContext = useTheme() as Theme

  const themeOverrideFromProvider = themeInContext.themeOverride
  const componentWithTokensId = useTokensFrom ?? componentId

  // resolving the theming functions and applying the overrides
  const primitiveOverrides = themeOverrideFromProvider?.primitives
  const semanticsOverrides = themeOverrideFromProvider?.semantics
  // @ts-ignore TODO-theme-types: fix typing
  const sharedTokensOverrides = themeOverrideFromProvider?.sharedTokens
  const componentOverridesFromSettingsProvider =
    // @ts-ignore TODO-theme-types: fix typing
    themeOverrideFromProvider?.components?.[
    componentWithTokensId as keyof NewComponentTypes
    ]

  const primitives = mergeDeep(
    themeInContext.newTheme.primitives,
    primitiveOverrides
  )

  const semantics = mergeDeep(
    themeInContext.newTheme.semantics?.(primitives),
    semanticsOverrides
  )

  const sharedTokens = mergeDeep(
    themeInContext.newTheme.sharedTokens?.(semantics),
    sharedTokensOverrides
  )

  const baseComponentTheme =
    themeInContext.newTheme.components[
      componentWithTokensId as keyof NewComponentTypes
    ]?.(semantics)

  const componentThemeFromSettingsProvider = mergeDeep(
    baseComponentTheme,
    componentOverridesFromSettingsProvider
  )

  const componentTheme = mergeDeep(
    componentThemeFromSettingsProvider,
    // @ts-ignore TODO-theme-types: fix typing
    typeof themeOverride === 'function'
      ? themeOverride(
        componentThemeFromSettingsProvider as Theme,
        themeInContext as any
      )
      : themeOverride
  )

  // @ts-ignore TODO-theme-types: fix typing
  return generateStyle(componentTheme, params, sharedTokens)
}

export default useStyle
export { useStyle }
export type { ThemeOverrideValue }
