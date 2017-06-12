export default function generator ({ colors, spacing, typography }) {
  return {
    padding: `${spacing.xSmall} ${spacing.small}`,

    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    lineHeight: typography.lineHeightCondensed,
    fontSize: typography.fontSizeSmall,

    labelColor: colors.oxford,
    background: colors.white,

    iconColor: colors.oxford,
    iconMarginEnd: spacing.xSmall,

    activeBackground: colors.brand,
    activeLabelColor: colors.white,
    activeIconColor: colors.white
  }
}

generator.canvas = function (variables) {
  return {
    labelColor: variables['ic-brand-font-color-dark'],
    iconColor: variables['ic-brand-font-color-dark'],
    activeBackground: variables['ic-brand-primary']
  }
}
