import { alpha } from '@instructure/ui-themeable/lib/utils/color'

export default function generator ({ colors, typography, borders, spacing, forms }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,

    borderWidth: borders.widthSmall,
    borderStyle: borders.style,
    borderColor: colors.tiara,
    borderRadius: borders.radiusMedium,

    iconColor: colors.oxford,

    color: colors.oxford,
    background: colors.white,

    padding: spacing.small,

    focusBorderColor: colors.brand,
    focusOutlineColor: alpha(colors.brand, 50),

    errorBorderColor: colors.crimson,
    errorOutlineColor: alpha(colors.crimson, 50),

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
    focusBorderColor: variables['ic-brand-primary'],
    focusOutlineColor: alpha(variables['ic-brand-primary'], 50)
  }
}
