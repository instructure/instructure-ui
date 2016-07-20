import { darken } from '../../util/color'

export default function ({ colors }) {
  return {
    color: colors.brand,
    textDecoration: 'none',
    hover: {
      color: darken(colors.brand, 10),
      textDecoration: 'underline'
    }
  }
}
