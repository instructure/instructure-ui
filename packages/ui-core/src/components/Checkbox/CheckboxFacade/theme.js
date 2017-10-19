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
    labelFontWeight: typography.fontWeightNormal,
    labelLineHeight: typography.lineHeightCondensed,

    facadeSizeSmall: '1rem',
    facadeSizeMedium: '1.25rem',
    facadeSizeLarge: '1.75rem',

    labelFontSizeSmall: typography.fontSizeSmall,
    labelFontSizeMedium: typography.fontSizeMedium,
    labelFontSizeLarge: typography.fontSizeLarge,

    iconSizeSmall: '0.625rem',
    iconSizeMedium: '0.75rem',
    iconSizeLarge: '1rem'
  }
}

generator.canvas = function (variables) {
  return {
    focusBorderColor: variables['ic-brand-primary'],
    labelColor: variables['ic-brand-font-color-dark'],
    checkedLabelColor: variables['ic-brand-font-color-dark'],
    checkedBackground: variables['ic-brand-font-color-dark'],
    checkedBorderColor: variables['ic-brand-font-color-dark'],
    hoverBorderColor: variables['ic-brand-font-color-dark']
  }
}
