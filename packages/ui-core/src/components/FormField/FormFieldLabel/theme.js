export default function generator ({ colors, typography }) {
  return {
    color: colors.oxford,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightBold,
    fontSize: typography.fontSizeMedium,
    lineHeight: typography.lineHeightCondensed
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark']
  }
}
