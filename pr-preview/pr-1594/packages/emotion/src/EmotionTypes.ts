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

import type {
  BaseTheme,
  ComponentTheme,
  ComponentThemeMap,
  DeepPartial
} from '@instructure/shared-types'

type PartialTheme = DeepPartial<Omit<BaseTheme, 'key'>>

type ComponentOverride =
  | DeepPartial<ComponentThemeMap>
  // this is needed for user defined components which we can't possibly type
  | { [otherComponent: string]: ComponentTheme }

type SpecificThemeOverride = {
  [key: string]: PartialTheme | { componentOverrides?: ComponentOverride }
}

type ThemeOverride = PartialTheme | SpecificThemeOverride

type Overrides = {
  themeOverrides?: ThemeOverride
  componentOverrides?: ComponentOverride
}

type ThemeOrOverride = BaseTheme | PartialTheme | Overrides

type Props = Record<string, unknown>
type State = Record<string, unknown>

type GenerateComponentTheme = (
  theme: BaseTheme | PartialTheme
) => ComponentTheme

type GenerateStyle = (
  componentTheme: ComponentTheme,
  props: Props,
  state?: State
) => StyleObject

type ComponentStyle<Keys extends string = string> = Record<
  Keys,
  StyleObject | string | number | undefined
>

/**
 * Style object returned by the generateStyle method of the components
 */
export interface StyleObject {
  [key: string]: StyleObject | string | number | undefined
}

export type {
  ThemeOrOverride,
  Overrides,
  ComponentOverride,
  SpecificThemeOverride,
  ThemeOverride,
  PartialTheme,
  Props,
  State,
  GenerateComponentTheme,
  GenerateStyle,
  ComponentStyle
}
