export default function ({ colors, typography, spacing }) {
  return {
    padding: `0 ${spacing.xSmall}`,
    textAlign: 'center',
    fontFamily: typography.fontFamily,

    valueColor: colors.oxford,
    valueFontSize: typography.fontSizeXLarge,
    valueFontWeight: typography.fontWeightBold,

    labelColor: colors.oxford,
    labelFontSize: typography.fontSizeXSmall
  }
}
