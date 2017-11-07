export default function generator ({ colors, borders, forms, shadows, spacing, typography }) {
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
    focusOutlineColor: colors.brand,
    focusBorderWidth: borders.widthSmall,
    focusBorderStyle: borders.style,
    toggleBackground: colors.white,
    toggleShadow: shadows.depth1,
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

generator['canvas-a11y'] = generator['canvas-high-contrast'] = function ({ colors }) {
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
