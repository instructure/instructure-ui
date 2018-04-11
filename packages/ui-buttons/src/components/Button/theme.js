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

import { alpha, darken } from '@instructure/ui-themeable/lib/utils/color'

const activeShadow = 'inset 0 0 3px 1px'
const focusShadow = 'inset 0 0 0 1px'
const focusOutline = '1px solid'

const buttonVariant = function (style, mainColor, textColor) {
  return {
    [`${style}Background`]: mainColor,
    [`${style}BorderColor`]: darken(mainColor, 10),
    [`${style}Color`]: textColor,
    [`${style}HoverBackground`]: darken(mainColor, 10),
    [`${style}ActiveBackground`]: darken(mainColor, 10),
    [`${style}ActiveBoxShadow`]: `${activeShadow} ${darken(mainColor, 20, 0.45)}`
  }
}

export default function generator ({ colors, borders, forms, spacing, typography }) {
  return {
    borderWidth: borders.widthSmall,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    textTransform: 'none',
    letterSpacing: 'normal',
    borderRadius: borders.radiusMedium,
    borderStyle: borders.style,

    transform: 'none',
    hoverTransform: 'none',

    smallHeight: forms.inputHeightSmall,
    smallPadding: spacing.xSmall,
    smallFontSize: typography.fontSizeSmall,

    mediumHeight: forms.inputHeightMedium,
    mediumPadding: spacing.small,
    mediumFontSize: typography.fontSizeMedium,

    largeHeight: forms.inputHeightLarge,
    largePadding: spacing.medium,
    largeFontSize: typography.fontSizeLarge,

    focusBorderRadius: borders.radiusMedium,
    focusBorder: `${focusOutline} ${colors.borderBrand}`,
    focusShadow: 'none',

    lightBackground: colors.backgroundLightest,
    lightBorderColor: darken(colors.borderLight, 10),
    lightColor: colors.textDarkest,
    lightHoverBackground: darken(colors.backgroundLightest, 5),
    lightActiveBoxShadow: `${activeShadow} ${darken(colors.borderLightest, 25)}`,

    ghostBackground: 'transparent',
    ghostBorderColor: colors.borderBrand,
    ghostBorderStyle: borders.style,
    ghostColor: colors.textBrand,
    ghostHoverBackground: alpha(colors.backgroundBrand, 10),
    ghostActiveBoxShadow: `inset 0 0 1px 1px ${alpha(colors.borderBrand, 20)}`,

    ghostInverseBackground: 'transparent',
    ghostInverseBorderColor: colors.borderLightest,
    ghostInverseColor: colors.textLightest,
    ghostInverseHoverBackground: alpha(colors.backgroundLightest, 10),
    ghostInverseActiveBoxShadow: `inset 0 0 1px 1px ${alpha(colors.borderLightest, 20)}`,
    ghostInverseFocusBorder: `${focusOutline} ${colors.borderLightest}`,

    linkColor: colors.textBrand,
    linkBorderColor: 'transparent',
    linkFocusBorderColor: 'transparent',
    linkHoverColor: darken(colors.textBrand, 10),
    linkTextDecoration: 'none',

    linkInverseColor: colors.textLight,
    linkInverseFocusBorderColor: 'transparent',

    iconBorderColor: 'transparent',
    iconPadding: `0 ${spacing.xxSmall}`,
    iconColor: colors.textDarkest,
    iconHoverColor: colors.textBrand,
    iconFocusBoxShadow: `${focusShadow} ${colors.borderBrand}`,
    iconPlusTextFontSize: '1.25rem',
    iconPlusTextMargin: spacing.xxSmall,

    iconInverseColor: colors.textLightest,
    iconInverseHoverColor: colors.textLightest,
    iconInverseFocusBoxShadow: `${focusShadow} ${colors.borderLightest}`,

    fluidWidthLineHeight: typography.lineHeightFit,

    ...buttonVariant(
      'default',
      colors.backgroundLight,
      colors.textDarkest
    ),

    ...buttonVariant(
      'primary',
      colors.backgroundBrand,
      colors.textLightest
    ),

    ...buttonVariant(
      'success',
      colors.backgroundSuccess,
      colors.textLightest
    ),

    ...buttonVariant(
      'danger',
      colors.crimson,
      colors.textLightest
    ),

    ...buttonVariant(
      'circlePrimary',
      colors.backgroundBrand,
      colors.textLightest
    ),

    ...buttonVariant(
      'circleDanger',
      colors.crimson,
      colors.textLightest
    )
  }
}

generator['canvas'] = function (variables) {
  return {
    focusBorder: `${focusOutline} ${variables['ic-brand-primary']}`,

    ghostBorderColor: variables['ic-brand-button--primary-bgd'],
    ghostColor: variables['ic-brand-button--primary-bgd'],
    ghostHoverBackground: alpha(variables['ic-brand-button--primary-bgd'], 10),
    ghostActiveBoxShadow: `inset 0 0 1px 1px ${alpha(variables['ic-brand-button--primary-bgd'], 20)}`,

    linkColor: variables['ic-link-color'],
    linkHoverColor: darken(variables['ic-link-color'], 10),

    iconHoverColor: variables['ic-brand-primary'],
    iconFocusBoxShadow: `${focusShadow} ${variables['ic-brand-primary']}`,

    ...buttonVariant(
      'primary',
      variables['ic-brand-button--primary-bgd'],
      variables['ic-brand-button--primary-text']
    ),

    ...buttonVariant(
      'circlePrimary',
      variables['ic-brand-button--primary-bgd'],
      variables['ic-brand-button--primary-text']
    )
  }
}

generator['canvas-a11y'] = generator['canvas-high-contrast'] = function ({ colors }) {
  return {
    linkTextDecoration: 'underline',
    linkInverseFocusBorderColor: colors.borderLightest,
    linkFocusBorderColor: colors.borderBrand,
  }
}
