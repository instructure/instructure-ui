export default function ({ spacing, media, breakpoints }) {
  return {
    spacing: {
      small: spacing.small,
      medium: spacing.medium,
      large: spacing.large
    },
    maxWidth: breakpoints.maxWidth,
    media
  }
}
