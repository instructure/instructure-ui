export default function generator ({ colors, typography }) {
  return {
    color: colors.dark,

    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    fontSize: typography.fontSizeSmall,
    lineHeight: typography.lineHeight
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark']
  }
}
