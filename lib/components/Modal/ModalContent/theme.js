export default function ({ colors, borders, spacing, shadows, stacking }) {
  return {
    background: colors.white,
    borderColor: colors.tiara,
    borderRadius: borders.radiusMedium,
    autoMinWidth: spacing.autoMinWidth,
    smallMaxWidth: spacing.smallMaxWidth,
    mediumMaxWidth: spacing.mediumMaxWidth,
    largeMaxWidth: spacing.largeMaxWidth,
    closeButtonOffset: spacing.medium,
    closeButtonZIndex: stacking.above,
    boxShadow: shadows.depth3
  }
}
