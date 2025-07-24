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
import { TagTheme } from '@instructure/shared-types'

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme: Theme): TagTheme => {
  const { borders, colors, forms, spacing, typography, key: themeName } = theme

  const themeSpecificStyle: ThemeSpecificStyle<TagTheme> = {
    'canvas-high-contrast': {
      defaultBackground: colors?.contrasts?.white1010,
      defaultBorderColor: colors?.contrasts?.grey125125
    },
    canvas: {
      focusOutlineColor: theme['ic-brand-primary'],
      defaultIconColor: theme['ic-brand-font-color-dark'],
      defaultIconHoverColor: theme['ic-brand-primary'],
      defaultColor: theme['ic-brand-font-color-dark']
    }
  }
  const componentVariables: TagTheme = {
    fontFamily: typography.fontFamily,
    heightSmall: '1.3125rem', // matches Pill component height
    heightMedium: forms.inputHeightSmall,
    heightLarge: forms.inputHeightMedium,
    fontSizeSmall: typography.fontSizeXSmall,
    fontSizeMedium: typography.fontSizeSmall,
    fontSizeLarge: typography.fontSizeMedium,
    padding: `0 ${spacing.xSmall}`,
    paddingSmall: `0 ${spacing.xSmall}`,
    focusOutlineColor: colors?.contrasts?.blue4570,
    focusOutlineWidth: borders.widthMedium,
    focusOutlineStyle: borders.style,
    iconMargin: spacing.xSmall,
    transitionTiming: '0.2s',

    defaultBackgroundHover: colors?.contrasts?.grey1214,
    defaultBackground: colors?.contrasts?.grey1111,
    defaultBorderColor: colors?.contrasts?.grey1424,
    defaultBorderRadius: '999rem',
    defaultBorderStyle: borders.style,
    defaultBorderWidth: borders.widthSmall,
    defaultColor: colors?.contrasts?.grey125125,
    defaultIconColor: colors?.contrasts?.grey125125,
    defaultIconHoverColor: colors?.contrasts?.blue4570,

    inlineBackgroundHover: colors?.contrasts?.grey1111,
    inlineBackground: colors?.contrasts?.white1010,
    inlineBorderColor: colors?.contrasts?.grey4570,
    inlineBorderRadius: borders.radiusMedium,
    inlineBorderStyle: borders.style,
    inlineBorderWidth: borders.widthSmall,
    inlineColor: colors?.contrasts?.grey125125,
    inlineIconColor: colors?.contrasts?.grey4570,
    inlineIconHoverColor: colors?.contrasts?.blue4570
  }

  return {
    ...componentVariables,
    ...themeSpecificStyle[themeName]
  }
}

export default generateComponentTheme
