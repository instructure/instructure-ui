export default function ({ spacing, media }) {
  return {
    spacingSmall: spacing.small,
    spacingMedium: spacing.medium,
    spacingLarge: spacing.large,

    ...media
  }
}
