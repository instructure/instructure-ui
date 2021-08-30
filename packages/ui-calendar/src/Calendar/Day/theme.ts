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
import { CalendarDayTheme } from '@instructure/shared-types'

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme: Theme): CalendarDayTheme => {
  const { borders, colors, typography, spacing, forms, key: themeName } = theme

  const themeSpecificStyle: ThemeSpecificStyle<CalendarDayTheme> = {
    canvas: {
      color: theme['ic-brand-font-color-dark'],
      todayBackground: theme['ic-brand-primary']
    }
  }

  const componentVariables: CalendarDayTheme = {
    color: colors?.textDarkest,
    background: colors?.backgroundLightest,
    fontSize: typography?.fontSizeMedium,
    padding: spacing?.xxSmall,
    height: forms?.inputHeightSmall,
    minWidth: forms?.inputHeightSmall,

    outsideMonthColor: colors?.textDark,

    selectedBackground: colors?.backgroundSuccess,
    selectedColor: colors?.textLightest,
    selectedBorderRadius: borders?.radiusMedium,

    todayBackground: colors?.backgroundBrand,
    todayColor: colors?.textLightest,
    todayBorderRadius: forms?.inputHeightSmall
  }

  return {
    ...componentVariables,
    ...themeSpecificStyle[themeName]
  }
}

export default generateComponentTheme
