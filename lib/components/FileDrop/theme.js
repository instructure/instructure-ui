/* Global variables (colors, typography, spacing, etc.) are defined in lib/themes */

export default function generator ({ borders, colors }) {
  return {
    backgroundColor: colors.white,
    borderRadius: borders.radiusLarge,
    borderWidth: borders.widthMedium,
    hoverBorderColor: colors.brand,
    hoverBorderStyle: 'dashed',
    focusBorderStyle: 'solid',
    acceptedColor: colors.brand,
    rejectedColor: colors.crimson
  }
}
