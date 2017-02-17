export default function ({ colors, typography }) {
  return {
    colorHint: colors.darkest,
    colorError: colors.crimson,
    colorSuccess: colors.success,

    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    fontSize: typography.fontSizeXSmall,
    lineHeight: typography.lineHeight
  }
}
