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
import { ColorPickerTheme } from '@instructure/shared-types'
import { colorIndicatorBorderColor } from '../ColorIndicator/theme'

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme: Theme): ColorPickerTheme => {
  const { colors, borders, spacing, typography } = theme

  const componentVariables = {
    hashMarkColor: colors?.ash,
    warningIconColor: colors?.fire,
    errorIconColor: colors?.crimson,
    successIconColor: colors?.shamrock,
    popoverSeparatorColor: colors?.tiara,
    popoverFooterColor: colors?.porcelain,
    smallBorder: borders?.widthSmall,
    smallSpacing: spacing?.small,
    xSmallSpacing: spacing?.xSmall,
    xxSmallSpacing: spacing?.xxSmall,
    xxxSmallSpacing: spacing?.xxxSmall,
    xLargeFontSize: typography?.fontSizeXLarge,
    checkerboardBackgroundColor: colors.white,
    checkerboardBackgroundImage: `linear-gradient(45deg, ${colors.tiara} 25%, transparent 25%),
    linear-gradient(-45deg, ${colors.tiara} 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, ${colors.tiara} 75%),
    linear-gradient(-45deg, transparent 75%, ${colors.tiara} 75%)`,
    checkerboardBackgroundSize: '.5rem .5rem',
    checkerboardBackgroundPosition:
      '0 0, 0 .25rem, .25rem -0.25rem, -0.25rem 0px',
    colorIndicatorBorderColor
  }

  return {
    ...componentVariables
  }
}

export default generateComponentTheme
