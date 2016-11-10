import { alpha, darken } from '../../util/color'

export default function ({ colors, typography, spacing, forms }) {
  return {

    handleSize: '1.5rem',
    handleBackground: colors.brand,
    handleShadowColor: darken(colors.brand, 15),

    handleHoverBackground: colors.brand,

    handleFocusBackground: colors.brand,
    handleFocusOutlineColor: alpha(colors.brand, 40),
    handleFocusOutlineWidth: '0.75em',

    trackBackground: colors.medium,

    valueBackground: colors.dark,
    valueColor: colors.lightest,
    valueFontFamily: typography.fontFamily,
    valueFontWeight: typography.fontWeightNormal,

    valueSmallFontSize: typography.fontSizeXSmall,
    valueSmallPadding: `0 ${spacing.xSmall}`,
    valueSmallLineHeight: forms.inputHeightSmall,

    valueMediumFontSize: typography.fontSizeSmall,
    valueMediumPadding: `0 ${spacing.small}`,
    valueMediumLineHeight: forms.inputHeightMedium,

    valueLargeFontSize: typography.fontSizeMedium,
    valueLargePadding: `0 ${spacing.medium}`,
    valueLargeLineHeight: forms.inputHeightLarge
  }
}
