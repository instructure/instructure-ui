import { alpha } from '../../../util/color'

export default function generator ({ borders, colors, forms, shadows, typography }) {
  return {
    labelColor: colors.oxford,
    labelFontFamily: typography.fontFamily,
    labelFontSize: typography.fontSizeSmall,
    labelFontWeight: typography.fontWeightNormal,
    labelLineHeight: typography.lineHeightCondensed,

    focusShadowColor: alpha(colors.brand, 50),
    focusOutlineColor: colors.oxford,
    focusBorderWidth: borders.widthSmall,
    focusBorderStyle: borders.style,

    background: colors.lightest,
    borderColor: colors.border,
    hoverBorderColor: colors.oxford,
    checkedOutlineColor: colors.oxford,

    toggleBorderRadius: borders.radiusSmall,
    toggleBorderWidth: borders.widthLarge,
    toggleBackgroundSuccess: colors.success,
    toggleBackgroundOff: colors.slate,
    toggleBackgroundDanger: colors.crimson,
    toggleBackgroundWarning: colors.fire,
    toggleHandleText: colors.lightest,
    toggleSmallHeight: forms.inputHeightSmall,
    toggleMediumHeight: forms.inputHeightMedium,
    toggleLargeHeight: forms.inputHeightLarge,
    toggleShadow: shadows.depth1,
    toggleSmallFontSize: typography.fontSizeXSmall,
    toggleMediumFontSize: typography.fontSizeSmall,
    toggleLargeFontSize: typography.fontSizeMedium
  }
}

generator['canvas-a11y'] = generator['modern-a11y'] = generator.a11y = function ({ colors }) {
  return {
    toggleBackgroundOff: colors.oxford,
    borderColor: colors.oxford
  }
}

generator.canvas = function (variables) {
  return {
    focusOutlineColor: variables['ic-brand-primary'],
    labelColor: variables['ic-brand-font-color-dark']
  }
}

generator.modern = function ({ colors }) {
  return {
    focusOutlineColor: colors.brand,
    hoverBorderColor: colors.brand
  }
}
