import { lighten } from '@instructure/ui-themeable/lib/utils/color'

export default function generator ({ colors }) {
  return {
    meterColorStart: colors.brand,
    meterColorEnd: lighten(colors.brand, 12),
    backgroundColor: colors.licorice
  }
}
