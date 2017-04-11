export default function ({ typography, spacing }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,

    smallFontSize: typography.fontSizeXSmall,
    smallPadding: spacing.xxSmall,

    mediumFontSize: typography.fontSizeSmall,
    mediumPadding: spacing.xSmall,

    largeFontSize: typography.fontSizeMedium,
    largePadding: spacing.small
  }
}
