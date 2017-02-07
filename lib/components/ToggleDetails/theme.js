export default function generator ({ colors, spacing, borders }) {
  return {
    smallIconSize: '0.5rem',
    mediumIconSize: '0.8125rem',
    largeIconSize: '1.125rem',
    iconMargin: spacing.xxSmall,
    iconColor: colors.darkest,

    togglePadding: spacing.xxSmall,
    toggleBorderRadius: borders.radiusMedium,
    toggleBorderWidth: borders.widthSmall,
    toggleBorderStyle: borders.style,
    toggleFocusBorderColor: colors.brand
  }
}

generator['canvas'] = function (variables) {
  return {
    iconColor: variables['ic-brand-font-color-dark']
  }
}
