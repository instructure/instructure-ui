export default function ({ colors, spacing, borders }) {
  return {
    marginTop: spacing.xxSmall,

    toggle: {
      backgroundColor: colors.dark,
      borderWidth: borders.widthLarge,
      borderStyle: borders.style,
      borderRadius: borders.radiusLarge,

      success: {
        backgroundColor: colors.success
      },

      danger: {
        backgroundColor: colors.danger
      }
    }
  }
}
