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
import type { BaseTheme, ComponentTheme } from '@instructure/shared-types'

//TODO-rework remove generateComponentTheme references.
// returns the second parameter of a function
type SecondParameter<T extends (...args: any) => any> =
  Parameters<T>[1] extends undefined ? never : Parameters<T>[1]

type UseStyleParamsWithTheme<
  P extends (componentTheme: any, params: any, theme: any) => any
> = {
  generateStyle: P
  params?: SecondParameter<P>
  generateComponentTheme: (theme: BaseTheme) => ComponentTheme
  componentId: string
  displayName?: string
}

type UseStyleParamsWithoutTheme<
  P extends (componentTheme: any, params: any, theme: any) => any
> = {
  generateStyle: P
  params?: SecondParameter<P>
  generateComponentTheme?: undefined
  componentId?: undefined
  displayName?: undefined
}

const useStyle = <
  P extends (componentTheme: any, params: any, theme: any) => any
>(
  useStyleParams: UseStyleParamsWithTheme<P> | UseStyleParamsWithoutTheme<P>
): ReturnType<P> => {
  const {
    generateStyle,
    generateComponentTheme,
    params,
    componentId,
    displayName
  } = useStyleParams
  const theme = useTheme()

  let baseComponentTheme =
    typeof generateComponentTheme === 'function'
      ? generateComponentTheme(theme as BaseTheme)
      : {}

  if (
    //@ts-expect-error TODO fix these later
    theme.newTheme &&
    //@ts-expect-error TODO fix these later
    theme.newTheme.components[componentId]
  ) {
    baseComponentTheme =
      //@ts-expect-error TODO fix these later
      theme.newTheme.components[componentId]
  }
  const themeOverride = getComponentThemeOverride(
    theme,
    displayName ? displayName : componentId || '',
    componentId,
    params,
    baseComponentTheme
  )

  const componentTheme = { ...baseComponentTheme, ...themeOverride }

  //@ts-expect-error TODO fix these later
  return generateStyle(componentTheme, params ? params : {}, theme.newTheme)
}

export default useStyle
export { useStyle }
