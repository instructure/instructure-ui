export default function generator ({ colors, borders, spacing }) {
  return {
    backgroundColor: colors.brand,
    color: colors.white,
    margin: `0 ${spacing.xxSmall} 0 0`,
    border: 'none',
    padding: `0 ${spacing.small}`,
    focusOutlineColor: colors.brand,
    focusOutlineWeight: borders.widthMedium,
    focusBorderColor: colors.white,
    focusBorderWeight: borders.widthSmall
  }
}
