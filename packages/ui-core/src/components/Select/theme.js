import { alpha } from '@instructure/ui-themeable/lib/utils/color'

export default function generator ({ colors, borders, typography, forms, spacing }) {
  return {
    borderTopColor: colors.tiara,
    borderRightColor: colors.tiara,
    borderBottomColor: colors.tiara,
    borderLeftColor: colors.tiara,
    borderWidth: borders.widthSmall,
    borderStyle: borders.style,
    borderRadius: borders.radiusMedium,

    background: colors.white,
    color: colors.oxford,

    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,

    padding: spacing.small,

    arrowColor: colors.oxford,

    smallHeight: forms.inputHeightSmall,
    smallFontSize: typography.fontSizeSmall,
    smallArrowWidth: '0.75rem',

    mediumHeight: forms.inputHeightMedium,
    mediumFontSize: typography.fontSizeMedium,
    mediumArrowWidth: '0.875rem',

    largeHeight: forms.inputHeightLarge,
    largeFontSize: typography.fontSizeLarge,
    largeArrowWidth: '1rem',

    focusBorderColor: colors.brand,
    focusOutlineColor: alpha(colors.brand, 50),

    errorBorderColor: colors.crimson,
    errorOutlineColor: alpha(colors.crimson, 50)
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark'],
    arrowColor: variables['ic-brand-font-color-dark'],
    focusBorderColor: variables['ic-brand-primary'],
    focusOutlineColor: alpha(variables['ic-brand-primary'], 50)
  }
}
