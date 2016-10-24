import { darken } from '../../util/color'

export default function ({ colors, typography }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,

    color: colors.brand,
    textDecoration: 'none',
    hover: {
      color: darken(colors.brand, 10),
      textDecoration: 'underline'
    }
  }
}
