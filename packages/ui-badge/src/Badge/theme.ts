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

import { Theme, ThemeSpecificStyle } from '@instructure/ui-themes'
import { BadgeTheme } from '@instructure/shared-types'

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme: Theme): BadgeTheme => {
  const {
    borders,
    colors,
    spacing,
    typography,
    stacking,
    key: themeName
  } = theme

  const themeSpecificStyle: ThemeSpecificStyle<BadgeTheme> = {
    canvas: {
      colorPrimary: theme['ic-brand-primary']
    }
  }

  const componentVariables: BadgeTheme = {
    fontFamily: typography?.fontFamily,
    fontWeight: typography?.fontWeightNormal,
    color: colors?.textLightest,
    fontSize: typography?.fontSizeXSmall,
    colorDanger: colors?.textDanger,
    colorSuccess: colors?.textSuccess,
    colorPrimary: colors?.textBrand,
    size: '1.25rem',
    countOffset: '0.5rem',
    notificationOffset: '0.125rem',
    notificationZIndex: stacking?.above,
    sizeNotification: spacing?.small,
    borderRadius: '999rem',
    padding: spacing?.xxSmall,
    pulseBorderThickness: borders?.widthMedium
  }

  return {
    ...componentVariables,
    ...themeSpecificStyle[themeName]
  }
}

export default generateComponentTheme
