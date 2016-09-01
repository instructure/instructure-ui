import { darken } from '../../util/color'

export default function ({ colors }) {
  return {
    color: colors.dark,
    background: colors.lightest,
    thBorderColor: darken(colors.border, 20),
    hoverBgColor: darken(colors.light, 2),
    captionColor: colors.dark
  }
}
