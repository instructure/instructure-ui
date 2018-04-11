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

import { darken } from '@instructure/ui-themeable/lib/utils/color'

export default function generator ({ borders, colors, forms, spacing, typography }) {
  const tagVariant = function (style, {
    borderColor,
    borderRadius,
    borderStyle,
    borderWidth,
    hoverColor,
    iconColor,
    iconHoverColor,
    mainColor,
    textColor
  }) {
    return {
      [`${style}BackgroundHover`]: hoverColor || darken(mainColor, 5),
      [`${style}Background`]: mainColor,
      [`${style}BorderColor`]: borderColor,
      // For 'pill'-style rounded corners
      // https://stackoverflow.com/questions/22578979/border-radius-50-vs-border-radius-999em
      [`${style}BorderRadius`]: borderRadius || '999rem',
      [`${style}BorderStyle`]: borderStyle || borders.style,
      [`${style}BorderWidth`]: borderWidth || borders.widthSmall,
      [`${style}Color`]: textColor,
      [`${style}IconColor`]: iconColor || textColor,
      [`${style}IconHoverColor`]: iconHoverColor || iconColor || textColor
    }
  }

  return {
    fontFamily: typography.fontFamily,
    heightSmall: '1.3125rem', // matches Pill component height
    heightMedium: forms.inputHeightSmall,
    heightLarge: forms.inputHeightMedium,
    fontSizeSmall: typography.fontSizeXSmall,
    fontSizeMedium: typography.fontSizeSmall,
    fontSizeLarge: typography.fontSizeMedium,
    padding: `0 ${spacing.small}`,
    paddingSmall: `0 ${spacing.xSmall}`,
    focusOutlineColor: colors.borderBrand,
    maxWidth: '10rem',
    iconMargin: spacing.xxSmall,
    transitionTiming: '0.2s',

    ...tagVariant('default', {
      borderColor: colors.borderMedium,
      iconColor: colors.textDarkest,
      iconHoverColor: colors.textBrand,
      mainColor: colors.textLight,
      textColor: colors.textDarkest
    }),

    ...tagVariant('inline', {
      borderColor: colors.ash,
      borderRadius: borders.radiusMedium,
      iconColor: colors.ash,
      iconHoverColor: colors.ash,
      mainColor: colors.textLightest,
      textColor: colors.textDarkest
    })
  }
}

generator['canvas-a11y'] = generator['canvas-high-contrast'] = function ({ colors }) {
  return {
    defaultBackground: colors.backgroundLightest,
    defaultBorderColor: colors.borderDarkest
  }
}

generator.canvas = function (variables) {
  return {
    focusOutlineColor: variables['ic-brand-primary'],
    textColor: variables['ic-brand-font-color-dark'],
    defaultIconColor: variables['ic-brand-font-color-dark'],
    defaultIconHoverColor: variables['ic-brand-primary'],
    defaultColor: variables['ic-brand-font-color-dark']
  }
}
