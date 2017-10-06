import { alpha } from '@instructure/ui-themeable/lib/utils/color'

export default function generator ({ colors, borders, forms, spacing, typography }) {
  return {
    color: colors.white,
    background: colors.porcelain,
    borderColor: colors.tiara,
    borderWidth: borders.widthMedium,
    borderRadius: '4rem',
    marginEnd: spacing.small,
    checkedBackground: colors.shamrock,
    uncheckedIconColor: colors.slate,
    checkedIconColor: colors.shamrock,
    shadowColor: alpha(colors.licorice, 25),
    focusOutlineColor: colors.brand,
    focusBorderWidth: borders.widthSmall,
    focusBorderStyle: borders.style,
    toggleBackground: colors.white,
    baseSizeSmall: forms.inputHeightSmall,
    baseSizeMedium: forms.inputHeightMedium,
    baseSizeLarge: forms.inputHeightLarge,
    labelColor: colors.oxford,
    labelFontFamily: typography.fontFamily,
    labelFontWeight: typography.fontWeightNormal,
    labelLineHeight: typography.lineHeightCondensed,
    labelFontSizeSmall: typography.fontSizeSmall,
    labelFontSizeMedium: typography.fontSizeMedium,
    labelFontSizeLarge: typography.fontSizeLarge
  }
}

generator['canvas-a11y'] = function ({ colors }) {
  return {
    uncheckedIconColor: colors.oxford,
    background: colors.oxford,
    borderColor: colors.oxford
  }
}

generator.canvas = function (variables) {
  return {
    focusOutlineColor: variables['ic-brand-primary'],
    labelColor: variables['ic-brand-font-color-dark']
  }
}
