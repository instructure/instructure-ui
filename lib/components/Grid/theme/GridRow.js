export default function ({ breakpoints, spacing }) {
  return {
    breakpointTablet: breakpoints.tablet,
    breakpointDesktop: breakpoints.desktop,
    breakpointWide: breakpoints.wide,
    spacingSmall: spacing.spacingSmall,
    spacingMedium: spacing.spacingMedium,
    spacingLarge: spacing.spacingLarge
  }
}
