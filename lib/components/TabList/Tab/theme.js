import { darken } from '../../../util/color'

export default function ({ colors, typography, spacing }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    lineHeight: typography.lineHeightCondensed,
    fontSize: typography.fontSizeMedium,

    accordion: {
      padding: `${spacing.xSmall} ${spacing.small}`,
      color: colors.dark,
      background: colors.light,
      borderColor: colors.border,

      hover: {
        background: darken(colors.light, 10)
      },

      selected: {
        borderColor: colors.brand,
        color: colors.lightest,
        background: colors.brand
      },

      focused: {
        borderColor: colors.lightest
      }
    },

    simple: {
      color: colors.brand,

      selected: {
        background: colors.lightest,
        borderColor: colors.border,
        color: colors.dark
      }
    },

    minimal: {
      color: colors.dark,

      hover: {
        borderColor: colors.border
      },

      selected: {
        borderColor: colors.brand
      }
    }
  }
}
