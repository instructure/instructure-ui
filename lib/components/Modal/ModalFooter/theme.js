export default function ({ colors, borders, spacing }) {
  return {
    background: colors.porcelain,
    borderColor: colors.border,
    borderWidth: borders.widthSmall,
    borderRadius: borders.radiusMedium,
    padding: spacing.small
  }
}
