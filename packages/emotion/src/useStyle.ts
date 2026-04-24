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
  NewComponentTypes,
  SharedTokens,
  Theme
} from '@instructure/ui-themes'

// returns the second parameter of a function
type SecondParameter<T extends (...args: any) => any> =
  Parameters<T>[1] extends undefined ? never : Parameters<T>[1]

type NewThemeOverrideProp<
  ComponentTheme extends ReturnType<NewComponentTypes[keyof NewComponentTypes]>
> = {
  themeOverride?:
    | Partial<ComponentTheme>
    | ((compTheme: ComponentTheme, theme: Theme) => Partial<ComponentTheme>)
}

type GenerateStyleFn<ComponentTheme> =
  | ((
      componentTheme: ComponentTheme,
      params: any,
      sharedTokens: SharedTokens
    ) => any)
  | ((componentTheme: ComponentTheme, params: any) => any)
  | ((componentTheme: ComponentTheme) => any)

/**
 * new useStyle syntax, use this with v11.7+ themes
 */
// TODO: improve useStyle to handle generateStyle functions that don't
// have a theme.
const useStyle = <
  ComponentTheme extends ReturnType<NewComponentTypes[keyof NewComponentTypes]>,
  GenerateStyle extends GenerateStyleFn<ComponentTheme>
>(useStyleParams: {
  generateStyle: GenerateStyle
  params?: SecondParameter<GenerateStyle>
  // needs to be a string too because it might be a child component
  componentId: keyof NewComponentTypes | string
  themeOverride?: NewThemeOverrideProp<ComponentTheme>['themeOverride']
  displayName?: string
  //in case of a child component needed to use its parent's tokens, provide parent's name
  useTokensFrom?: keyof NewComponentTypes
}): ReturnType<GenerateStyle> => {
  const { generateStyle, params, componentId, themeOverride } = useStyleParams
  const useTokensFrom = useStyleParams.useTokensFrom
  const themeInContext = useTheme() as Theme

  const themeOverrideFromProvider = themeInContext.themeOverride
  const componentWithTokensId =
    useTokensFrom ?? (componentId as keyof NewComponentTypes)

  // resolving the theming functions and applying the overrides
  const primitiveOverrides = themeOverrideFromProvider?.primitives
  const semanticsOverrides = themeOverrideFromProvider?.semantics
  const sharedTokensOverrides = themeOverrideFromProvider?.sharedTokens
  const componentOverridesFromSettingsProvider =
    themeOverrideFromProvider?.components?.[componentWithTokensId]

  const primitives = mergeDeep(
    themeInContext.newTheme.primitives,
    primitiveOverrides!
  )

  const semantics = mergeDeep(
    themeInContext.newTheme.semantics?.(primitives),
    semanticsOverrides!
  )

  const sharedTokens = mergeDeep(
    themeInContext.newTheme.sharedTokens?.(semantics),
    sharedTokensOverrides as Record<string, unknown>
  )

  const baseComponentTheme =
    themeInContext.newTheme.components[componentWithTokensId]?.(semantics)

  const componentThemeFromSettingsProvider = mergeDeep(
    baseComponentTheme,
    componentOverridesFromSettingsProvider as Record<string, unknown>
  ) as ComponentTheme

  const componentTheme = mergeDeep(
    componentThemeFromSettingsProvider,
    typeof themeOverride === 'function'
      ? themeOverride(componentThemeFromSettingsProvider, themeInContext)
      : themeOverride!
  )

  // @ts-ignore TODO-theme-types: fix typing
  return generateStyle(componentTheme, params, sharedTokens)
}

export default useStyle
export { useStyle }
export type { NewThemeOverrideProp }
