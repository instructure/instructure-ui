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
