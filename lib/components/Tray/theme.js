export default function ({ colors, shadows, stacking }) {
  return {
    background: colors.white,
    borderColor: colors.tiara,
    boxShadow: shadows.depth3,
    zIndex: stacking.topmost
  }
}
