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
    labelLineHeight: typography.lineHeightCondensed,
    labelTopMarginMedium: '0.125rem',
    labelTopMarginLarge: '0.25rem',

    facadeSizeSmall: '1rem',
    facadeSizeMedium: '1.25rem',
    facadeSizeLarge: '1.5rem',

    iconSizeSmall: '0.625rem',
    iconSizeMedium: '0.75rem',
    iconSizeLarge: '0.875rem'
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
