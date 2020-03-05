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

export default function generator ({ borders, colors, spacing, typography }) {
  return {
    fontFamily: typography.fontFamily,
    paddingSmall: spacing.small,
    paddingMedium: spacing.medium,
    paddingLarge: spacing.medium,
    iconColor: colors.textDark,
    mediumMargin: spacing.small,
    largeMargin: spacing.medium,
    iconHoverColor: colors.textLink,
    backgroundColor: colors.backgroundLightest,
    iconHoverColorInverse: colors.textLightest,
    buttonBorderWidth: borders.widthMedium,
    buttonBorderRadius: borders.radiusLarge,
    messageColor: colors.textDark,
    messageColorClickable: colors.textLink,
    messageColorInverse: colors.textLight,
    messageFontSizeSmall: typography.fontSizeSmall,
    messageFontSizeMedium: typography.fontSizeMedium,
    messageFontSizeLarge: typography.fontSizeLarge,
    clickableActiveBg: colors.backgroundBrand,
    clickableActiveText: colors.textLightest,
    buttonBorderStyle: borders.style,
    buttonHoverBorderStyle: 'dashed'
  }
}

generator.canvas = function (variables) {
  return {
    iconHoverColor: variables['ic-link-color'],
    messageColorClickable: variables['ic-link-color'],
    clickableActiveBg: variables['ic-brand-primary']
  }
}
