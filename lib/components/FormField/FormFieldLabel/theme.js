export default function generator ({ colors, spacing, typography }) {
  return {
    color: colors.dark,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightBold,
    fontSize: typography.fontSizeSmall,
    lineHeight: typography.lineHeight,
    marginBottom: spacing.xxSmall
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark']
  }
}
