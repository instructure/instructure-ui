export default function ({ colors, spacing }) {
  return {
    color: colors.dark,
    small: {
      height: spacing.medium
    },
    medium: {
      height: spacing.large
    },
    large: {
      height: spacing.xLarge
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
