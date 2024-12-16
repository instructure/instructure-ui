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

import { Colors } from './Colors'

type Border = {
  radiusSmall: string | 0
  radiusMedium: string | 0
  radiusLarge: string | 0
  widthSmall: string | 0
  widthMedium: string | 0
  widthLarge: string | 0
  style: string
}

type Breakpoints = {
  xxSmall: string
  xSmall: string
  small: string
  medium: string
  tablet: string
  large: string
  desktop: string
  xLarge: string
  maxWidth: string
}

type Forms = {
  inputHeightSmall: string
  inputHeightMedium: string
  inputHeightLarge: string
}

type Media = {
  mediumMin: string
  largeMin: string
  xLargeMin: string
}

type Shadows = {
  depth1: string
  depth2: string
  depth3: string
  resting: string
  above: string
  topmost: string
}

type Spacing = {
  xxxSmall: string | 0
  xxSmall: string | 0
  xSmall: string | 0
  small: string | 0
  mediumSmall: string | 0
  medium: string | 0
  large: string | 0
  xLarge: string | 0
  xxLarge: string | 0
}

type Stacking = {
  topmost: number
  above: number
  below: number
  deepest: number
}

type Transitions = {
  duration: string | 0
  timing: string
}

type Typography = {
  fontFamily: string
  fontFamilyMonospace: string
  fontFamilyHeading?: string // only in instructure theme
  fontSizeXSmall: string | 0
  fontSizeSmall: string | 0
  fontSizeMedium: string | 0
  fontSizeLarge: string | 0
  fontSizeXLarge: string | 0
  fontSizeXXLarge: string | 0
  fontWeightLight: number
  fontWeightNormal: number
  fontWeightBold: number
  lineHeight: number | string
  lineHeightFit: number | string
  lineHeightCondensed: number | string
  lineHeightDouble: number | string
  letterSpacingNormal: number | 0
  letterSpacingCondensed: string | 0
  letterSpacingExpanded: string | 0

  titlePageDesktop: string
  titlePageMobile: string
  titleSection: string
  titleModule: string
  titleCardLarge: string
  titleCardRegular: string
  titleCardMini: string
  descriptionPage: string
  descriptionSection: string
  label: string
  content: string
  contentSmall: string
  legend: string

  lineHeight100: number
  lineHeight125: number
  lineHeight150: number
  weightRegular: number
  weightImportant: number
}

type Size = {
  xSmall: number
  small: number
  medium: number
  large: number
}

type Radius = Size
type StrokeWidth = Size

type BaseThemeVariables = {
  borders: Border
  breakpoints: Breakpoints
  colors: Colors
  forms: Forms
  media: Media
  shadows: Shadows
  spacing: Spacing
  stacking: Stacking
  transitions: Transitions
  typography: Typography
}

type BaseThemeVariableKeys = [
  'borders',
  'breakpoints',
  'colors',
  'forms',
  'media',
  'shadows',
  'spacing',
  'stacking',
  'transitions',
  'typography'
]

type BaseTheme = {
  key: string
  description?: string
} & BaseThemeVariables

export type {
  BaseTheme,
  BaseThemeVariableKeys,
  BaseThemeVariables,
  Shadows,
  Border,
  Breakpoints,
  Media,
  Forms,
  Spacing,
  Stacking,
  Transitions,
  Typography,
  Size,
  Radius,
  StrokeWidth
}
