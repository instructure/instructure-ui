export default function ({ colors, spacing, typography }) {
  return {
    color: colors.dark,

    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    lineHeight: typography.lineHeightCondensed,
    fontSize: typography.fontSizeMedium,

    small: {
      height: spacing.medium,
      value: {
        fontSize: typography.fontSizeSmall
      }
    },

    medium: {
      height: spacing.large,
      value: {
        fontSize: typography.fontSizeMedium
      }
    },

    large: {
      height: spacing.xLarge,
      value: {
        fontSize: typography.fontSizeLarge
      }
    },

    value: {
      padding: `0 ${spacing.medium}`
    },

    meter: {
      color: colors.brand
    },

    done: {
      meter: {
        color: colors.success
      }
    },

    track: {
      color: colors.border
    },

    inverse: {
      color: colors.lightest,
      track: {
        color: 'rgba(0, 0, 0, 0.25)'
      }
    }
  }
}
