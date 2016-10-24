import { alpha } from '../../../util/color'

export default function ({ colors, borders, spacing, typography }) {
  return {
    color: colors.lightest,
    borderColor: colors.border,
    borderRadius: borders.radiusSmall,
    background: colors.lightest,
    marginRight: spacing.xSmall,
    padding: spacing.xxxSmall,

    checked: {
      background: colors.brand,
      borderColor: colors.brand
    },

    hover: {
      borderColor: colors.brand
    },

    focus: {
      outlineColor: alpha(colors.brand, 50)
    },

    label: {
      color: colors.dark,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSizeMedium,
      fontWeight: typography.fontWeightNormal,
      lineHeight: typography.lineHeightCondensed
    }
  }
}
