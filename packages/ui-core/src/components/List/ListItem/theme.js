export default function generator ({ borders, colors, spacing, typography }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    lineHeight: typography.lineHeight,
    fontSizeSmall: typography.fontSizeSmall,
    fontSizeMedium: typography.fontSizeMedium,
    fontSizeLarge: typography.fontSizeLarge,
    color: colors.licorice,

    inlineColor: colors.slate,
    inlineLineHeight: typography.lineHeightCondensed,

    noneSpacing: spacing.xSmall,
    pipeSpacing: spacing.xSmall,
    slashSpacing: spacing.xxxSmall,
    arrowSpacing: spacing.xSmall,

    marginBottomDefault: spacing.xxxSmall
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark']
  }
}
