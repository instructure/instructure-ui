import { alpha } from '../../util/color'

export default function ({ colors, borders, spacing, typography, forms }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    color: colors.dark,

    background: colors.lightest,

    borderWidth: borders.widthSmall,
    borderStyle: borders.style,
    borderColor: colors.border,
    borderRadius: borders.radiusMedium,

    padding: spacing.small,

    focus: {
      borderColor: colors.brand,
      outlineColor: alpha(colors.brand, 50)
    },

    error: {
      borderColor: colors.danger,
      outlineColor: alpha(colors.danger, 50)
    },

    placeholder: {
      color: colors.medium
    },

    small: {
      fontSize: typography.fontSizeXSmall,
      height: forms.inputHeightSmall
    },

    medium: {
      fontSize: typography.fontSizeSmall,
      height: forms.inputHeightMedium
    },

    large: {
      fontSize: typography.fontSizeMedium,
      height: forms.inputHeightLarge
    }
  }
}
