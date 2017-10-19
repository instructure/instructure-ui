import { alpha } from '@instructure/ui-themeable/lib/utils/color'

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

    smallFontSize: typography.fontSizeSmall,
    smallHeight: forms.inputHeightSmall,

    mediumFontSize: typography.fontSizeMedium,
    mediumHeight: forms.inputHeightMedium,

    largeFontSize: typography.fontSizeLarge,
    largeHeight: forms.inputHeightLarge
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark'],
    focusBorderTopColor: variables['ic-brand-primary'],
    focusBorderRightColor: variables['ic-brand-primary'],
    focusBorderBottomColor: variables['ic-brand-primary'],
    focusBorderLeftColor: variables['ic-brand-primary'],
    focusOutlineColor: alpha(variables['ic-brand-primary'], 50)
  }
}
