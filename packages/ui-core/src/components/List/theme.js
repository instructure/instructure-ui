export default function generator ({ colors, spacing, typography }) {
  return {
    background: colors.white,
    color: colors.licorice,
    pipeColor: colors.slate,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    defaultListPadding: spacing.large,
    orderedNumberFontWeight: typography.fontWeightBold,
    orderedNumberMargin: spacing.xSmall
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark']
  }
}
