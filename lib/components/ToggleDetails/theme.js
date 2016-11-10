export default function ({ colors, spacing, borders }) {
  return {
    smallIconSize: '0.5rem',
    mediumIconSize: '0.8125rem',
    largeIconSize: '1.125rem',

    togglePadding: spacing.xxSmall,
    toggleBorderRadius: borders.radiusMedium,
    toggleBorderWidth: borders.widthSmall,
    toggleBorderStyle: borders.style,
    toggleFocusBorderColor: colors.brand
  }
}
