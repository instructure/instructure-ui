import { alpha } from '../../../util/color'

export default function ({ colors, borders, spacing, typography }) {
  return {
    color: colors.lightest,
    background: colors.dark,
    borderColor: colors.dark,
    borderWidth: borders.widthLarge,
    borderRadius: borders.radiusLarge,
    marginRight: spacing.xSmall,

    checked: {
      background: colors.success,
      borderColor: colors.success
    },

    focus: {
      outlineColor: alpha(colors.brand, 50)
    },

    handle: {
      background: colors.lightest
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
