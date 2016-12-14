import { alpha } from '../../../util/color'

export default function generator ({ colors, borders, spacing, typography }) {
  return {
    color: colors.lightest,
    borderColor: colors.border,
    borderRadius: borders.radiusSmall,
    background: colors.lightest,
    marginRight: spacing.xSmall,
    padding: spacing.xxxSmall,

    checkedBackground: colors.brand,
    checkedBorderColor: colors.brand,

    hoverBorderColor: colors.brand,

    focusOutlineColor: alpha(colors.brand, 50),

    labelColor: colors.dark,
    labelFontFamily: typography.fontFamily,
    labelFontSize: typography.fontSizeSmall,
    labelFontWeight: typography.fontWeightNormal,
    labelLineHeight: typography.lineHeightCondensed
  }
}

generator.canvas = function (variables) {
  return {
    checkedBackground: variables['ic-brand-primary'],
    checkedBorderColor: variables['ic-brand-primary'],

    hoverBorderColor: variables['ic-brand-primary'],

    focusOutlineColor: alpha(variables['ic-brand-primary'], 50),

    labelColor: variables['ic-brand-font-color-dark']
  }
}
