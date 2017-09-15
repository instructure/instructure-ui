export default function generator ({ colors, typography }) {
  return {
    color: colors.oxford,
    fontFamily: typography.fontFamily
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark']
  }
}
