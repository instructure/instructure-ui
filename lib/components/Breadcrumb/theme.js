export default function generator ({ colors, typography }) {
  return {
    separator: {
      color: colors.medium
    },
    small: {
      separator: {
        fontSize: '0.5rem'
      },
      fontSize: typography.fontSizeSmall
    },
    medium: {
      separator: {
        fontSize: '0.75rem'
      },
      fontSize: typography.fontSizeMedium
    },
    large: {
      separator: {
        fontSize: '1rem'
      },
      fontSize: typography.fontSizeLarge
    }
  }
}
