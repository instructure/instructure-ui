import { alpha } from '../../util/color'

export default function generator ({ colors, borders, typography }) {
  return {
    color: colors.brand,
    background: colors.white,
    borderWidthSmall: borders.widthSmall,
    borderWidthMedium: borders.widthMedium,
    borderColor: alpha(colors.slate, 50),
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightBold
  }
}
