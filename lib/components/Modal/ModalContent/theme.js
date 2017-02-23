export default function ({ colors, borders, spacing, shadows }) {
  return {
    background: colors.white,
    borderColor: colors.tiara,
    borderRadius: borders.radiusMedium,
    autoMinWidth: spacing.autoMinWidth,
    smallMaxWidth: spacing.smallMaxWidth,
    mediumMaxWidth: spacing.mediumMaxWidth,
    largeMaxWidth: spacing.largeMaxWidth,
    closeButtonOffset: spacing.medium,
    boxShadow: shadows.depth3
  }
}
