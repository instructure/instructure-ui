export default function generator ({ colors, typography }) {
  return {
    color: colors.oxford,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightBold,
    fontSize: typography.fontSizeSmall,
    lineHeight: typography.lineHeightCondensed
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark']
  }
}

generator.modern = function ({ colors, typography }) {
  return {
    color: colors.slate,
    fontWeight: typography.fontWeightNormal
  }
}
