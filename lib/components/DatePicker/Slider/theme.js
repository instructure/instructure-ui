/* Global variables (colors, typography, spacing, etc.) are defined in lib/themes */

export default function generator ({ colors, typography, borders, spacing }) {
  return {
    fontSize: typography.fontSizeLarge,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightBold,

    color: colors.oxford,
    background: colors.white,

    selectedBorderRadius: borders.radiusMedium,

    sliderButtonSize: spacing.large,
    focusOutline: colors.brand
  }
}
