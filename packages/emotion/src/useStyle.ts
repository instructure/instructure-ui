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
import { getComponentThemeOverride } from './getComponentThemeOverride'
import type {
  SharedTokens,
  NewComponentTypes,
  Theme
} from '@instructure/ui-themes'
import type { BaseThemeOrOverride } from './EmotionTypes'

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

const isNewThemeObject = (obj: BaseThemeOrOverride): obj is Theme => {
  return typeof (obj as any)?.newTheme === 'object'
}

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
  const { generateStyle, params, componentId, displayName, themeOverride } =
    useStyleParams
  const useTokensFrom = useStyleParams.useTokensFrom
  const theme = useTheme()

  let baseComponentTheme = {}
  const componentWithTokensId = useTokensFrom ?? componentId

  if (
    isNewThemeObject(theme) && // TODO: is it possible not to have a theme object here?
    theme.newTheme.components[componentWithTokensId as keyof NewComponentTypes]
  ) {
    baseComponentTheme =
      theme.newTheme.components[
        componentWithTokensId as keyof NewComponentTypes
      ]
  }
  const finalOverride = getComponentThemeOverride(
    theme,
    useTokensFrom ?? displayName ?? componentId ?? '',
    componentWithTokensId,
    themeOverride,
    baseComponentTheme
  )

  const componentTheme = { ...baseComponentTheme, ...finalOverride }

  return generateStyle(
    componentTheme,
    params,
    (theme as Theme).newTheme.sharedTokens
  )
}

export default useStyle
export { useStyle }
export type { ThemeOverrideValue }
