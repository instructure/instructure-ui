export default function generator ({ colors, spacing, typography }) {
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

generator.canvas = function (variables) {
  return {
    hover: {
      background: variables['ic-brand-primary']
    }
  }
}
