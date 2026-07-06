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

import { useTheme } from './useTheme.js'
import { mergeDeep } from '@instructure/ui-utils'
import { applyColorModifiers } from './styleUtils/applyColorModifiers.js'
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
 * new useStyleNew syntax, use this with v11.7+ themes
 */
// TODO: improve useStyleNew to handle generateStyle functions that don't
// have a theme.
const useStyleNew = <
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
  frozenTheme?: any
  generateComponentTheme?: any
}): ReturnType<GenerateStyle> => {
  const {
    generateStyle,
    params,
    componentId,
    themeOverride,
    frozenTheme,
    generateComponentTheme
  } = useStyleParams
  const useTokensFrom = useStyleParams.useTokensFrom
  const themeInContext = useTheme() as Theme
  const themeKey = themeInContext.key

  // if a new theme has been added to the lib since this component version has been frozen, it can't be used with this
  // theme, so we throw an error. Solution: upgrade to the latest version, it will support it
  if (frozenTheme && !frozenTheme[themeKey]) {
    console.error(
      `The version of ${componentId} you are using does not support the currently applied "${themeKey}" theme. ` +
        `Please upgrade to the latest version of ${componentId}.`
    )
  }

  // if this component is an older component version but still uses the new theming system, it'll have a frozenTheme
  // object passed to it. We use that instead of the current theme so backward compatibility stays intact
  const theme = frozenTheme
    ? { newTheme: frozenTheme[themeKey] }
    : themeInContext

  const themeOverrideFromProvider = themeInContext.themeOverride
  const componentWithTokensId =
    useTokensFrom ?? (componentId as keyof NewComponentTypes)

  // resolving the theming functions and applying the overrides
  const primitiveOverrides = themeOverrideFromProvider?.primitives
  const semanticsOverrides = themeOverrideFromProvider?.semantics
  const sharedTokensOverrides = themeOverrideFromProvider?.sharedTokens
  const componentOverridesFromSettingsProvider =
    themeOverrideFromProvider?.components?.[
      componentId as keyof NewComponentTypes
    ]

  const primitives = mergeDeep(theme.newTheme.primitives, primitiveOverrides!)

  const semantics = applyColorModifiers(
    mergeDeep(theme.newTheme.semantics?.(primitives), semanticsOverrides!)
  )

  const sharedTokens = applyColorModifiers(
    mergeDeep(
      theme.newTheme.sharedTokens?.(semantics),
      sharedTokensOverrides as Record<string, unknown>
    )
  )

  const baseComponentTheme = applyColorModifiers(
    generateComponentTheme
      ? generateComponentTheme({ primitives, semantics, sharedTokens })
      : theme.newTheme.components[componentWithTokensId]?.(semantics)
  )

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

export default useStyleNew
export { useStyleNew }
export type { NewThemeOverrideProp }
