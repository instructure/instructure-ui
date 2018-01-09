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
    marginBottomDefault: spacing.xxxSmall,
    spacingXXXSmall: spacing.xxxSmall,
    spacingXXSmall: spacing.xxSmall,
    spacingXSmall: spacing.xSmall,
    spacingSmall: spacing.small,
    spacingMedium: spacing.medium,
    spacingLarge: spacing.large,
    spacingXLarge: spacing.xLarge,
    spacingXXLarge: spacing.xxLarge
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark']
  }
}
