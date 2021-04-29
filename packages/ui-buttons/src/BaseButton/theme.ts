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

import { alpha, darken } from '@instructure/ui-color-utils'

const activeShadow = 'inset 0 0 0.1875rem 0.0625rem'

const generateButtonThemeVars = ({
  // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'style' implicitly has an 'any' ty... Remove this comment to see the full error message
  style,
  // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'textColor' implicitly has an 'any... Remove this comment to see the full error message
  textColor,
  // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'ghostTextColor' implicitly has an... Remove this comment to see the full error message
  ghostTextColor,
  // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'backgroundColor' implicitly has a... Remove this comment to see the full error message
  backgroundColor,
  // @ts-expect-error ts-migrate(7022) FIXME: 'borderColor' implicitly has type 'any' because it... Remove this comment to see the full error message
  borderColor,
  ghostBorderColor = borderColor
}) => ({
  [`${style}Color`]: textColor,
  [`${style}BorderColor`]: darken(borderColor, 10),
  [`${style}Background`]: backgroundColor,
  [`${style}HoverBackground`]: darken(backgroundColor, 10),
  [`${style}ActiveBackground`]: darken(backgroundColor, 10),
  [`${style}ActiveBoxShadow`]: `${activeShadow} ${darken(
    borderColor,
    20,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 3.
    0.45
  )}`,

  [`${style}GhostColor`]: ghostTextColor,
  [`${style}GhostBorderColor`]: ghostBorderColor,
  [`${style}GhostBackground`]: 'transparent',
  [`${style}GhostHoverBackground`]: alpha(ghostTextColor, 10),
  [`${style}GhostActiveBackground`]: 'transparent',
  [`${style}GhostActiveBoxShadow`]: `${activeShadow} ${alpha(
    ghostBorderColor,
    28
  )}`
})

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'theme' implicitly has an 'any' type.
const generateComponentTheme = (theme) => {
  const { borders, colors, forms, spacing, typography, key: themeName } = theme

  const themeSpecificStyle = {
    canvas: {
      ...generateButtonThemeVars({
        style: 'primary',
        backgroundColor: theme['ic-brand-button--primary-bgd'],
        borderColor: theme['ic-brand-button--primary-bgd'],
        textColor: theme['ic-brand-button--primary-text'],
        ghostTextColor: theme['ic-brand-button--primary-bgd']
      }),
      primaryGhostHoverBackground: alpha(
        theme['ic-brand-button--primary-bgd'],
        10
      )
    },
    'canvas-high-contrast': {
      secondaryBorderColor: colors?.borderMedium,
      primaryInverseBorderColor: colors?.borderMedium
    },
    instructure: {
      borderRadius: '999em',
      smallPaddingTop: '0.5rem',
      smallPaddingBottom: '0.4375rem',
      mediumPaddingTop: '0.75rem',
      mediumPaddingBottom: '0.75rem',
      largePaddingTop: '1rem',
      largePaddingBottom: '1rem',
      largeFontSize: '1.125rem'
    }
  }

  const componentVariables = {
    transform: 'none',
    hoverTransform: 'none',
    fontFamily: typography?.fontFamily,
    fontWeight: typography?.fontWeightNormal,
    textTransform: 'none',
    letterSpacing: 'normal',
    borderRadius: borders?.radiusMedium,
    borderStyle: borders?.style,
    borderWidth: borders?.widthSmall,

    smallHeight: forms?.inputHeightSmall,
    smallFontSize: typography?.fontSizeSmall,
    smallPaddingHorizontal: spacing?.xSmall,
    smallPaddingTop: '0.375rem',
    smallPaddingBottom: '0.3125rem',

    mediumHeight: forms?.inputHeightMedium,
    mediumFontSize: typography?.fontSizeMedium,
    mediumPaddingHorizontal: spacing?.small,
    mediumPaddingTop: '0.5625rem',
    mediumPaddingBottom: '0.5625rem',

    largeHeight: forms?.inputHeightLarge,
    largeFontSize: typography?.fontSizeLarge,
    largePaddingHorizontal: spacing?.medium,
    largePaddingTop: '0.6875rem',
    largePaddingBottom: '0.6875rem',

    lineHeight: typography?.lineHeightFit,

    iconSizeSmall: '1rem',
    iconSizeMedium: '1.25rem',
    iconSizeLarge: '1.625rem',

    ...generateButtonThemeVars({
      style: 'primary',
      backgroundColor: colors?.backgroundBrand,
      borderColor: colors?.borderBrand,
      textColor: colors?.textLightest,
      ghostTextColor: colors?.textBrand
    }),

    ...generateButtonThemeVars({
      style: 'secondary',
      backgroundColor: colors?.backgroundLight,
      borderColor: colors?.borderLight,
      ghostBorderColor: colors?.borderDarkest,
      textColor: colors?.textDarkest,
      ghostTextColor: colors?.textDarkest
    }),

    ...generateButtonThemeVars({
      style: 'success',
      backgroundColor: colors?.backgroundSuccess,
      borderColor: colors?.borderSuccess,
      textColor: colors?.textLightest,
      ghostTextColor: colors?.textSuccess
    }),

    ...generateButtonThemeVars({
      style: 'danger',
      backgroundColor: colors?.backgroundDanger,
      borderColor: colors?.borderDanger,
      textColor: colors?.textLightest,
      ghostTextColor: colors?.textDanger
    }),

    ...generateButtonThemeVars({
      style: 'primaryInverse',
      backgroundColor: colors?.backgroundLightest,
      borderColor: colors?.borderLightest,
      textColor: colors?.textDarkest,
      ghostTextColor: colors?.textLightest
    }),

    // Overrides for primary-inverse to match what was previously the `light` button variant
    primaryInverseBorderColor: darken(colors?.borderLight, 10),
    primaryInverseHoverBackground: darken(colors?.backgroundLightest, 5),
    primaryInverseActiveBackground: colors?.backgroundLightest,
    primaryInverseActiveBoxShadow: `${activeShadow} ${darken(
      colors?.borderLightest,
      25
    )}`,

    // Overrides for ghost hover states to ensure correct color contrast for a11y
    successGhostHoverBackground: alpha(colors?.textSuccess, 1)
  }

  return {
    ...componentVariables,
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    ...themeSpecificStyle[themeName]
  }
}

export default generateComponentTheme
