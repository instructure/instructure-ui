export default function generator ({ colors, spacing, borders, typography }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    lineHeight: typography.lineHeight,
    textColor: colors.licorice,

    fontSizeSmall: typography.fontSizeSmall,
    fontSizeMedium: typography.fontSizeMedium,
    fontSizeLarge: typography.fontSizeLarge,

    smallIconSize: '0.5rem',
    mediumIconSize: '0.75rem',
    largeIconSize: '1rem',
    iconMargin: spacing.xxSmall,
    iconColor: colors.licorice,

    togglePadding: spacing.xxSmall,
    toggleBorderRadius: borders.radiusMedium,
    toggleBorderWidth: borders.widthSmall,
    toggleBorderStyle: borders.style,
    toggleFocusBorderColor: colors.brand,

    filledBackgroundColor: colors.porcelain,
    filledBorderWidth: borders.widthSmall,
    filledBorderStyle: borders.style,
    filledBorderColor: colors.tiara,
    filledBorderRadius: borders.radiusMedium,
    filledPadding: spacing.small
  }
}

generator['canvas'] = function (variables) {
  return {
    toggleFocusBorderColor: variables['ic-brand-primary'],
    iconColor: variables['ic-brand-font-color-dark'],
    textColor: variables['ic-brand-font-color-dark']
  }
}
