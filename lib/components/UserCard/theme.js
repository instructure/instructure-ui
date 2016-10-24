export default function ({ colors, typography }) {
  return {
    background: colors.lightest,
    color: colors.dark,

    fontFamily: typography.fontFamily,
    fontSize: typography.fontSizeMedium,
    fontWeight: typography.fontWeightNormal,
    lineHeight: typography.lineHeight,

    profileData: {
      color: colors.darkest,
      fontSize: typography.fontSizeXSmall,
      lineHeight: typography.lineHeightCondensed,
      fontWeight: typography.fontWeightLight
    }
  }
}
