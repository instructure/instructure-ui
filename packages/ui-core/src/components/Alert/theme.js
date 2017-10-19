export default function generator ({ colors, borders, spacing, typography, shadows }) {
  return {
    color: colors.licorice,
    background: colors.white,
    borderRadius: borders.radiusMedium,
    marginTop: spacing.small,

    contentPadding: `${spacing.small} ${spacing.medium}`,
    contentFontSize: typography.fontSizeMedium,
    contentFontFamily: typography.fontFamily,
    contentFontWeight: typography.fontWeightNormal,
    contentLineHeight: typography.lineHeightCondensed,

    closeButtonMarginTop: spacing.xSmall,

    iconColor: colors.white,
    iconBackground: colors.white,

    successBorderColor: colors.shamrock,
    successIconBackground: colors.shamrock,

    infoBorderColor: colors.electric,
    infoIconBackground: colors.electric,

    warningBorderColor: colors.fire,
    warningIconBackground: colors.fire,

    dangerBorderColor: colors.crimson,
    dangerIconBackground: colors.crimson,

    boxShadow: shadows.depth2
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark']
  }
}
