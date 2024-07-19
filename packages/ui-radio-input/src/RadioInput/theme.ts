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

import type { Theme, ThemeSpecificStyle } from '@instructure/ui-themes'
import { RadioInputTheme } from '@instructure/shared-types'

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme: Theme): RadioInputTheme => {
  const {
    spacing,
    borders,
    colors,
    forms,
    shadows,
    typography,
    key: themeName
  } = theme

  const themeSpecificStyle: ThemeSpecificStyle<RadioInputTheme> = {
    canvas: {
      focusBorderColor: theme['ic-brand-primary'],
      hoverBorderColor: theme['ic-brand-font-color-dark'],
      labelColor: theme['ic-brand-font-color-dark']
    },
    'canvas-high-contrast': {
      toggleBackgroundOff: colors?.contrasts?.grey125125
    }
  }

  const componentVariables: RadioInputTheme = {
    labelColor: colors?.contrasts?.grey125125,
    labelFontFamily: typography?.fontFamily,
    labelFontWeight: typography?.fontWeightNormal,
    labelLineHeight: typography?.lineHeightCondensed,

    background: colors?.contrasts?.white1010,
    borderWidth: borders?.widthSmall,
    borderColor: colors?.contrasts?.grey1214,
    hoverBorderColor: colors?.contrasts?.grey125125,
    controlSize: '0.1875rem',

    focusBorderColor: colors?.contrasts?.blue4570,
    focusBorderWidth: borders?.widthMedium,
    focusBorderStyle: borders?.style,

    simpleFacadeSmallSize: '1rem',
    simpleFacadeMediumSize: '1.25rem',
    simpleFacadeLargeSize: '1.75rem',
    simpleCheckedInsetSmall: '0.1875rem',
    simpleCheckedInsetMedium: '0.25rem',
    simpleCheckedInsetLarge: '0.375rem',
    simpleFontSizeSmall: typography?.fontSizeSmall,
    simpleFontSizeMedium: typography?.fontSizeMedium,
    simpleFontSizeLarge: typography?.fontSizeLarge,
    simpleFacadeMarginEnd: spacing?.xSmall,

    toggleBorderRadius: borders?.radiusSmall,
    toggleBorderWidth: borders?.widthLarge,
    toggleBackgroundSuccess: colors?.contrasts?.green4570,
    toggleBackgroundOff: colors?.contrasts?.green4570,
    toggleBackgroundDanger: colors?.contrasts?.orange4570,
    toggleBackgroundWarning: colors?.contrasts?.orange4570,
    toggleHandleText: colors?.contrasts?.white1010,

    toggleSmallHeight: forms?.inputHeightSmall,
    toggleMediumHeight: forms?.inputHeightMedium,
    toggleLargeHeight: forms?.inputHeightLarge,
    toggleShadow: shadows?.depth1,
    // toggle font is uppercase, so sizes are smaller below
    toggleSmallFontSize: typography?.fontSizeXSmall,
    toggleMediumFontSize: typography?.fontSizeSmall,
    toggleLargeFontSize: typography?.fontSizeMedium
  }

  return {
    ...componentVariables,
    ...themeSpecificStyle[themeName]
  }
}

export default generateComponentTheme
