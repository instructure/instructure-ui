export default function ({ colors, spacing }) {
  return {
    background: colors.lightest,
    closeButton: {
      offset: '0'
    },
    content: {
      margin: spacing.medium,
      padding: spacing.small
    }
  }
}
