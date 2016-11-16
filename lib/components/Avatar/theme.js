export default function generator ({ colors, typography }) {
  return {
    color: colors.light,
    background: colors.brand,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightBold
  }
}

generator.canvas = function (variables) {
  return {
    background: variables['ic-brand-primary']
  }
}
