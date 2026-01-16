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
import type { ComponentTypes as NewComponentTypes } from './themes/newThemes/componentTypes'
import type {
  BaseTheme as NewBaseTheme,
  TokenBoxshadowValueInst,
  TokenTypographyValueInst
} from './themes/newThemes/commonTypes'
import type { SharedTokens } from './themes/newThemes/componentTypes/sharedTokens'
import type { CanvasHighContrastTheme } from './themes/canvasHighContrast'
import type { CanvasTheme, CanvasBrandVariables } from './themes/canvas'
import type {
  BaseTheme,
  Primitives,
  AdditionalPrimitives,
  DataVisualization,
  UI
} from '@instructure/shared-types'

import canvasHighContrast from './themes/canvasHighContrast'
import canvas from './themes/canvas'

import rebrandDark from './themes/rebrandDark'

import rebrandLight from './themes/rebrandLight'

import {
  primitives,
  additionalPrimitives
} from './sharedThemeTokens/colors/primitives'
import dataVisualization from './sharedThemeTokens/colors/dataVisualization'
import { boxShadowObjectsToCSSString } from './utils/boxShadowObjectToString'

import type {
  LegacyCanvas as NewCanvas,
  LegacyCanvasHighContrast as NewCanvasHighContrast,
  Dark as NewRebrandDark,
  Light as NewRebrandLight
} from './themes/newThemes'

type ThemeMap = {
  canvas: CanvasTheme
  'canvas-high-contrast': CanvasHighContrastTheme
  // needed for custom theme support
  [k: string]: BaseTheme
}

type ThemeKeys = keyof ThemeMap

type Theme<
  NewThemeType extends NewBaseTheme = NewBaseTheme,
  K extends ThemeKeys = ThemeKeys
> = BaseTheme & { newTheme: NewThemeType } & {
  key: K
} & Partial<CanvasBrandVariables>

type ThemeSpecificStyle<ComponentTheme> = {
  [themeKey in ThemeKeys]?: Partial<ComponentTheme>
}

export {
  rebrandDark,
  rebrandLight,
  canvas,
  canvasHighContrast,
  primitives,
  additionalPrimitives,
  dataVisualization,
  boxShadowObjectsToCSSString
}
export default canvas
export type {
  ThemeMap,
  BaseTheme,
  Theme,
  ThemeKeys,
  ThemeSpecificStyle,
  CanvasTheme,
  CanvasBrandVariables,
  CanvasHighContrastTheme,
  Primitives,
  AdditionalPrimitives,
  DataVisualization,
  UI,
  NewCanvas,
  NewCanvasHighContrast,
  NewRebrandDark,
  NewRebrandLight,
  NewComponentTypes,
  NewBaseTheme,
  TokenBoxshadowValueInst,
  TokenTypographyValueInst,
  SharedTokens
}
