export default function ({ colors, borders, breakpoints, shadows, stacking }) {
  return {
    background: colors.white,
    borderColor: colors.tiara,
    borderRadius: borders.radiusMedium,

    autoMinWidth: breakpoints.xSmall,
    smallMaxWidth: breakpoints.small,
    mediumMaxWidth: breakpoints.medium,
    largeMaxWidth: breakpoints.large,

    boxShadow: shadows.depth3,

    zIndex: stacking.topmost
  }
}
