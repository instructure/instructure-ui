export default function generator ({ colors, borders, typography }) {
  return {
    color: colors.brand,
    background: colors.white,
    borderWidthSmall: borders.widthSmall,
    borderWidthMedium: borders.widthMedium,
    borderColor: colors.tiara,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightBold
  }
}

generator['canvas'] = function (variables) {
  return {
    color: variables['ic-brand-primary']
  }
}
