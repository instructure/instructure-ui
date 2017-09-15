import { alpha } from '../../util/color'

export default function generator ({ colors, borders, spacing, typography, forms }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    color: colors.oxford,

    background: colors.white,

    borderWidth: borders.widthSmall,
    borderStyle: borders.style,
    borderTopColor: colors.tiara,
    borderRightColor: colors.tiara,
    borderBottomColor: colors.tiara,
    borderLeftColor: colors.tiara,
    borderRadius: borders.radiusMedium,

    padding: spacing.small,

    focusBorderTopColor: colors.brand,
    focusBorderRightColor: colors.brand,
    focusBorderBottomColor: colors.brand,
    focusBorderLeftColor: colors.brand,
    focusOutlineColor: alpha(colors.brand, 50),
    boxShadowColor: 'transparent',

    errorBorderColor: colors.crimson,
    errorOutlineColor: alpha(colors.crimson, 50),
    boxShadowErrorColor: 'transparent',

    placeholderColor: colors.slate,

    smallFontSize: typography.fontSizeXSmall,
    smallHeight: forms.inputHeightSmall,

    mediumFontSize: typography.fontSizeSmall,
    mediumHeight: forms.inputHeightMedium,

    largeFontSize: typography.fontSizeMedium,
    largeHeight: forms.inputHeightLarge
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark'],
    focusBorderColor: variables['ic-brand-primary'],
    focusOutlineColor: alpha(variables['ic-brand-primary'], 50)
  }
}

generator.modern = function ({ colors, borders, typography }) {
  return {
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.slate,
    borderLeftColor: 'transparent',
    borderRadius: 'none',
    placeholderColor: colors.ash,
    focusBorderTopColor: 'transparent',
    focusBorderRightColor: 'transparent',
    focusBorderLeftColor: 'transparent',
    focusOutlineColor: 'transparent',
    errorBorderColor: 'transparent',
    errorOutlineColor: 'transparent',
    boxShadowColor: colors.brand,
    boxShadowErrorColor: colors.crimson
  }
}
