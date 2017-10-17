export default function ({ colors, borders }) {
  return {
    background: colors.white,
    focusBorder: `1px solid ${colors.brand}`,
    focusBorderRadius: borders.radiusMedium
  }
}
