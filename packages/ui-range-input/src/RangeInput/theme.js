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

import { alpha, darken } from '@instructure/ui-color-utils'

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @param  {Object} themeOverride User provided overrides of the default theme mapping.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme, themeOverride = {}) => {
  const { colors, typography, spacing, forms, key: themeName } = theme

  const themeSpecificStyle = {
    canvas: {
      handleBackground: theme['ic-brand-primary'],
      handleShadowColor: darken(theme['ic-brand-primary'], 15),
      handleFocusOutlineColor: alpha(theme['ic-brand-primary'], 40),
      handleHoverBackground: theme['ic-brand-primary'],
      handleFocusBackground: theme['ic-brand-primary'],
      valueBackground: theme['ic-brand-font-color-dark']
    }
  }

  const componentVariables = {
    minWidth: '12.5rem',

    handleSize: '1.5rem',
    handleBackground: colors?.backgroundBrand,
    handleShadowColor: darken(colors?.borderBrand, 15),

    handleHoverBackground: colors?.backgroundBrand,

    handleFocusBackground: colors?.backgroundBrand,
    handleFocusOutlineColor: alpha(colors?.borderBrand, 40),
    handleFocusOutlineWidth: '0.75em',

    trackBackground: colors?.backgroundDark,

    valueColor: colors?.textLightest,
    valueFontFamily: typography?.fontFamily,
    valueFontWeight: typography?.fontWeightNormal,

    valueSmallFontSize: typography?.fontSizeSmall,
    valueSmallPadding: `0 ${spacing?.xSmall}`,
    valueSmallLineHeight: forms?.inputHeightSmall,

    valueMediumFontSize: typography?.fontSizeMedium,
    valueMediumPadding: `0 ${spacing?.small}`,
    valueMediumLineHeight: forms?.inputHeightMedium,

    valueLargeFontSize: typography?.fontSizeLarge,
    valueLargePadding: `0 ${spacing?.medium}`,
    valueLargeLineHeight: forms?.inputHeightLarge
  }

  return {
    ...componentVariables,
    ...themeSpecificStyle[themeName],
    ...themeOverride
  }
}

export default generateComponentTheme
