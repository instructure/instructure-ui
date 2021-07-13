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

import { functionalColors } from './utils/functionalColors'

type Border = {
  radiusSmall: string
  radiusMedium: string
  radiusLarge: string

  widthSmall: string
  widthMedium: string
  widthLarge: string

  style: string
}
type Breakpoints = {
  xxSmall: string
  xSmall: string
  small: string
  medium: string
  large: string
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
  xxxSmall: string
  xxSmall: string
  xSmall: string
  small: string
  medium: string
  large: string
  xLarge: string
  xxLarge: string
}

type Stacking = {
  topmost: number
  above: number
  below: number
  deepest: number
}

type Transitions = {
  duration: string
  timing: string
}

type Typography = {
  fontFamily: string
  fontFamilyMonospace: string
  fontFamilyHeading?: string

  fontSizeXSmall: string
  fontSizeSmall: string
  fontSizeMedium: string

  fontSizeLarge: string
  fontSizeXLarge: string
  fontSizeXXLarge: string

  fontWeightLight: number
  fontWeightNormal: number
  fontWeightBold: number

  lineHeight: number
  lineHeightFit: number
  lineHeightCondensed: number
  lineHeightDouble: number

  letterSpacingNormal: number
  letterSpacingCondensed: string
  letterSpacingExpanded: string
}

type BaseTheme = {
  key: string
  description?: string
  borders: Border
  breakpoints: Breakpoints
  colors: ReturnType<typeof functionalColors>
  forms: Forms
  media: Media
  shadows: Shadows
  spacing: Spacing
  stacking: Stacking
  transitions: Transitions
  typography: Typography
}

export type {
  BaseTheme,
  Shadows,
  Border,
  Breakpoints,
  Media,
  Forms,
  Spacing,
  Stacking,
  Transitions,
  Typography
}
