export default function ({ colors, spacing, borders }) {
  return {

    small: {
      iconSize: '0.5rem'
    },

    medium: {
      iconSize: '0.8125rem'
    },

    large: {
      iconSize: '1.125rem'
    },

    toggle: {
      padding: spacing.xxSmall,
      borderRadius: borders.radiusMedium,
      borderWidth: borders.widthSmall,
      borderStyle: borders.style,

      focus: {
        borderColor: colors.brand
      }
    }
  }
}
