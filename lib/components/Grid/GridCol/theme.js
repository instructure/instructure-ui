export default function ({ spacing, media }) {
  return {
    numCols: 12,
    spacing: {
      small: spacing.small,
      medium: spacing.medium,
      large: spacing.large
    },
    media
  }
}
