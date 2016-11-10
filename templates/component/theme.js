/* Global variables (colors, typography, spacing, etc.) are defined in lib/brands */

export default function generator ({ colors, typography }) {
  return {
    fontSize: typography.fontSizeMedium,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,

    color: colors.dark,
    background: colors.lightest
  }
}
