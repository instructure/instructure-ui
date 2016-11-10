export default function ({ spacing, media, breakpoints }) {
  return {
    spacingSmall: spacing.small,
    spacingMedium: spacing.medium,
    spacingLarge: spacing.large,

    maxWidth: breakpoints.maxWidth,

    ...media
  }
}
