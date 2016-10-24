export default function ({ colors, borders, spacing }) {
  return {
    background: colors.border,
    height: borders.widthSmall,
    margin: `0 ${spacing.small}`
  }
}
