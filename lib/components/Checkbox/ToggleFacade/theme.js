import { alpha } from '../../../util/color'

export default function generator ({ colors, borders, spacing, typography }) {
  return {
    color: colors.lightest,
    background: colors.dark,
    borderColor: colors.dark,
    borderWidth: borders.widthLarge,
    borderRadius: borders.radiusLarge,
    marginRight: spacing.xSmall,

    checkedBackground: colors.success,
    checkedBorderColor: colors.success,

    focusOutlineColor: alpha(colors.brand, 50),

    handleBackground: colors.lightest,

    labelColor: colors.dark,
    labelFontFamily: typography.fontFamily,
    labelFontSize: typography.fontSizeMedium,
    labelFontWeight: typography.fontWeightNormal,
    labelLineHeight: typography.lineHeightCondensed
  }
}

generator.canvas = function (variables) {
  return {
    focusOutlineColor: alpha(variables['ic-brand-primary'], 50),
    labelColor: variables['ic-brand-font-color-dark']
  }
}
