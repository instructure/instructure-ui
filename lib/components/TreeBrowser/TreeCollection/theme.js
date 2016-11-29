export default function ({ colors, spacing, typography, borders }) {
  return {
    baseSpacingSmall: spacing.xSmall,
    baseSpacingMedium: spacing.small,
    baseSpacingLarge: '1rem',
    borderWidth: borders.widthSmall,
    borderColor: colors.medium
  }
}
