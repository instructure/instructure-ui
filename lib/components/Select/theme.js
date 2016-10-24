import { alpha } from '../../util/color'

export default function ({ colors, borders, typography, forms, spacing }) {
  return {
    borderColor: colors.border,
    borderWidth: borders.widthSmall,
    borderStyle: borders.style,
    borderRadius: borders.radiusMedium,

    background: colors.lightest,
    color: colors.dark,

    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    fontSize: typography.fontSizeSmall,

    padding: spacing.small,

    arrow: {
      color: colors.dark
    },

    small: {
      height: forms.inputHeightSmall,
      fontSize: typography.fontSizeXSmall,
      arrow: {
        width: '0.75rem'
      }
    },

    medium: {
      height: forms.inputHeightMedium,
      fontSize: typography.fontSizeSmall,
      arrow: {
        width: '0.875rem'
      }
    },

    large: {
      height: forms.inputHeightLarge,
      fontSize: typography.fontSizeMedium,
      arrow: {
        width: '1rem'
      }
    },

    focus: {
      borderColor: colors.brand,
      outlineColor: alpha(colors.brand, 50)
    },

    error: {
      borderColor: colors.danger,
      outlineColor: alpha(colors.danger, 50)
    }
  }
}
