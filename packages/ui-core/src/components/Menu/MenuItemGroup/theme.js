export default function generator ({ colors, typography, spacing }) {
  return {
    fontSize: typography.fontSizeMedium,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightBold,
    padding: `${spacing.xSmall} ${spacing.small}`,
    color: colors.oxford,
    background: colors.white
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark']
  }
}
