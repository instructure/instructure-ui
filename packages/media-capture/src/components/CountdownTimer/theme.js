import { alpha } from '@instructure/ui-themeable/lib/utils/color'

export default function generator ({ colors }) {
  return {
    backgroundColor: alpha(colors.oxford, 70),
    fontColor: colors.white,
    fontSize: '10rem'
  }
}
