export default function ({ colors, typography }) {
  return {
    fontFamily: typography.fontFamily,

    value: {
      color: colors.dark,
      fontSize: typography.fontSizeXLarge,
      fontWeight: typography.fontWeightBold
    },

    label: {
      color: colors.dark,
      fontSize: typography.fontSizeXSmall
    }
  }
}
