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

import { darken } from '@instructure/ui-color-utils'

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'theme' implicitly has an 'any' type.
const generateComponentTheme = (theme) => {
  const { borders, colors, forms, spacing, typography, key: themeName } = theme

  const themeSpecificStyle = {
    'canvas-high-contrast': {
      defaultBackground: colors.backgroundLightest,
      defaultBorderColor: colors.borderDarkest
    },
    canvas: {
      focusOutlineColor: theme['ic-brand-primary'],
      textColor: theme['ic-brand-font-color-dark'],
      defaultIconColor: theme['ic-brand-font-color-dark'],
      defaultIconHoverColor: theme['ic-brand-primary'],
      defaultColor: theme['ic-brand-font-color-dark']
    }
  }

  const tagVariant = function (
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'style' implicitly has an 'any' type.
    style,
    {
      // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'borderColor' implicitly has an 'a... Remove this comment to see the full error message
      borderColor,
      // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'borderRadius' implicitly has an '... Remove this comment to see the full error message
      borderRadius,
      // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'borderStyle' implicitly has an 'a... Remove this comment to see the full error message
      borderStyle,
      // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'borderWidth' implicitly has an 'a... Remove this comment to see the full error message
      borderWidth,
      // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'hoverColor' implicitly has an 'an... Remove this comment to see the full error message
      hoverColor,
      // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'iconColor' implicitly has an 'any... Remove this comment to see the full error message
      iconColor,
      // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'iconHoverColor' implicitly has an... Remove this comment to see the full error message
      iconHoverColor,
      // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'mainColor' implicitly has an 'any... Remove this comment to see the full error message
      mainColor,
      // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'textColor' implicitly has an 'any... Remove this comment to see the full error message
      textColor
    }
  ) {
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

  const componentVariables = {
    fontFamily: typography.fontFamily,
    heightSmall: '1.3125rem', // matches Pill component height
    heightMedium: forms.inputHeightSmall,
    heightLarge: forms.inputHeightMedium,
    fontSizeSmall: typography.fontSizeXSmall,
    fontSizeMedium: typography.fontSizeSmall,
    fontSizeLarge: typography.fontSizeMedium,
    padding: `0 ${spacing.xSmall}`,
    paddingSmall: `0 ${spacing.xSmall}`,
    focusOutlineColor: colors.borderBrand,
    focusOutlineWidth: borders.widthMedium,
    focusOutlineStyle: borders.style,
    maxWidth: '10rem',
    iconMargin: spacing.small,
    transitionTiming: '0.2s',

    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ borderColor: any; iconColor: a... Remove this comment to see the full error message
    ...tagVariant('default', {
      borderColor: colors.borderMedium,
      iconColor: colors.textDarkest,
      iconHoverColor: colors.textBrand,
      mainColor: colors.textLight,
      textColor: colors.textDarkest
    }),

    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ borderColor: any; borderRadius... Remove this comment to see the full error message
    ...tagVariant('inline', {
      borderColor: colors.borderDark,
      borderRadius: borders.radiusMedium,
      iconColor: colors.textDark,
      iconHoverColor: colors.textDark,
      mainColor: colors.textLightest,
      textColor: colors.textDarkest
    })
  }

  return {
    ...componentVariables,
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    ...themeSpecificStyle[themeName]
  }
}

export default generateComponentTheme
