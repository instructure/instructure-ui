import { darken } from '../../util/color'

export default function ({ colors, typography, spacing }) {
  return {
    color: colors.dark,
    background: colors.lightest,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    fontSize: typography.fontSizeMedium,
    borderColor: colors.border,

    header: {
      borderColor: darken(colors.border, 20)
    },

    hover: {
      borderColor: colors.brand
    },

    caption: {
      color: colors.dark,
      fontSize: typography.fontSizeMedium
    },

    small: {
      fontSize: typography.fontSizeXSmall,
      lineHeight: typography.lineHeightFit,
      padding: `${spacing.xxSmall} ${spacing.xSmall}`
    },

    medium: {
      fontSize: typography.fontSizeSmall,
      lineHeight: typography.lineHeightCondensed,
      padding: `${spacing.xSmall} ${spacing.small}`
    },

    large: {
      fontSize: typography.fontSizeMedium,
      lineHeight: typography.lineHeightCondensed,
      padding: `${spacing.small} ${spacing.medium}`
    },

    striped: {
      background: colors.light
    }
  }
}
