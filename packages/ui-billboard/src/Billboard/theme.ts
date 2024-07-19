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

import type { Theme, ThemeSpecificStyle } from '@instructure/ui-themes'
import { BillboardTheme } from '@instructure/shared-types'

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme: Theme): BillboardTheme => {
  const { borders, colors, spacing, typography, key: themeName } = theme

  const themeSpecificStyle: ThemeSpecificStyle<BillboardTheme> = {
    canvas: {
      iconHoverColor: theme['ic-link-color'],
      messageColorClickable: theme['ic-link-color'],
      clickableActiveBg: theme['ic-brand-primary']
    }
  }

  const componentVariables: BillboardTheme = {
    fontFamily: typography?.fontFamily,
    paddingSmall: spacing?.small,
    paddingMedium: spacing?.medium,
    paddingLarge: spacing?.medium,
    iconColor: colors?.contrasts?.grey4570,
    mediumMargin: spacing?.small,
    largeMargin: spacing?.medium,
    iconHoverColor: colors?.contrasts?.blue4570,
    backgroundColor: colors?.contrasts?.white1010,
    iconHoverColorInverse: colors?.contrasts?.white1010,
    buttonBorderWidth: borders?.widthMedium,
    buttonBorderRadius: borders?.radiusLarge,
    messageColor: colors?.contrasts?.blue4570,
    messageColorClickable: colors?.contrasts?.blue4570,
    messageColorInverse: colors?.contrasts?.grey1111,
    messageFontSizeSmall: typography?.fontSizeSmall,
    messageFontSizeMedium: typography?.fontSizeMedium,
    messageFontSizeLarge: typography?.fontSizeLarge,
    clickableActiveBg: colors?.contrasts?.blue4570,
    clickableActiveText: colors?.contrasts?.white1010,
    buttonBorderStyle: borders?.style,
    buttonHoverBorderStyle: 'dashed'
  }

  return {
    ...componentVariables,
    ...themeSpecificStyle[themeName]
  }
}

export default generateComponentTheme
