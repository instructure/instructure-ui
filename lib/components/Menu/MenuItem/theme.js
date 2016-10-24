export default function ({ colors, spacing, typography }) {
  return {
    color: colors.dark,
    background: colors.lightest,

    padding: `${spacing.xSmall} ${spacing.small}`,

    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    lineHeight: typography.lineHeightCondensed,
    fontSize: typography.fontSizeSmall,

    hover: {
      color: colors.lightest,
      background: colors.brand
    }
  }
}
