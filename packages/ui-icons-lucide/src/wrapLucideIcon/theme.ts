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

import type { Theme } from '@instructure/ui-themes'

export interface LucideIconTheme {
  // Size variables (matching SVGIcon theme)
  sizeXSmall: string
  sizeSmall: string
  sizeMedium: string
  sizeLarge: string
  sizeXLarge: string

  // Color variables (matching InlineSVG theme)
  primaryColor: string
  secondaryColor: string
  primaryInverseColor: string
  secondaryInverseColor: string
  successColor: string
  errorColor: string
  warningColor: string
  alertColor: string
  brandColor: string

  // Index signature for ComponentTheme compatibility
  [key: string]: string | undefined
}

/**
 * Generates the theme object for Lucide icons from the global theme.
 *
 * This matches the theme variables from SVGIcon (sizes) and InlineSVG (colors)
 * to ensure consistency across the InstUI icon system.
 */
const generateComponentTheme = (theme: Theme): LucideIconTheme => {
  const { colors } = theme

  return {
    // Sizes from SVGIcon (1.125rem, 2rem, 3rem, 5rem, 10rem)
    sizeXSmall: '1.125rem', // ~18px
    sizeSmall: '2rem', // 32px
    sizeMedium: '3rem', // 48px
    sizeLarge: '5rem', // 80px
    sizeXLarge: '10rem', // 160px

    // Colors from InlineSVG theme
    primaryColor: colors?.contrasts?.grey125125,
    secondaryColor: colors?.contrasts?.grey4570,
    primaryInverseColor: colors?.contrasts?.white1010,
    secondaryInverseColor: colors?.contrasts?.grey1111,
    successColor: colors?.contrasts?.green4570,
    errorColor: colors?.contrasts?.red4570,
    warningColor: colors?.contrasts?.orange4570,
    alertColor: colors?.contrasts?.blue4570,
    brandColor: colors?.contrasts?.blue4570
  }
}

export default generateComponentTheme
