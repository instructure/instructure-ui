export default function ({ colors, borders, shadows }) {
  return {
    borderColor: colors.tiara,
    backgroundColor: colors.white,
    textColor: colors.oxford,

    borderColorInverse: 'transparent',
    backgroundColorInverse: colors.oxford,
    textColorInverse: colors.white,

    arrowSize: '0.5rem',
    borderWidth: borders.widthSmall,
    borderRadius: borders.radiusMedium,

    boxShadow: shadows.depth1
  }
}
