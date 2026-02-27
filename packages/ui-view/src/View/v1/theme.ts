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

/* Global variables (colors, typography, spacing, etc.) are defined in lib/themes */

import { makeThemeVars } from '@instructure/emotion'
import type { Theme, ThemeSpecificStyle } from '@instructure/ui-themes'
import { ViewTheme } from '@instructure/shared-types'

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme: Theme): ViewTheme => {
  const {
    colors,
    typography,
    borders,
    breakpoints,
    spacing,
    shadows,
    stacking,
    key: themeName
  } = theme

  const themeSpecificStyle: ThemeSpecificStyle<ViewTheme> = {
    canvas: {
      color: theme['ic-brand-font-color-dark'],
      focusColorInfo: theme['ic-brand-primary'],
      backgroundBrand: theme['ic-brand-primary'],
      backgroundInfo: theme['ic-brand-primary'],
      borderColorBrand: theme['ic-brand-primary'],
      borderColorInfo: theme['ic-brand-primary']
    }
  }

  const componentVariables: ViewTheme = {
    fontFamily: typography?.fontFamily,

    color: colors?.contrasts?.grey125125,
    colorPrimaryInverse: colors?.contrasts?.white1010,

    borderColorPrimary: colors?.contrasts?.grey1424,
    borderColorSecondary: colors?.contrasts?.grey3045,
    borderColorSuccess: colors?.contrasts?.green4570,
    borderColorBrand: colors?.contrasts?.blue4570,
    borderColorInfo: colors?.contrasts?.blue4570,
    borderColorAlert: colors?.contrasts?.blue4570,
    borderColorWarning: colors?.contrasts?.orange4570,
    borderColorDanger: colors?.contrasts?.red4570,
    borderColorTransparent: 'transparent',

    debugOutlineColor: colors?.contrasts?.red4570,

    backgroundPrimary: colors?.contrasts?.white1010,
    backgroundSecondary: colors?.contrasts?.grey1111,
    backgroundPrimaryInverse: colors?.contrasts?.grey125125,
    backgroundBrand: colors?.contrasts?.blue4570,
    backgroundInfo: colors?.contrasts?.blue4570,
    backgroundAlert: colors?.contrasts?.blue4570,
    backgroundSuccess: colors?.contrasts?.green4570,
    backgroundDanger: colors?.contrasts?.red4570,
    backgroundWarning: colors?.contrasts?.orange4570,

    arrowSize: '0.5rem',

    focusOutlineStyle: borders?.style,
    focusOutlineWidth: borders?.widthMedium,
    focusOutlineOffset: '0.3125rem',
    focusOutlineInset: '0rem', // do not use unitless zero (for CSS calc())

    focusColorInfo: colors?.contrasts?.blue4570,
    focusColorDanger: colors?.contrasts?.red4570,
    focusColorSuccess: colors?.contrasts?.green4570,
    focusColorInverse: colors?.contrasts?.white1010,

    xSmallMaxWidth: breakpoints?.xSmall,
    smallMaxWidth: breakpoints?.small,
    mediumMaxWidth: breakpoints?.medium,
    largeMaxWidth: breakpoints?.large,

    ...makeThemeVars('margin', spacing),
    ...makeThemeVars('padding', spacing),
    ...makeThemeVars('shadow', shadows),
    ...makeThemeVars('stacking', stacking),
    ...makeThemeVars('border', borders)
  }

  return {
    ...componentVariables,
    ...themeSpecificStyle[themeName]
  }
}

export default generateComponentTheme
