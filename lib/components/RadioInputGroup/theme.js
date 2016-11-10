export default function ({ colors, spacing, borders }) {
  return {
    marginTop: spacing.xxSmall,

    toggleBackgroundColor: colors.dark,
    toggleBorderWidth: borders.widthLarge,
    toggleBorderStyle: borders.style,
    toggleBorderRadius: borders.radiusLarge,

    toggleSuccessBackgroundColor: colors.success,
    toggleDangerBackgroundColor: colors.danger
  }
}
