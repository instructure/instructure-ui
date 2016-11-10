import { alpha, darken } from '../../../util/color'

export default function generator ({ borders, colors, typography }) {
  return {
    borderColor: colors.border,
    background: colors.lightest,

    hoverBorderColor: colors.brand,

    focusOutlineColor: colors.brand,
    focusShadowColor: alpha(colors.brand, 50),

    checkedOutlineColor: colors.dark,

    toggleBorderRadius: borders.radiusLarge,
    toggleBorderWidth: borders.widthLarge,
    toggleBackground: colors.dark,
    toggleColor: colors.lightest,

    toggleHandleBackground: colors.lightest,
    toggleHandleColor: colors.dark,

    toggleFocusColor: alpha(colors.brand, 50),

    toggleSuccessColor: darken(colors.success, 15),

    toggleDangerColor: darken(colors.danger, 15),

    toggleSmallHeight: '1.25rem',
    toggleMediumHeight: '1.875rem',
    toggleLargeHeight: '2.5rem',

    labelColor: colors.dark,
    labelFontFamily: typography.fontFamily,
    labelFontSize: typography.fontSizeMedium,
    labelFontWeight: typography.fontWeightNormal,
    labelLineHeight: typography.lineHeightCondensed
  }
}

generator.canvas = function (variables) {
  return {
    hoverBorderColor: variables['ic-brand-primary'],

    focusOutlineColor: variables['ic-brand-primary'],
    focusShadowColor: alpha(variables['ic-brand-primary'], 50),

    toggleFocusColor: alpha(variables['ic-brand-primary'], 50),

    labelColor: variables['ic-brand-font-color-dark']
  }
}
