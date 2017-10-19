export default function generator ({ borders, colors, spacing, typography }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    lineHeight: typography.lineHeight,
    fontSizeSmall: typography.fontSizeSmall,
    fontSizeMedium: typography.fontSizeMedium,
    fontSizeLarge: typography.fontSizeLarge,
    color: colors.licorice,

    pipeBorderColor: colors.ash,
    pipeBorderWidth: borders.widthSmall,
    pipeSpacing: spacing.xSmall,
    pipeColor: colors.slate,
    pipeLineHeight: typography.lineHeightCondensed,

    marginBottomDefault: spacing.xxxSmall
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark']
  }
}
