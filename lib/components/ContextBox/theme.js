export default function ({ colors, borders, shadows }) {
  return {
    borderColor: colors.border,
    backgroundColor: colors.lightest,
    textColor: colors.oxford,

    borderColorInverse: 'transparent',
    backgroundColorInverse: colors.oxford,
    textColorInverse: colors.lightest,

    arrowSize: '0.5rem',
    borderWidth: borders.widthSmall,
    borderRadius: borders.radiusMedium,

    boxShadow: shadows.depth1
  }
}
