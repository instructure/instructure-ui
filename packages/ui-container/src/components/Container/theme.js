/* Global variables (colors, typography, spacing, etc.) are defined in lib/themes */

export default function generator ({ colors, borders, shadows, spacing, breakpoints }) {
  return {
    borderColor: colors.tiara,
    borderWidth: borders.widthSmall,
    borderRadius: borders.radiusMedium,
    boxShadow: shadows.depth1,

    marginxxxSmall: spacing.xxxSmall,
    marginxxSmall: spacing.xxSmall,
    marginxSmall: spacing.xSmall,
    marginSmall: spacing.small,
    marginMedium: spacing.medium,
    marginLarge: spacing.large,
    marginxLarge: spacing.xLarge,
    marginxxLarge: spacing.xxLarge,

    paddingxxxSmall: spacing.xxxSmall,
    paddingxxSmall: spacing.xxSmall,
    paddingxSmall: spacing.xSmall,
    paddingSmall: spacing.small,
    paddingMedium: spacing.medium,
    paddingLarge: spacing.large,
    paddingxLarge: spacing.xLarge,
    paddingxxLarge: spacing.xxLarge,

    xSmallMaxWidth: breakpoints.xSmall,
    smallMaxWidth: breakpoints.small,
    mediumMaxWidth: breakpoints.medium,
    largeMaxWidth: breakpoints.large
  }
}
