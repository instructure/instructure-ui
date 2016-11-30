import { alpha } from '../../util/color'

export default function ({ colors }) {
  return {
    background: colors.lightest,
    borderColor: colors.border,
    shadowColorNear: alpha(colors.darkest, 10),
    shadowColorFar: alpha(colors.darkest, 25)
  }
}
