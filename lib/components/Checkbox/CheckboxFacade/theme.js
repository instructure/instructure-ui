export default function generator ({ colors, borders, spacing, typography }) {
  return {
    color: colors.lightest,
    borderColor: colors.tiara,
    borderRadius: borders.radiusSmall,
    background: colors.lightest,
    marginRight: spacing.xSmall,
    padding: spacing.xxxSmall,

    checkedBackground: colors.oxford,
    checkedBorderColor: colors.oxford,

    hoverBorderColor: colors.oxford,

    focusOutlineColor: colors.oxford,
    focusBorderWidth: borders.widthSmall,
    focusBorderStyle: borders.style,

    labelColor: colors.oxford,
    checkedLabelColor: colors.oxford,
    labelFontFamily: typography.fontFamily,
    labelFontSize: typography.fontSizeSmall,
    labelFontWeight: typography.fontWeightNormal,
    labelLineHeight: typography.lineHeightCondensed
  }
}

generator.canvas = function (variables) {
  return {
    focusOutlineColor: variables['ic-brand-primary'],
    labelColor: variables['ic-brand-font-color-dark']
  }
}

generator.modern = function ({ colors }) {
  return {
    focusOutlineColor: colors.brand,
    checkedBackground: colors.brand,
    checkedBorderColor: colors.brand,
    checkedLabelColor: colors.brand
  }
}

