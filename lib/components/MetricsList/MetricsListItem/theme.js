export default function ({ colors, typography }) {
  return {
    fontFamily: typography.fontFamily,

    valueColor: colors.dark,
    valueFontSize: typography.fontSizeXLarge,
    valueFontWeight: typography.fontWeightBold,

    labelColor: colors.dark,
    labelFontSize: typography.fontSizeXSmall
  }
}
