export default function ({ colors, borders, spacing, shadows }) {
  return {
    background: colors.lightest,
    borderColor: colors.border,
    borderRadius: borders.radiusMedium,
    autoMinWidth: '20rem',
    smallMaxWidth: '28rem',
    mediumMaxWidth: '50rem',
    largeMaxWidth: '63rem',
    closeButtonOffset: spacing.medium,
    boxShadow: shadows.depth3
  }
}
