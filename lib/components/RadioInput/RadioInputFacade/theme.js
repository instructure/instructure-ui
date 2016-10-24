import { alpha, darken } from '../../../util/color'

export default function ({ borders, colors, typography }) {
  return {
    borderColor: colors.border,
    background: colors.lightest,

    hover: {
      borderColor: colors.brand
    },

    focus: {
      outlineColor: colors.brand,
      shadowColor: alpha(colors.brand, 50)
    },

    checked: {
      outlineColor: colors.dark
    },

    toggle: {
      borderRadius: borders.radiusLarge,
      borderWidth: borders.widthLarge,
      background: colors.dark,
      color: colors.lightest,

      handle: {
        background: colors.lightest,
        color: colors.dark
      },

      focus: {
        color: alpha(colors.brand, 50)
      },

      success: {
        color: darken(colors.success, 15)
      },

      danger: {
        color: darken(colors.danger, 15)
      },

      small: {
        height: '1.25rem'
      },

      medium: {
        height: '1.875rem'
      },

      large: {
        height: '2.5rem'
      }
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
