import { alpha, darken } from '@instructure/ui-themeable/lib/utils/color'

export default function ({ colors, typography, spacing, forms }) {
  return {

    handleSize: '1.5rem',
    handleBackground: colors.brand,
    handleShadowColor: darken(colors.brand, 15),

    handleHoverBackground: colors.brand,

    handleFocusBackground: colors.brand,
    handleFocusOutlineColor: alpha(colors.brand, 40),
    handleFocusOutlineWidth: '0.75em',

    trackBackground: colors.slate,

    valueBackground: colors.oxford,
    valueColor: colors.white,
    valueFontFamily: typography.fontFamily,
    valueFontWeight: typography.fontWeightNormal,

    valueSmallFontSize: typography.fontSizeSmall,
    valueSmallPadding: `0 ${spacing.xSmall}`,
    valueSmallLineHeight: forms.inputHeightSmall,

    valueMediumFontSize: typography.fontSizeMedium,
    valueMediumPadding: `0 ${spacing.small}`,
    valueMediumLineHeight: forms.inputHeightMedium,

    valueLargeFontSize: typography.fontSizeLarge,
    valueLargePadding: `0 ${spacing.medium}`,
    valueLargeLineHeight: forms.inputHeightLarge
  }
}
