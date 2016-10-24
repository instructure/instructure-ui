export default function ({ colors, typography }) {
  return {
    colorHint: colors.darkest,
    colorError: colors.danger,
    colorSuccess: colors.success,

    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    fontSize: typography.fontSizeXSmall,
    lineHeight: typography.lineHeight
  }
}
