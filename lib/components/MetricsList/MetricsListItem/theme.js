export default function ({ colors, typography, spacing }) {
  return {
    padding: '0 ' + spacing.xSmall,
    textAlign: 'center',
    fontFamily: typography.fontFamily,

    valueColor: colors.dark,
    valueFontSize: typography.fontSizeXLarge,
    valueFontWeight: typography.fontWeightBold,

    labelColor: colors.dark,
    labelFontSize: typography.fontSizeXSmall
  }
}
