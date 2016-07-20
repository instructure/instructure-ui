export default function ({ colors }) {
  return {
    background: colors.lightest,

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
