/* Global variables (colors, typography, spacing, etc.) are defined in lib/themes */

export default function generator ({ colors, typography, borders, spacing }) {
  return {
    fontSize: typography.fontSizeMedium,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,

    color: colors.oxford,
    background: colors.white,

    labelMargin: '0',
    labelPadding: spacing.xSmall,

    cellPadding: spacing.xSmall,
    cellMinWidth: spacing.large,
    cellMinHeight: spacing.large,

    todayBackground: colors.electric,
    todayBorderRadius: spacing.large, // to make the today highlight circular
    todayColor: colors.white,

    selectedBackground: colors.shamrock,
    selectedBorderRadius: borders.radiusMedium,
    selectedColor: colors.white,

    otherMonthColor: colors.ash,
    focusOutline: colors.brand
  }
}
