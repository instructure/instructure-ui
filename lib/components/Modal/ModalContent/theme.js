export default function ({ colors, borders, spacing }) {
  return {
    background: colors.lightest,
    borderColor: colors.border,
    borderRadius: borders.radiusMedium,

    autoMinWidth: '20rem',
    autoMinHeight: '22rem',

    smallMaxWidth: '28rem',
    smallMinHeight: '22rem',

    mediumMaxWidth: '50rem',
    mediumMinHeight: '24rem',

    largeMaxWidth: '63rem',
    largeMinHeight: '24rem',

    closeButtonOffset: spacing.medium
  }
}
