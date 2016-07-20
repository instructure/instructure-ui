export default function ({ colors }) {
  return {
    color: colors.dark,
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
