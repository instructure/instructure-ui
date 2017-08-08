export default function ({ colors, breakpoints, shadows, stacking }) {
  return {
    closeButtonOffset: '0',
    background: colors.white,
    borderColor: colors.tiara,
    boxShadow: shadows.depth3,
    xSmallWidth: breakpoints.xSmall,
    smallWidth: '20em', // 368px
    mediumWidth: breakpoints.medium,
    largeWidth: breakpoints.large,
    zIndex: stacking.topmost
  }
}
