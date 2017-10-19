export default function generator ({ colors, typography, borders, spacing, stacking }) {
  return {
    fontSize: typography.fontSizeMedium,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,

    color: colors.oxford,
    background: colors.white,
    borderRadius: borders.radiusMedium,

    labelMargin: '0',
    labelPadding: spacing.xSmall,

    headerFontWeight: typography.fontWeightBold,

    cellPadding: spacing.xSmall,
    cellMinWidth: spacing.large,
    cellMinHeight: spacing.large,
    cellBorderWidth: borders.widthSmall,
    cellBorderStyle: borders.style,

    todayBackground: colors.electric,
    todayBorderRadius: spacing.large, // to make the today highlight circular
    todayColor: colors.white,

    selectedBackground: colors.shamrock,
    selectedColor: colors.white,

    otherMonthColor: colors.ash,
    focusOutline: colors.brand,

    zIndex: (stacking.above)
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark'],
    focusOutline: variables['ic-brand-primary']
  }
}
