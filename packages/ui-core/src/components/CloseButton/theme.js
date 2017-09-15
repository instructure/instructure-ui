export default function ({ spacing, stacking }) {
  return {
    offsetMedium: spacing.medium,
    offsetSmall: spacing.small,
    offsetXSmall: spacing.xSmall,
    zIndex: stacking.above
  }
}
