export default function ({ borders, colors, spacing }) {
  return {
    borderWidth: borders.widthSmall,
    borderStyle: borders.style,
    borderColor: 'transparent',
    borderRadius: borders.radiusMedium,

    errorBorderColor: colors.crimson,
    errorFieldsPadding: spacing.xSmall
  }
}
