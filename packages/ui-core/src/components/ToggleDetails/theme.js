export default function generator ({ colors, spacing, borders }) {
  return {
    smallIconSize: '0.5rem',
    mediumIconSize: '0.8125rem',
    largeIconSize: '1.125rem',
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
    iconColor: variables['ic-brand-font-color-dark']
  }
}
