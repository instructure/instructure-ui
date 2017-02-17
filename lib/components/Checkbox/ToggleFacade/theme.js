import { alpha } from '../../../util/color'

export default function generator ({ colors, borders, forms, spacing, typography }) {
  return {
    color: colors.white,
    background: colors.porcelain,
    borderColor: colors.tiara,
    borderWidth: borders.widthMedium,
    borderRadius: '4rem',
    marginRight: spacing.medium,
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
    labelFontSize: typography.fontSizeMedium,
    labelFontWeight: typography.fontWeightNormal,
    labelLineHeight: typography.lineHeightCondensed
  }
}

generator['canvas-a11y'] = generator['modern-a11y'] = generator.a11y = function ({ colors }) {
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
