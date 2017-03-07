export default function generator ({ colors, borders, spacing, typography }) {
  return {
    color: colors.white,
    borderWidth: borders.widthMedium,
    borderColor: colors.ash,
    borderRadius: borders.radiusMedium,
    background: colors.white,
    marginRight: spacing.xSmall,
    padding: spacing.xxxSmall,

    checkedBackground: colors.oxford,
    checkedBorderColor: colors.oxford,

    hoverBorderColor: colors.oxford,

    focusBorderColor: colors.brand,
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
    focusBorderColor: variables['ic-brand-primary'],
    labelColor: variables['ic-brand-font-color-dark']
  }
}

generator.modern = function ({ colors, borders }) {
  return {
    borderRadius: borders.radiusSmall,
    hoverBorderColor: colors.electric,
    checkedBackground: colors.electric,
    checkedBorderColor: colors.electric,
    focusBorderColor: 'transparent'
  }
}
