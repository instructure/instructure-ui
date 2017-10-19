import { alpha, darken } from '@instructure/ui-themeable/lib/utils/color'

export default function generator ({ colors, typography, borders, spacing, forms }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,

    borderWidth: borders.widthSmall,
    borderStyle: borders.style,
    borderColor: colors.tiara,
    borderRadius: borders.radiusMedium,

    color: colors.oxford,
    background: colors.white,

    padding: `0 ${spacing.small}`,

    arrowsContainerWidth: '2rem',
    arrowsColor: colors.licorice,
    arrowsBackgroundColor: colors.porcelain,
    arrowsHoverBackgroundColor: darken(colors.porcelain, 10),
    arrowsBorderColor: darken(colors.porcelain, 10),
    arrowsActiveBoxShadow: `inset 0 0 3px 1px ${darken(colors.porcelain, 20, 0.45)}`,

    focusBorderColor: colors.brand,
    focusOutlineColor: alpha(colors.brand, 50),

    errorBorderColor: colors.crimson,
    errorOutlineColor: alpha(colors.crimson, 50),

    placeholderColor: colors.slate,

    mediumFontSize: typography.fontSizeMedium,
    mediumHeight: forms.inputHeightMedium,

    largeFontSize: typography.fontSizeMedium,
    largeHeight: forms.inputHeightLarge
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark'],
    arrowsColor: variables['ic-brand-font-color-dark'],
    focusBorderColor: variables['ic-brand-primary'],
    focusOutlineColor: alpha(variables['ic-brand-primary'], 50)
  }
}
