export default function ({ colors, spacing, stacking }) {
  return {
    closeButtonOffsetMedium: spacing.medium,
    closeButtonOffsetSmall: spacing.small,
    closeButtonOffsetXSmall: spacing.xSmall,
    closeButtonZIndex: stacking.above,
    zIndex: stacking.topmost
  }
}
