export default function ({ colors, borders, spacing, shadows }) {
  return {
    background: colors.white,
    borderColor: colors.tiara,
    borderRadius: borders.radiusMedium,
    autoMinWidth: '20rem',
    smallMaxWidth: '28rem',
    mediumMaxWidth: '50rem',
    largeMaxWidth: '63rem',
    closeButtonOffset: spacing.medium,
    boxShadow: shadows.depth3
  }
}
