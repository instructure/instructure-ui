/* Global variables (colors, typography, spacing, etc.) are defined in lib/themes */

export default function generator ({ colors, typography, spacing }) {
  return {
    fontSize: typography.fontSizeSmall,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightBold,
    padding: `${spacing.xSmall} ${spacing.small}`,
    color: colors.oxford,
    background: colors.white
  }
}
