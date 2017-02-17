import { alpha } from '../../util/color'

export default function generator ({ colors, typography, borders, spacing, forms }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,

    borderWidth: borders.widthSmall,
    borderStyle: borders.style,
    borderColor: colors.border,
    borderRadius: borders.radiusMedium,

    color: colors.dark,
    background: colors.lightest,

    padding: `0 ${spacing.small}`,

    focusBorderColor: colors.brand,
    focusOutlineColor: alpha(colors.brand, 50),

    errorBorderColor: colors.crimson,
    errorOutlineColor: alpha(colors.crimson, 50),

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
