export default function ({ colors, borders, spacing, typography }) {
  return {
    background: colors.lightest,
    borderRadius: borders.radiusMedium,
    marginTop: spacing.small,

    content: {
      padding: spacing.small + ' ' + spacing.medium,
      fontSize: typography.fontSizeMedium,
      fontFamily: typography.fontFamily,
      fontWeight: typography.fontWeightNormal,
      lineHeight: typography.lineHeightCondensed
    },

    icon: {
      color: colors.lightest,
      background: colors.lightest
    },

    success: {
      borderColor: colors.success,
      icon: {
        background: colors.success
      }
    },

    info: {
      borderColor: colors.info,
      icon: {
        background: colors.info
      }
    },

    warning: {
      borderColor: colors.warning,
      icon: {
        background: colors.warning
      }
    },

    danger: {
      borderColor: colors.danger,
      icon: {
        background: colors.danger
      }
    }
  }
}
