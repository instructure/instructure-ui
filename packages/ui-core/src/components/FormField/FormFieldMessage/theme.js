export default function generator ({ colors, typography }) {
  return {
    colorHint: colors.licorice,
    colorError: colors.crimson,
    colorSuccess: colors.shamrock,

    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    fontSize: typography.fontSizeXSmall,
    lineHeight: typography.lineHeight
  }
}

generator.canvas = function (variables) {
  return {
    colorHint: variables['ic-brand-font-color-dark']
  }
}
