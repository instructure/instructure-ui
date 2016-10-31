export default function ({ colors, spacing }) {
  return {
    background: colors.lightest,
    closeButton: {
      offset: spacing.xSmall
    },
    content: {
      margin: spacing.medium,
      padding: spacing.small
    }
  }
}
