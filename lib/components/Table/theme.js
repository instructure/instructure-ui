import { darken } from '../../util/color'

export default function ({ colors }) {
  return {
    background: colors.lightest,
    thBorderColor: darken(colors.border, 20),
    hoverBgColor: darken(colors.light, 2)
  }
}
