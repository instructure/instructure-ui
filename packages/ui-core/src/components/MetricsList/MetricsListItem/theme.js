export default function generator ({ colors, typography, spacing }) {
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

generator.canvas = function (variables) {
  return {
    valueColor: variables['ic-brand-font-color-dark'],
    labelColor: variables['ic-brand-font-color-dark']
  }
}
