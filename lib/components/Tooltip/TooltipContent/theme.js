export default function ({ typography, spacing }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,

    small: {
      fontSize: typography.fontSizeXSmall,
      padding: spacing.xxSmall
    },

    medium: {
      fontSize: typography.fontSizeSmall,
      padding: spacing.xSmall
    },

    large: {
      fontSize: typography.fontSizeMedium,
      padding: spacing.small
    }
  }
}
