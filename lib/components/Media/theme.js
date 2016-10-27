export default function ({ colors, spacing, typography }) {
  return {
    fontFamily: typography.fontFamily,
    background: colors.lightest,
    color: colors.darkest,
    figure: {
      margin: `0 ${spacing.xSmall} 0 0`
    },
    title: {
      margin: `0 0 ${spacing.xSmall} 0`
    },
    description: {
      fontSize: typography.fontSizeMedium,
      fontWeight: typography.fontWeightNormal,
      lineHeight: typography.lineHeightCondensed
    }
  }
}
