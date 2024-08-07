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
import { TreeBrowserButtonTheme } from '@instructure/shared-types'

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme: Theme): TreeBrowserButtonTheme => {
  const { colors, borders, typography, key: themeName, spacing } = theme

  const themeSpecificStyles: ThemeSpecificStyle<TreeBrowserButtonTheme> = {
    canvas: {
      iconColor: theme['ic-brand-font-color-dark'],
      hoverBackgroundColor: theme['ic-brand-primary'],
      focusOutlineColor: theme['ic-brand-primary'],
      nameTextColor: theme['ic-brand-primary'],
      descriptorTextColor: theme['ic-brand-font-color-dark']
    }
  }

  const componentVariables: TreeBrowserButtonTheme = {
    hoverBackgroundColor: colors?.contrasts?.blue4570,
    hoverTextColor: colors?.contrasts?.white1010,

    focusOutlineWidth: borders?.widthMedium,
    focusOutlineColor: colors?.contrasts?.blue4570,
    focusOutlineStyle: borders?.style,

    iconColor: colors?.contrasts?.grey125125,
    iconsMarginRight: spacing?.xSmall,

    descriptorMarginTop: spacing?.xxxSmall,
    descriptorTextColor: colors?.contrasts?.grey125125,
    descriptorFontSizeSmall: typography?.fontSizeXSmall,
    descriptorFontSizeMedium: typography?.fontSizeXSmall,
    descriptorFontSizeLarge: typography?.fontSizeSmall,

    nameTextColor: colors?.contrasts?.blue4570,
    nameFontSizeSmall: typography?.fontSizeXSmall,
    nameFontSizeMedium: typography?.fontSizeSmall,
    nameFontSizeLarge: typography?.fontSizeMedium,

    baseSpacingSmall: spacing?.xSmall,
    baseSpacingMedium: spacing?.small,
    baseSpacingLarge: '1rem',

    borderWidth: borders?.widthSmall,
    borderRadius: borders?.radiusMedium,
    borderColor: colors?.contrasts?.grey4570,

    textLineHeight: typography?.lineHeightCondensed,

    selectedTextColor: colors?.contrasts?.white1010,
    selectedBackgroundColor: colors?.contrasts?.grey4570,
    selectedOutlineWidth: borders?.widthLarge
  }

  return {
    ...componentVariables,
    ...themeSpecificStyles[themeName]
  }
}

export default generateComponentTheme
