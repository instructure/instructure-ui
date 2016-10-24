export default function ({ colors, borders, spacing }) {
  return {
    color: colors.dark,
    background: colors.lightest,
    borderColor: colors.border,
    borderWidth: borders.widthSmall,
    borderStyle: borders.style,
    padding: spacing.small
  }
}
