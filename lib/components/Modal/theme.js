export default function ({ colors, borders, spacing }) {
  return {
    background: colors.lightest,
    borderColor: colors.border,
    borderRadius: borders.radiusMedium,

    auto: {
      minWidth: '20rem',
      minHeight: '22rem'
    },

    small: {
      maxWidth: '28rem',
      minHeight: '22rem'
    },

    medium: {
      maxWidth: '50rem',
      minHeight: '24rem'
    },

    large: {
      maxWidth: '63rem',
      minHeight: '24rem'
    },

    closeButton: {
      offset: spacing.medium
    }
  }
}
